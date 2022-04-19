// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// SUMMARY
// ================================================================================================================
// These contracts demonstrate the difference between defining constant and non-constant variables.
// Takeaway: constant variables cost less in terms of gas.
//
// These contracts are based on the Constants contract from Solidity-By-Example:
//      - https://www.youtube.com/watch?v=y5uiQ9IJhMc&list=PLO5VPQH6OWdVQwpQfw9rZ67O6Pjfo6q-p&index=11
// ================================================================================================================

contract Constants {
    address public constant MY_ADDR = 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9;
    uint public constant MY_UINT = 1022;
}

contract NotConstants {
    address public MY_ADDR = 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9;
    uint public MY_UINT = 1022; 
}