// TODO : ENCRYPT Documents
import formidable from "formidable";
import fs from "fs";
const pinataSDK = require("@pinata/sdk");

// Initialize Pinata SDK
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

export const config = {
	api: {
		bodyParser: false,
	},
};

const saveFile = async (file, customFileName) => {
	try {
		const stream = fs.createReadStream(file.filepath);
		const options = {
			pinataMetadata: {
				// stored in the format : callerAddress-file-name
				name: customFileName,
			},
		};
		const response = await pinata.pinFileToIPFS(stream, options);
		fs.unlinkSync(file.filepath);

		return response;
	} catch (error) {
		throw error;
	}
};

export default async function handler(req, res) {
	// Ensure the method is POST
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const form = new formidable.IncomingForm();
		const parseForm = () => {
			return new Promise((resolve, reject) => {
				form.parse(req, (err, fields, files) => {
					if (err) reject(err);
					else resolve({ fields, files });
				});
			});
		};

		const result = await parseForm();

		const ipfsHashes = await Promise.all([
			saveFile(
				result.files["identification-proof"],
				`${result.fields.callerAddress}-${result.fields["street-address"]}-identification-proof`
			),
			saveFile(
				result.files["title-certificate"],
				`${result.fields.callerAddress}-${result.fields["street-address"]}-title-certificate`
			),
			saveFile(
				result.files["property-tax-receipts"],
				`${result.fields.callerAddress}-${result.fields["street-address"]}-property-tax-receipts`
			),
		]);

		let propertyAddress = `${result.fields["street-address"]}, ${result.fields["city"]}, ${result.fields["province"]}, ${result.fields["postal-code"]}`;

		res.json({
			success: true,
			ipfsHashes: {
				identificationProof: ipfsHashes[0],
				title: ipfsHashes[1],
				propertyTax: ipfsHashes[2],
			},
			propertyAddress: propertyAddress,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
}
