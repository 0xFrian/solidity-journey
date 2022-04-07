// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

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

