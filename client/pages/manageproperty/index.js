const ethers = require("ethers");
import Property from "@/components/property.js";
import AddProperty from "@/components/addPropertyButton.js";

export default function ManageProperty() {
	async function getPropertyDetails() {
		try {
			const contractABI = require("@/utils/HouseOwnershipRegistryABI.json");
			const contractAddress = process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS;

			const provider = new ethers.BrowserProvider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			const signer = await provider.getSigner();
			const address = await signer.getAddress();

			const contract = new ethers.Contract(
				contractAddress,
				contractABI,
				signer
			);

			const ownedProperties = await contract.getDocumentHash(address);

			for (const propertyAddress of ownedProperties) {
				const documentHash = await contract.getDocumentHash(propertyAddress);
				console.log(`Property ${propertyAddress} hash: `, documentHash);
			}
		} catch (error) {
			console.error("Error getting IPFS hash: ", error);
		}
	}
	let houses = [
		"99 xyz avenue, North York, ON M2H 2K1",
		"999 xyz street, North York, ON M2H 1K8",
	];
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
