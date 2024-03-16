// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Model.sol";

contract HouseOwnershipRegistry {

    // house address is mapped to the owner
    mapping(string => Owner) public houseRegistry;
    string[] private houseAddresses;

    function registerHouse(string memory houseAddress, string memory documentIPFSHash) public {
        // Ensure the house is not already registered
        require(houseRegistry[houseAddress].owner == address(0), "House already registered.");

        // Create new Owner with empty arrays
        Owner storage newOwner = houseRegistry[houseAddress];
        newOwner.owner = msg.sender;
        newOwner.documentIPFSHash = documentIPFSHash;

        // add houseAddress to array
        houseAddresses.push(houseAddress);

        // Emit event
        emit HouseRegistered(houseAddress, msg.sender);
    }

    function verifyOwner(string memory houseAddress, address caller) public view{
        if (houseRegistry[houseAddress].owner == address(0)) {
            revert PropertyNotRegistered(houseAddress);
        }
        if (houseRegistry[houseAddress].owner != caller) {
            revert NotOwner(caller, houseAddress);
        }
    }

    // Create
    function addLease(string memory houseAddress, string memory documentIPFSHash, uint256 startDate, uint256 endDate, string memory tenantName) public{
        verifyOwner(houseAddress, msg.sender);
        Document memory newDocument = Document(documentIPFSHash, block.timestamp);
        Lease memory newLease = Lease(newDocument, startDate, endDate, tenantName, true);
        houseRegistry[houseAddress].leases.push(newLease);

        emit LeaseAdded(houseAddress, documentIPFSHash, startDate, endDate, tenantName);
    }

    // TODO: INCLUDE apporpriate checks for edge cases in frontend
    function addUtilityBill(string memory houseAddress, string memory documentIPFSHash, uint256 startDate, uint256 endDate, uint256 amount) public{
        verifyOwner(houseAddress, msg.sender);
        Document memory newDocument = Document(documentIPFSHash, block.timestamp);
        UtilityBill memory newUtilityBill = UtilityBill(newDocument, startDate, endDate, amount);
        houseRegistry[houseAddress].utilityBills.push(newUtilityBill);

        emit UtilityBillAdded(houseAddress, documentIPFSHash, startDate, endDate, amount);
    }

    // TODO: INCLUDE apporpriate checks for edge cases in frontend
    function addPropertyTax(string memory houseAddress, string memory documentIPFSHash, uint256 startDate, uint256 endDate, uint256 amount) public{
        verifyOwner(houseAddress, msg.sender);
        Document memory newDocument = Document(documentIPFSHash, block.timestamp);
        PropertyTax memory newPropertyTax = PropertyTax(newDocument, startDate, endDate, amount);
        houseRegistry[houseAddress].propertyTaxReceipts.push(newPropertyTax);

        emit PropertyTaxReceiptAdded(houseAddress, documentIPFSHash, startDate, endDate, amount);
    }

    // Read
    function getPropertyAddress(address caller) public view returns (string[] memory) {
        string[] memory properties = new string[](houseAddresses.length);
        uint count = 0;
        for (uint i = 0; i < houseAddresses.length; i++) {
            if (houseRegistry[houseAddresses[i]].owner == caller) {
                properties[count] = houseAddresses[i];
                count++;
            }
        }
        if(count > 0){
            // Resize the array to fit the actual number of properties
            string[] memory callerProperties = new string[](count);
            for (uint i = 0; i < count; i++) {
                callerProperties[i] = properties[i];
            }
            return callerProperties;
        }else{
            revert NoProperties(caller);
        }
    }

    function getDocumentHash(string memory houseAddress) public view returns (string memory) {
        verifyOwner(houseAddress, msg.sender);

        //https://fuchsia-quick-tarantula-888.mypinata.cloud/ipfs/{documentIPFSHash}
        return houseRegistry[houseAddress].documentIPFSHash;
    }

    function getLeases(string memory houseAddress) public view returns (Lease[] memory){
        verifyOwner(houseAddress, msg.sender);
        return houseRegistry[houseAddress].leases;
    }

    function getUtilityBills(string memory houseAddress) public view returns (UtilityBill[] memory){
        verifyOwner(houseAddress, msg.sender);
        return houseRegistry[houseAddress].utilityBills;
    }

    function getPropertyTaxReceipts(string memory houseAddress) public view returns (PropertyTax[] memory){
        verifyOwner(houseAddress, msg.sender);
        return houseRegistry[houseAddress].propertyTaxReceipts;
    }

    function findLeaseIndex(string memory houseAddress, uint256 startDate, uint256 endDate, string memory tenantName) public view returns (uint256) {
        for (uint256 i = 0; i < houseRegistry[houseAddress].leases.length; i++) {
            Lease memory lease = houseRegistry[houseAddress].leases[i];
            if (lease.startDate == startDate && lease.endDate == endDate && keccak256(abi.encodePacked(lease.tenantName)) == keccak256(abi.encodePacked(tenantName)) && lease.isActive) {
                return i;
            }
        }
        return type(uint256).max; // Return max uint256 value if not found
    }

    function findUtilityBillIndex(string memory houseAddress, uint256 startDate, uint256 endDate, uint256 amount) public view returns (uint256) {
        for (uint256 i = 0; i < houseRegistry[houseAddress].propertyTaxReceipts.length; i++){
            PropertyTax memory propertyTax = houseRegistry[houseAddress].propertyTaxReceipts[i];
            if (propertyTax.startDate == startDate && propertyTax.endDate == endDate && propertyTax.amount == amount){
                return i;
            }
        }
        return type(uint256).max;
    }

    function findPropertyTaxIndex(string memory houseAddress, uint256 startDate, uint256 endDate, uint256 amount) public view returns (uint256) {
        for (uint256 i = 0; i < houseRegistry[houseAddress].utilityBills.length; i++){
            UtilityBill memory utilityBill = houseRegistry[houseAddress].utilityBills[i];
            if (utilityBill.startDate == startDate && utilityBill.endDate == endDate && utilityBill.amount == amount){
                return i;
            }
        }
        return type(uint256).max;
    }

    // Delete
    function removeAllLeases(string memory houseAddress) public{
        verifyOwner(houseAddress, msg.sender);
        Owner memory ownerProfile = houseRegistry[houseAddress];
        if (ownerProfile.leases.length > 0) {
            delete ownerProfile.leases;
            emit allLeasesRemoved(houseAddress);
        }
    }

    function removeAllUtilityBills(string memory houseAddress) public{
        verifyOwner(houseAddress, msg.sender);
        Owner memory ownerProfile = houseRegistry[houseAddress];
        if (ownerProfile.utilityBills.length > 0) {
            delete ownerProfile.utilityBills;
            emit allUtilityBillsRemoved(houseAddress);
        }
    }

    function removeAllPropertyTaxReceipts(string memory houseAddress) public{
        verifyOwner(houseAddress, msg.sender);
        Owner memory ownerProfile = houseRegistry[houseAddress];
        if (ownerProfile.propertyTaxReceipts.length > 0) {
            delete ownerProfile.propertyTaxReceipts;
            emit allPropertyTaxReceiptsRemoved(houseAddress);
        }
    }

    function removeLease(string memory houseAddress, uint256 startDate, uint256 endDate, string memory tenantName) public {
        verifyOwner(houseAddress, msg.sender);
        uint256 index = findLeaseIndex(houseAddress, startDate, endDate, tenantName);
        require(index != type(uint256).max, "Lease not found.");

        // Mark the lease as inactive to provide history later
        houseRegistry[houseAddress].leases[index].isActive = false;
        emit LeaseRemoved(houseAddress, startDate, endDate, tenantName);
    }

    function removeUtilityBill(string memory houseAddress, uint256 startDate, uint256 endDate, uint256 amount) public{
        verifyOwner(houseAddress, msg.sender);
        uint256 index = findUtilityBillIndex(houseAddress, startDate, endDate, amount);
        require(index != type(uint256).max, "Utility Bill not found");

        // Remove the utility bill by shifting subsequent bills down one index
        for (uint256 i = index; i < houseRegistry[houseAddress].utilityBills.length - 1; i++) {
            houseRegistry[houseAddress].utilityBills[i] = houseRegistry[houseAddress].utilityBills[i + 1];
        }

        // Remove the last element (now a duplicate) by reducing the array's length
        houseRegistry[houseAddress].utilityBills.pop();
        emit UtilityBillRemoved(houseAddress, startDate, endDate, amount);
    }

    function removePropertyTaxReceipt(string memory houseAddress, uint256 startDate, uint256 endDate, uint256 amount) public{
        verifyOwner(houseAddress, msg.sender);
        uint256 index = findPropertyTaxIndex(houseAddress, startDate, endDate, amount);
        require(index != type(uint256).max, "Property Tax receipt not found");

        for (uint256 i = index; i < houseRegistry[houseAddress].propertyTaxReceipts.length - 1; i++) {
            houseRegistry[houseAddress].propertyTaxReceipts[i] = houseRegistry[houseAddress].propertyTaxReceipts[i + 1];
        }

        houseRegistry[houseAddress].propertyTaxReceipts.pop();
        emit PropertTaxReceiptRemoved(houseAddress, startDate, endDate, amount);
    }
    
    // Update
}
