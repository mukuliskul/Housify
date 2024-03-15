import { useEffect, useState } from "react";
import { ethers } from "ethers";
import houseOwnershipRegistry from "../../artifacts/contracts/HouseOwnership.sol/HouseOwnershipRegistry.json";
const abi = houseOwnershipRegistry.abi;

const ContractInteractionComponent = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			if (typeof window.ethereum !== "undefined") {
				await window.ethereum.request({ method: "eth_requestAccounts" });
				const provider = new ethers.BrowserProvider(window.ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(
					0x2e5d496ac79531bc0cc6fbb99cab053e379eb572,
					abi,
					signer
				);

				try {
					const data = await contract.yourReadFunction();
					setData(data);
				} catch (error) {
					console.error(error);
				}
			}
		};

		fetchData();
	}, []);

	return <div>{data}</div>;
};

export default ContractInteractionComponent;
