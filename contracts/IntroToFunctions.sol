// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// ==============================================================================
// This contract serves as a basic introduction to using functions in Solidity. There are 
// 2 functions in this contract that provide basic addition and subtraction operations. 
// 
// This contract is based on the FunctionIntro contract from Solidity-By-Example: 
//      - https://www.youtube.com/watch?v=Mm6834AAY00&list=PLO5VPQH6OWdVQwpQfw9rZ67O6Pjfo6q-p&index=4
// ==============================================================================

contract IntroToFunctions {
    function add(uint x, uint y) external pure returns (uint) {
        // uint sum = x + y; 
        // return sum; 
        return x + y; 
    }
    function sub(uint x, uint y) external pure returns (uint) {
        // uint diff = x - y; 
        // return diff
        return x - y; 
    }
}


