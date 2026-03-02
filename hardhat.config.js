require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  mocha: {
    bail: process.env.MOCHA_BAIL === "1",
    reporter: process.env.MOCHA_REPORTER || "spec",
  },
};
