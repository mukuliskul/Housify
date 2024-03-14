async function main() {
	const [owner] = await ethers.getSigners();

	console.log("Deploying contracts with the account:", owner.address);

	const HouseOwnership = await ethers.getContractFactory(
		"HouseOwnershipRegistry"
	);
	const houseOwnership = await HouseOwnership.deploy();

	console.log("HouseOwnership deployed to:", houseOwnership.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
