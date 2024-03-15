const ethers = require("ethers");
import Property from "@/components/property.js";
import AddProperty from "@/components/addPropertyButton.js";
import { useEffect, useState } from "react";

export default function ManageProperty() {
	const [houses, setHouses] = useState([]);

	async function getAllProperties() {
		try {
			const contractABI = require("@/utils/HouseOwnershipRegistryABI.json");
			const contractAddress = process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS;

			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			const signer = await provider.getSigner();
			const address = await signer.getAddress();

			const contract = new ethers.Contract(
				contractAddress,
				contractABI,
				signer
			);

			let ownedProperties = await contract.getPropertyAddress(address);
			console.log(ownedProperties);
			setHouses(ownedProperties);
			/* 
			for (const propertyAddress of ownedProperties) {
				const documentHash = await contract.getDocumentHash(propertyAddress);
				console.log(`Property ${propertyAddress} hash: `, documentHash);
			} */
		} catch (error) {
			console.error("Error getting IPFS hash: ", error);
		}
	}

	useEffect(() => {
		getAllProperties();
	}, []);

	return (
		<>
			<div className="w-[100%] h-[100vh] text-black kumbh-sans-font">
				<h1 className="text-4xl font-bold text-primary mb-10">
					Manage Property
				</h1>
				<div className="flex flex-col lg:flex-row lg:justify-evenly items-center flex-wrap">
					{houses?.map((house) => {
						return (
							<Property
								address={house}
								key={house}
								className="mt-10 mx-[25px]"
							/>
						);
					})}
					<AddProperty className="mt-10 mx-[25px]" />
				</div>
			</div>
		</>
	);
}
