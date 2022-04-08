// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Box {
    uint256 private _value; 

    event ValueChanged(uint256 value); 

    function store(uint256 value) public returns (uint256) {
        _value = value; 
        emit ValueChanged(value); 
        return 10;
    }

    function retrieve() public view returns (uint256) {
        return _value; 
    }
}

// =======================
// ||       Notes       ||
// =======================
// * Calling the store() function requires committing a transaction to the blockchain whereas 
//   calling the retrieve() function does NOT require a transaction since the function's state 
//   mutability is only "view". This is why only 2 transactions are registered in total on 
//   Etherscan: contract creation and calling store(). 
// * If the retrieve() function was NOT "view" i.e. retrieve() is writing data to the 
//   blockchain, then the retrieve() function would require a transaction, and thus we would 
//   have 4 transactions in total associated with this contract.