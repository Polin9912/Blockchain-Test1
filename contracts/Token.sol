// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * Token: minimal ERC20-style token.
 *
 * TODO (candidate implements):
 * - name, symbol, decimals, totalSupply, balanceOf, allowance (already declared).
 * - mint(to, amount): add amount to totalSupply and balanceOf[to], emit Transfer(address(0), to, amount).
 * - transfer(to, amount): move amount from msg.sender to to; revert "insufficient balance" if needed; emit Transfer; return true.
 * - approve(spender, amount): set allowance[msg.sender][spender] = amount; emit Approval; return true.
 * - transferFrom(from, to, amount): require allowance[from][msg.sender] >= amount and balanceOf[from] >= amount;
 *   decrease allowance, move tokens; revert "insufficient allowance" or "insufficient balance" as needed; emit Transfer; return true.
 */
contract Token {
    string public name = "Test Token";
    string public symbol = "TKN";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function mint(address to, uint256 amount) external {
        revert("Not implemented");
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        revert("Not implemented");
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        revert("Not implemented");
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        revert("Not implemented");
    }
}
