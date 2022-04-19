// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10; 

// ==============================================================================
// This contract provides a basic counter variable with functions to get, increment, and decrement the counter.
//
// This contract is based on the Counter contract from Solidity-By-Example: 
//      - https://www.youtube.com/watch?v=zzT3a7BJxgw&list=PLO5VPQH6OWdVQwpQfw9rZ67O6Pjfo6q-p&index=9 
// ==============================================================================

contract BasicCounter {
    uint public count;      // counter variable

    // Obtain value of count 
    function get() external view returns (uint) {
        return count; 
    }

    // Increment value of count
    function inc() external {
        count += 1; 
    }

    // Decrement value of count
    function dec() external {
        count -= 1; 
    }
}
