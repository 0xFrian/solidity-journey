// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// SUMMARY
// ================================================================================================================
// This contract provides a basic example of constructors in Solidity. 
//
// This contract is based on the Constructor contract from Solidity-By-Example:
//      - https://www.youtube.com/watch?v=7XwWBr4TAz4&list=PLO5VPQH6OWdVQwpQfw9rZ67O6Pjfo6q-p&index=16
// ================================================================================================================

contract Constructor {
    address public owner; 
    uint public x; 

    constructor(uint _x) {
        owner = msg.sender;     // msg.sender is the account that deployed the contract
        x = _x;   
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function getX() external view returns (uint) {
        return x;
    }
}