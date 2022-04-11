// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Loops {
    uint upperLimit;

    event ValueChanged(uint256 value);
    event Sum(uint256 result);

    // Set upperLimit
    function set(uint _upperLimit) external {
        upperLimit = _upperLimit;
        emit ValueChanged(upperLimit);
    }

    // Get upperLimit
    function get() external view returns (uint) {
        return upperLimit;
    }

    // Calculate sum using for-loop
    function forLoop() external {
        uint s;
        for (uint i = 0; i <= upperLimit; i++) {
            s += i;
        }
        emit Sum(s);
        upperLimit = 0;
        emit ValueChanged(upperLimit);
    }

    // Calculate sum using while-loop
    function whileLoop() external {
        uint j = 1; 
        uint s;
        while (j <= upperLimit) {
            s += j;
            j++;
        }
        emit Sum(s);
    }

    // Calculate sum using for-loop with given argument
    function sum(uint _n) external returns (uint) {
        uint s;
        for (uint i = 1; i <= _n; i++) {
            s += i;
        }
        emit Sum(s);
        return s;
    }
}
