//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol"; //almost feels like cheating...

contract TimerToken is ERC20 {
    uint256 startTime;
    uint256 endTime;

    constructor(
        uint256 initialBalance,
        uint256 _startTime,
        uint256 _endTime
    ) ERC20("TimerToken", "TTOK") {
        startTime = _startTime;
        endTime = _endTime;

        _mint(msg.sender, initialBalance);
    }

    function transferToken(address to) internal {
        transfer(to, 1000);
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        uint256 rightNow = block.timestamp;
        require(
            rightNow < endTime && rightNow > startTime,
            "TimerToken: You can't do this right now."
        );
        super._beforeTokenTransfer(from, to, amount);
    }
}
