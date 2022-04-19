// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// SUMMARY
// ================================================================================================================
// This contract works as a "box" by storing a variable with functions that can set and retrieve
// the value within the box. 
//
// This contract is based on OpenZeppelin's smart contract tutorial found here:
//      - https://docs.openzeppelin.com/learn/developing-smart-contracts 
// ================================================================================================================

contract Box {
    uint256 private _value; 

    event ValueChanged(uint256 value); 

    function store(uint256 value) public returns (uint256) {
        _value = value; 
        emit ValueChanged(value); 
    }

    function retrieve() public view returns (uint256) {
        return _value; 
    }
}