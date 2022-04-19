// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// SUMMARY
// ================================================================================================================
// This contract shows how to use Function Modifiers in 3 use-cases: 
//      (1) whenNotPaused --> To check if the contract is currently paused to prevent executing function calls. 
//      (2) cap --> To place an upper limit on how much count can be incremented or decremented by. 
//      (3) sandwich --> To test executing code before and after the underlying function being modified is executed.
//
// This contract is based on the FunctionModifier contract from Solidity-By-Example: 
//      - https://www.youtube.com/watch?v=b6FBWsz7VaI&list=PLO5VPQH6OWdVQwpQfw9rZ67O6Pjfo6q-p&index=15
// ================================================================================================================

contract FunctionModifiers {
    bool public paused;     // this variable serves to enable/disable access to this contract's functions
    uint public count;

    event ContractStatusChanged(string _status);
    event CountChanged(uint _count);

    // ==========================
    // ||       Modifiers      ||
    // ==========================
    modifier whenNotPaused() {
        require(!paused, "Contract is currently paused");
        _;
    }

    modifier cap(uint _x) {
        require(_x < 100, "x >= 100; can only increment by less than 100");
        _;
    }

    modifier sandwich() {
        count += 10;
        _;                  // calls underlying function
        count *= 2;
        emit CountChanged(count);
    }

    // ==========================
    // ||       Functions      ||
    // ==========================
    function getPause() external view returns (bool) {
        return paused;
    }

    function setPause(bool _paused) external {
        paused = _paused;
        // string memory msg = _paused ? "Contract paused" : "Contract resumed";
        if (_paused) {
            emit ContractStatusChanged("Contract is now paused");
        }
        else {
            emit ContractStatusChanged("Contract is no longer paused");
        }
    }

    function getCount() external view returns (uint) {
        return count;
    }

    function inc() external whenNotPaused {  
        // require(!paused, "Contract is currently paused");
        count += 1;
        emit CountChanged(count);
    }

    function dec() external whenNotPaused {
        // require(!paused, "Contract is currently paused");
        count -= 1;
        emit CountChanged(count);
    }

    function incBy(uint _x) external whenNotPaused cap(_x) {
        // require(_x < 100, "x >= 100");
        count += _x;
        emit CountChanged(count);
    }

    function decBy(uint _x) external whenNotPaused cap(_x) {
        // require(_x < 100, "x >= 100");
        count -= _x;
        emit CountChanged(count);
    }

    function foo() external sandwich {
        emit CountChanged(count);
    }
}

// =======================
// ||       Notes       ||
// =======================
// * _; indicates the point within the function modifier in which the underlying function is actually called.
