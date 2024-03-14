// TODO : ENCRYPT Documents

import formidable from "formidable";
import fs from "fs";
import { ethers } from "ethers";
const pinataSDK = require("@pinata/sdk");

// Initialize Pinata SDK
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

// Contract details
const contractABI =
	require("../../artifacts/contracts/HouseOwnership.sol/HouseOwnershipRegistry.json").abi;
const contractAddress = "0x2e5D496aC79531Bc0CC6Fbb99cab053E379eb572";

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
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const form = new formidable.IncomingForm();
		const parseForm = () => {
			return new Promise((resolve, reject) => {
				form.parse(req, (err, fields, files) => {
					if (err) reject(err);
					else resolve(files);
				});
			});
		};

		const files = await parseForm();

		const ipfsHashes = await Promise.all([
			saveFile(files["identification-proof"]),
			saveFile(files["title-certificate"]),
			saveFile(files["property-tax-receipts"]),
		]);

		const [identificationProof, title, propertyTax] = ipfsHashes;

		console.log({ identificationProof, title, propertyTax });
		//res.json({ identificationProof, title, propertyTax });
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
}
