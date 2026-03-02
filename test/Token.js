const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployToken, parseEther } = require("./helpers");

describe("Token", function () {
  let token;
  let owner, alice, bob;

  beforeEach(async function () {
    [owner, alice, bob] = await ethers.getSigners();
    token = await deployToken();
  });

  describe("deployment", function () {
    it("has correct name, symbol, decimals", async function () {
      expect(await token.name()).to.equal("Test Token");
      expect(await token.symbol()).to.equal("TKN");
      expect(await token.decimals()).to.equal(18);
    });
    it("initial totalSupply and balances are zero", async function () {
      expect(await token.totalSupply()).to.equal(0);
      expect(await token.balanceOf(owner.address)).to.equal(0);
    });
  });

  describe("mint", function () {
    it("increases balanceOf recipient", async function () {
      await token.mint(alice.address, 100);
      expect(await token.balanceOf(alice.address)).to.equal(100);
    });
    it("increases totalSupply", async function () {
      await token.mint(alice.address, 100);
      expect(await token.totalSupply()).to.equal(100);
    });
    it("emits Transfer event from zero address", async function () {
      const amount = 100;
      await expect(token.mint(alice.address, amount))
        .to.emit(token, "Transfer")
        .withArgs(ethers.ZeroAddress, alice.address, amount);
    });
    it("allows multiple mints to same address", async function () {
      await token.mint(alice.address, 50);
      await token.mint(alice.address, 50);
      expect(await token.balanceOf(alice.address)).to.equal(100);
    });
  });

  describe("transfer", function () {
    it("moves tokens from sender to recipient", async function () {
      await token.mint(alice.address, 100);
      await token.connect(alice).transfer(bob.address, 50);
      expect(await token.balanceOf(alice.address)).to.equal(50);
      expect(await token.balanceOf(bob.address)).to.equal(50);
    });
    it("reverts with 'insufficient balance' when amount > balance", async function () {
      await expect(token.connect(alice).transfer(bob.address, 1)).to.be.revertedWith("insufficient balance");
    });
    it("emits Transfer event with correct from, to, value", async function () {
      await token.mint(alice.address, 100);
      const amount = 50;
      await expect(token.connect(alice).transfer(bob.address, amount))
        .to.emit(token, "Transfer")
        .withArgs(alice.address, bob.address, amount);
    });
  });

  describe("approve and transferFrom", function () {
    it("approve sets allowance", async function () {
      await token.connect(alice).approve(bob.address, 50);
      expect(await token.allowance(alice.address, bob.address)).to.equal(50);
    });
    it("transferFrom moves tokens when allowance sufficient", async function () {
      await token.mint(alice.address, 100);
      await token.connect(alice).approve(bob.address, 50);
      await token.connect(bob).transferFrom(alice.address, bob.address, 50);
      expect(await token.balanceOf(alice.address)).to.equal(50);
      expect(await token.balanceOf(bob.address)).to.equal(50);
    });
    it("reverts with 'insufficient allowance' when amount > allowance", async function () {
      await token.mint(alice.address, 100);
      await token.connect(alice).approve(bob.address, 10);
      await expect(token.connect(bob).transferFrom(alice.address, bob.address, 20)).to.be.revertedWith(
        "insufficient allowance"
      );
    });
    it("reverts with 'insufficient balance' when from has insufficient balance", async function () {
      await token.mint(alice.address, 10);
      await token.connect(alice).approve(bob.address, 100);
      await expect(token.connect(bob).transferFrom(alice.address, bob.address, 50)).to.be.revertedWith(
        "insufficient balance"
      );
    });
    it("decreases allowance after transferFrom", async function () {
      await token.mint(alice.address, 100);
      await token.connect(alice).approve(bob.address, 100);
      await token.connect(bob).transferFrom(alice.address, bob.address, 30);
      expect(await token.allowance(alice.address, bob.address)).to.equal(70);
    });
  });
});
