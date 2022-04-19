// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// SUMMARY
// ================================================================================================================
// This contract demonstrates a basic example of using if-else conditions and the ternary operator.
// 
// This contract is based on the IfElse contract from Solidity-By-Example: 
//      - https://www.youtube.com/watch?v=Ld8bFWXLSfs&list=PLO5VPQH6OWdVQwpQfw9rZ67O6Pjfo6q-p&index=12
// ================================================================================================================

contract IfElse {
    function regular(uint _x) external pure returns (uint) {
        if (_x < 10) {
            return 1;
        }
        // else
        return 2;
    }

    function ternary(uint _x) external pure returns (uint) {
        return _x < 10 ? 1 : 2; 
    }
}

// ADDITIONAL NOTES
// ================================================================================================================
// * Ternary syntax: (condition) ? (true) : (false)
// * The expressions within regular() and ternary() are identical. 
// ================================================================================================================