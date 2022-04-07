// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DefaultValues {
    bool public myBool;     // default value should be false
    uint public myUint;     // default value should be 0 
    int public myInt;       // default value should be 0
    address public myAddr;  // default value should be 0x00000000000 (forty 0's)
    bytes32 public myB32;   // default value should be 0x00000000000 (sixty-four 0's)
}
