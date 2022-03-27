// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

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


