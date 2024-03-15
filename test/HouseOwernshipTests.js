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

	// Register House
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

	// Ownership Verification
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

	// Get Property Address
	describe("getPropertyAddress", function () {
		it("Should return the correct property addresses for the caller", async function () {
			await contract.connect(addr1).registerHouse("123 Pine St", "ipfsHash1");
			await contract.connect(addr1).registerHouse("456 Oak St", "ipfsHash2");

			const properties = await contract
				.connect(addr1)
				.getPropertyAddress(addr1.address);

			expect(properties).to.deep.equal(["123 Pine St", "456 Oak St"]);
		});

		it("Should revert with NoProperties when the caller has no properties", async function () {
			await expect(contract.connect(addr2).getPropertyAddress(addr2.address)).to
				.be.reverted;
		});
	});

	// Get Document IPFS
	describe("getDocumentHash", function () {
		it("Should return the document hash for the caller's property", async function () {
			await contract.registerHouse("789 Pine St", "ipfsHash3");

			const documentHash = await contract.getDocumentHash("789 Pine St");
			expect(documentHash).to.equal("ipfsHash3");
		});

		it("Should revert when a non-owner tries to get the document hash", async function () {
			await contract.registerHouse("1011 Oak St", "ipfsHash4");

			await expect(contract.connect(addr1).getDocumentHash("1011 Oak St")).to.be
				.reverted;
		});
	});

	// Update Property Details
	describe("updateProperty", function () {
		it("Should update property address", async function () {
			let oldAddress = "123 Oak St";
			let newAddress = "123 Pine St";
			await contract.connect(addr1).registerHouse(oldAddress, "ipfsHash1");
			await contract
				.connect(addr1)
				.updatePropertyAddress(oldAddress, newAddress);
			const propertyAddress = await contract
				.connect(addr1)
				.getPropertyAddress(addr1.address);
			expect(propertyAddress).to.not.include(oldAddress);
			expect(propertyAddress).to.include(newAddress);
			const documentHash = await contract
				.connect(addr1)
				.getDocumentHash(newAddress);
			expect(documentHash).to.equal("ipfsHash1");
		});
		it("Should update the IPFS hash for a property", async function () {
			await contract.connect(addr1).registerHouse("123 Pine St", "ipfsHash1");

			// Update the IPFS hash for the property
			await contract
				.connect(addr1)
				.updatePropertyIpfsHash("123 Pine St", "ipfsHash2");

			// Verify the IPFS hash has been updated
			const documentHash = await contract
				.connect(addr1)
				.getDocumentHash("123 Pine St");
			expect(documentHash).to.equal("ipfsHash2");
		});
	});
});
