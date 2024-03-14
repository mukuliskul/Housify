// TODO : ENCRYPT Documents

import formidable from "formidable";
import fs from "fs";
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

export const config = {
	api: {
		bodyParser: false,
	},
};

const saveFile = async (file) => {
	try {
		const stream = fs.createReadStream(file.filepath);
		const options = {
			pinataMetadata: {
				name: file.originalFilename,
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
		res.status(405).json({ error: "Method not allowed" });
		return;
	}

	try {
		const form = new formidable.IncomingForm();
		form.parse(req, async function (err, fields, files) {
			if (err) {
				console.log({ err });
				return res.status(500).send("Upload Error");
			}
			console.log(files);
			let response = await saveFile(files["identification-proof"]);
			const { IpfsHashIdentificationProof } = response;

			response = await saveFile(files["title-certificate"]);
			const { IpfsHashTitle } = response;

			response = await saveFile(files["property-tax-receipts"]);
			const { IpfsHashPropertyTax } = response;

			console.log(IpfsHashIdentificationProof);
			console.log(IpfsHashTitle);
			console.log(IpfsHashPropertyTax);
			return res.send(IpfsHash);
		});
	} catch (e) {
		console.log(e);
		res.status(500).send("Server Error");
	}
}
