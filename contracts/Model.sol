// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Owner {
    address owner;
    string documentIPFSHash; // IPFS hash/CID of the ownership document

    Lease[] leases;
    UtilityBill[] utilityBills;
    PropertyTax[] propertyTaxReceipts;
}

// Events to emit
// creation
event HouseRegistered(string houseAddress, address owner);
event LeaseAdded(string houseAddress, string documentIPFSHash, uint256 startDate, uint256 endDate, string tenantName);
event UtilityBillAdded(string houseAddress, string documentIPFSHash, uint256 startDate, uint256 endDate, uint256 amount);
event PropertyTaxReceiptAdded(string houseAddress, string documentIPFSHash, uint256 startDate, uint256 endDate, uint256 amount);
// deletion
event allLeasesRemoved(string houseAddress);
event allUtilityBillsRemoved(string houseAddress);
event allPropertyTaxReceiptsRemoved(string houseAddress);
event LeaseRemoved(string houseAddress, uint256 startDate, uint256 endDate, string tenantName);
event UtilityBillRemoved(string houseAddress, uint256 startDate, uint256 endDate, uint256 amount);
event PropertTaxReceiptRemoved(string houseAddress, uint256 startDate, uint256 endDate, uint256 amount);
// updation
event LeaseUpdated(string houseAddress, uint256 startDate, uint256 endDate, string tenantName);
event UtilityBillUpdated(string houseAddress, uint256 startDate, uint256 endDate, uint256 amount);
event PropertyTaxReceiptUpdated(string houseAddress, uint256 startDate, uint256 endDate, uint256 amount);

// Errors to revert
error PropertyNotRegistered(string houseAddress);
error NotOwner(address caller, string houseAddress);

struct Document{
    string documentCID; 
    uint256 uploadedAt; 
}

struct Lease {
    Document document;
    // add any LEASE specific details
    uint256 startDate;
    uint256 endDate;
    string tenantName;
    bool isActive;
}

struct UtilityBill {
    Document document;
    // add any Utility specific details
    uint256 startDate;
    uint256 endDate;
    uint256 amount;
}

struct PropertyTax {
    Document document;
    // add any PropertyTax specific details
    uint256 startDate;
    uint256 endDate;
    uint256 amount;
}
