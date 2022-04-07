// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10; 

contract BasicCounter {
    uint public count; 

    function get() external view returns (uint) {
        return count; 
    }

    function inc() external {
        count += 1; 
    }

    function dec() external {
        count -= 1; 
    }
}
