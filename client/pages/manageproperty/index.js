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
				<div className="lg:w-[80%] mx-auto flex flex-col md:flex-row justify-around items-center md:flex-wrap">
					{houses?.map((house) => {
						return (
							<Property address={house} key={house} className="m-[50px]" />
						);
					})}
					<AddProperty className="m-[50px]" />
					<button
						className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out"
						onClick={getPropertyDetails}
					>
						Get Property Details
					</button>
				</div>
			</div>
		</>
	);
}
