const ethers = require("ethers");
import Property from "@/components/property.js";
import AddProperty from "@/components/addPropertyButton.js";

export default function ManageProperty() {
	const [properties, setProperties] = useState([]);

	async function getIPFShash(houseAddress, provider, contract) {
		try {
			let ipfsHash = await contract.getDocumentHash(houseAddress);
			console.log(ipfsHash);
			return ipfsHash;
		} catch (error) {
			console.error(
				"Error getting IPFS hash for address " + houseAddress + ": ",
				error
			);
		}
	}

	async function getAllProperties() {
		try {
			const contractABI = require("@/utils/HouseOwnershipRegistryABI.json");
			const contractAddress = process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS;

			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();
			const address = await signer.getAddress(); // Fetch the signer's address

			const contract = new ethers.Contract(
				contractAddress,
				contractABI,
				signer
			);

			let ownedProperties = await contract.getPropertyAddress(address);
			const propertyDetails = await Promise.all(
				ownedProperties.map(async (house) => {
					const cin = await getIPFShash(house, provider, contract);
					console.log(cin);
					return { address: house, cin };
				})
			);
			setProperties(propertyDetails);
			console.log(properties);
		} catch (error) {
			console.error("Error getting properties ", error);
		}
	}

	useEffect(() => {
		getAllProperties();
	}, []);

	console.log(properties);

	return (
		<>
			<div className="w-[100%] h-[100vh] text-black kumbh-sans-font">
				<h1 className="text-4xl font-bold text-primary mb-10">
					Manage Property
				</h1>
				<div className="flex flex-col lg:flex-row lg:justify-evenly items-center flex-wrap">
					{properties.map((property) => (
						<Property
							key={property.address}
							address={property.address}
							cin={property.cin}
							className="mt-10 mx-[25px]"
						/>
					))}
					<AddProperty className="mt-10 mx-[25px]" />
				</div>
			</div>
		</>
	);
}
