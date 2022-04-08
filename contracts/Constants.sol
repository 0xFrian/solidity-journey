// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Constants {
    address public constant MY_ADDR = 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9;
    uint public constant MY_UINT = 1022;
}

contract NotConstants {
    address public MY_ADDR = 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9;
    uint public MY_UINT = 1022; 
}

// =======================
// ||       Notes       ||
// =======================
// * The main reason for using constant state variables is to save gas. 