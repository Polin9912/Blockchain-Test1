// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * Vault: users can deposit ETH and withdraw their balance.
 * Balances are per-address (multiple users; each address has its own balance).
 *
 * TODO (candidate implements):
 * - balanceOf(address) should return each user's deposited ETH.
 * - deposit() payable: add msg.value to balanceOf[msg.sender], emit Deposit(msg.sender, msg.value).
 * - withdraw(amount): require balanceOf[msg.sender] >= amount, subtract from balance,
 *   send amount ETH to msg.sender (e.g. msg.sender.call{value: amount}("")), emit Withdraw(msg.sender, amount).
 *   Revert with "insufficient balance" if balance too low. Update balance before the external call.
 */
contract Vault {
    mapping(address => uint256) public balanceOf;

    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed sender, uint256 amount);

    function deposit() external payable {
        revert("Not implemented");
    }

    function withdraw(uint256 amount) external {
        revert("Not implemented");
    }
}
