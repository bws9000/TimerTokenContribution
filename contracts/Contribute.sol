// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

import "./TimerToken.sol"; // ERC20
import "hardhat/console.sol";

contract Contribute {
    event Received(address, uint256);
    event Approval(address, address, uint256);

    address TimerTokenAddress;
    mapping(address => mapping(address => uint256)) private allowed;
    mapping(address => uint256) private balances;
    TimerToken public token;

    constructor(address _tokenAddress) {
        TimerTokenAddress = _tokenAddress;
        token = TimerToken(TimerTokenAddress);
    }

    receive() external payable {
        console.log(" >>> emit Recieved()", msg.sender, msg.value);
        emit Received(msg.sender, msg.value);
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // function donateEth() public payable {
    //     payable(address(this)).transfer(msg.value);
    //     emit Received(msg.sender, msg.value);
    // }

    // // fallback
    // receive() external payable {
    //     donateEth();
    // }

    // function deposit(uint256 tokens) public {
    //     // transfer the tokens from the sender to this contract
    //     ERC20(tokenAddress).transferFrom(msg.sender, address(this), tokens);

    //     // add the deposited tokens into existing balance
    //     balances[msg.sender] += tokens;
    // }

    // function returnTokens() public {
    //     uint256 amount = balances[msg.sender];
    //     balances[msg.sender] = 0;
    //     ERC20(tokenAddress).transfer(msg.sender, amount);
    // }

    // function returnYourBalance() public view returns (uint256) {
    //     return balances[msg.sender];
    // }

    //event Bought(uint256 amount);
    //event Sold(uint256 amount);

    //IERC20 public token;

    // constructor() public {
    //     token = new TimerToken();
    // }

    // function buy() public payable {
    //     uint256 amountTobuy = msg.value;
    //     uint256 dexBalance = token.balanceOf(address(this));
    //     require(amountTobuy > 0, "You need to send some ether");
    //     require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    //     token.transfer(msg.sender, amountTobuy);
    //     emit Bought(amountTobuy);
    // }

    // function sell(uint256 amount) public {
    //     require(amount > 0, "You need to sell at least some tokens");
    //     uint256 allowance = token.allowance(msg.sender, address(this));
    //     require(allowance >= amount, "Check the token allowance");
    //     token.transferFrom(msg.sender, address(this), amount);
    //     msg.sender.transfer(amount);
    //     emit Sold(amount);
    // }

    // Function to receive Ether. msg.data must be empty
    // receive() external payable {
    //     emit Received(msg.sender, msg.value);
    // }

    // // Fallback function is called when msg.data is not empty
    // fallback() external payable {
    //     emit Received(msg.sender, msg.value);
    // }
}
