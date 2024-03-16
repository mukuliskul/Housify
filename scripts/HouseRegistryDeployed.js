// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {
	const contractABI = require("/artifacts/contracts/HouseOwnership.sol/HouseOwnershipRegistry.json"); // The path to the ABI file
	const contractAddress = "0xF0651B2DB5f34557Cbd43331DB0eadFED7406217"; // Replace with your contract's address

	const provider = new ethers.providers.JsonRpcProvider("your-network-RPC-url");
	// For example, for Ropsten Testnet use: ethers.providers.getDefaultProvider('ropsten')

	// You can also use a wallet private key to create a signer
	const signer = new ethers.Wallet("your-private-key", provider);

	// Initialize the contract
	const contract = new ethers.Contract(contractAddress, contractABI, signer);

	// Example of reading from the contract
	const data = await contract.yourContractMethod(); // Replace with your contract method
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
