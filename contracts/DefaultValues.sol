// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// ==============================================================================
// This contract defines various state variables of different types. Since these variables are 
// initialized without any specific values, they will assume their default values.
// 
// This contract is based on the DefaultValues contract from Solidity-By-Example:
//      - https://www.youtube.com/watch?v=TPnu-uqJiVI&list=PLO5VPQH6OWdVQwpQfw9rZ67O6Pjfo6q-p&index=10
// ==============================================================================

contract DefaultValues {
    bool public myBool;     // default value should be false
    uint public myUint;     // default value should be 0 
    int public myInt;       // default value should be 0
    address public myAddr;  // default value should be 0x00000000000 (forty 0's)
    bytes32 public myB32;   // default value should be 0x00000000000 (sixty-four 0's)
}
