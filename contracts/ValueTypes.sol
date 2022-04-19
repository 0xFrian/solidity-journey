// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

// ==============================================================================
// This contract serves as a basic introduction to defining state variables of different types. 
//
// This contract is based on the ValueTypes contract from Solidity-By-Example: 
//      - https://www.youtube.com/watch?v=8Tj-Th_S7NU&list=PLO5VPQH6OWdVQwpQfw9rZ67O6Pjfo6q-p&index=3
// ==============================================================================

contract ValueTypes {
    bool public myBool = true; 
    uint public myUint = 720;  
    int public myInt = -22; 
    int public minInt = type(int).min;
    int public maxInt = type(int).max; 
    address public myAddr = 0x112FE4bD43Eb28A84FeD3E7edA684eD72f808085;
    // myAddr corresponds to Account 2 in my MetaMask wallet
    bytes32 public myB32 = 0x46d5403d397ddf9c874297be45c9e7e6e10d68872fd71a14e75b3d268f6f7842;
    // myB32 corresponds to the transaction hash of our HelloWorld contract
}

