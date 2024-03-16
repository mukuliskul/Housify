// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {
	// This is just an example; replace with your contract's ABI and address
	const contractABI = require("./../artifacts/contracts/HouseOwnership.sol/HouseOwnershipRegistry.json"); // The path to the ABI file
	const contractAddress = "0xF0651B2DB5f34557Cbd43331DB0eadFED7406217"; // Replace with your contract's address

	// Initialize a provider
	const provider = new ethers.providers.JsonRpcProvider(
		"https://eth-sepolia.g.alchemy.com/v2/77Ff2vPbrNbBTw9rVSAd8ri4byctZ9nz"
	);
	// For example, for Ropsten Testnet use: ethers.providers.getDefaultProvider('ropsten')

	// You can also use a wallet private key to create a signer
	const signer = new ethers.Wallet(
		"5a37de6929f15ba119f67cf0295d39d459addd5ae366e68f0d70ccfc7de8dde4",
		provider
	);

	// Initialize the contract
	const contract = new ethers.Contract(contractAddress, contractABI, signer);

	// Example of reading from the contract
	const data = await contract.getDocumentHash(
		"5 test avenue, Markham, ON, L3S 3L9"
	); // Replace with your contract method
	console.log("Contract data:", data);

	// Example of writing to the contract (make sure you have enough ETH for gas)
	// const tx = await contract.yourWriteMethod(); // Uncomment and replace with your method
	// await tx.wait();
	// console.log("Transaction mined:", tx.hash);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
