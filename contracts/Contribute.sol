// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

import "./TimerToken.sol"; // ERC20
import "hardhat/console.sol";

contract Contribute {
    event Received(address, uint256);

    // address TimerTokenAddress;
    // TimerToken public token;

    constructor(address _tokenAddress) {
        // TimerTokenAddress = _tokenAddress;
        // token = TimerToken(TimerTokenAddress);
    }

    receive() external payable {
        console.log(" >>> emit Received()", msg.sender, msg.value);
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
