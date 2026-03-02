const { ethers } = require("hardhat");

async function deployVault() {
  const Vault = await ethers.getContractFactory("Vault");
  const vault = await Vault.deploy();
  return vault;
}

async function deployToken() {
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  return token;
}

function parseEther(amount) {
  return ethers.parseEther(String(amount));
}

module.exports = {
  deployVault,
  deployToken,
  parseEther,
};
