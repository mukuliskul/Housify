const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HouseOwnershipRegistry", function () {
	let contract;
	let owner, addr1, addr2;

	beforeEach(async function () {
		// Deploy the contract before each test
		const Contract = await ethers.getContractFactory("HouseOwnershipRegistry");
		contract = await Contract.deploy();

		// Get signers
		[owner, addr1, addr2] = await ethers.getSigners();
	});

	describe("Registration", function () {
		it("Should register a house", async function () {
			await contract.connect(owner).registerHouse("123 Main St", "ipfsHash1");
			const houseOwner = await contract.houseRegistry("123 Main St");
			expect(houseOwner.owner).to.equal(owner.address);
		});

		it("Should fail to register the same house twice", async function () {
			await contract.connect(owner).registerHouse("123 Main St", "ipfsHash1");
			await expect(
				contract.connect(owner).registerHouse("123 Main St", "ipfsHash2")
			).to.be.revertedWith("House already registered.");
		});
	});

	describe("Ownership Verification", function () {
		it("Should verify the owner correctly", async function () {
			await contract.connect(owner).registerHouse("123 Main St", "ipfsHash1");
			await expect(
				contract.connect(owner).verifyOwner("123 Main St", owner.address)
			).to.not.be.reverted;
		});
		it("Should revert if the caller is not the owner", async function () {
			await contract.connect(owner).registerHouse("123 Main St", "ipfsHash1");
			await expect(
				contract.connect(addr1).verifyOwner("123 Main St", addr1.address)
			).to.be.reverted;
		});
	});

	// Add more tests for the rest of the functions...
});
