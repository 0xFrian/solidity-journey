// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

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

// =======================
// ||       Notes       ||
// =======================
// * Ternary syntax: (condition) ? (true) : (false)
// * The expressions within regular() and ternary() are identical. 