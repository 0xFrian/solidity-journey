// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Errors {
    uint public num = 123;

    event ValidInput(uint _i);
    event ValidNum(uint _num);
    event ValueChanged(uint _num);

    function testRequire(uint _i) public {
        // require is mainly used for input validation and access control.

        // Check if i is less than or equal to 10
        require(_i <= 10, "require: i > 10");
        emit ValidInput(_i);
    }

    function testRevert(uint _i) public {
        // The code below works identical to the code inside testRequire()
        if (_i > 10) {
            emit ValidInput(_i);
            revert("revert: i > 10");
            // emit ValidInput(_i);     // this code is unreachable
        }
    }

    function testAssert() public {
        // assert is mainly used to check for conditions that should always hold true

        // Make sure that num is equal to 123 i.e. no state updates have been made
        assert(num == 123);
        emit ValidNum(num);
    }

    // Returns value of state variable num
    function get() public view returns (uint) {
        return num;
    }

    // Updates value of state variable num
    function set(uint _num) public {
        emit ValueChanged(_num);
        num = _num;
    }

    // Attempts to update value of state variable num but may get reverted if i > 10
    function attemptToUpdate(uint _i) public {
        num = 10;
        emit ValueChanged(10);
        // Check if i is less than 10
        require(_i <= 10, "require: i > 10");
        emit ValidInput(_i);
    }

    // Create our own custom error
    error MyError(address caller, uint i, string msg);

    function testCustomError(uint _i) public {
        if (_i > 10) {
            // Revert using our custom error
            revert MyError(msg.sender, _i, "This is my custom error");
        }
        emit ValidInput(_i);
    }
}

// =======================
// ||       Notes       ||
// =======================
// * There are 3 ways to throw an error: require, revert, and assert.
// * When an error is thrown, gas is refunded and state updates are reverted.
// * Starting with Solidity 0.8, custom errors can used to save gas.
// * It is recommended to use revert when throwing an error within nested if-conditions.
// * Longer error messages require more gas


