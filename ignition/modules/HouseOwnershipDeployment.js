const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HouseOwnershipDeployment", (m) => {
	const houseOwnershipRegistry = m.contract("HouseOwnershipRegistry", []);
	return { houseOwnershipRegistry };
});
