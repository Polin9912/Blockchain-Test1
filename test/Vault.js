const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployVault, parseEther } = require("./helpers");

describe("Vault", function () {
  let vault;
  let owner, alice, bob;

  beforeEach(async function () {
    [owner, alice, bob] = await ethers.getSigners();
    vault = await deployVault();
  });

  describe("deployment", function () {
    it("initial balance is zero for any address", async function () {
      expect(await vault.balanceOf(owner.address)).to.equal(0);
      expect(await vault.balanceOf(alice.address)).to.equal(0);
    });
  });

  describe("deposit", function () {
    it("updates balanceOf after deposit", async function () {
      await vault.connect(alice).deposit({ value: parseEther("1") });
      expect(await vault.balanceOf(alice.address)).to.equal(parseEther("1"));
    });
    it("allows multiple deposits and accumulates balance", async function () {
      await vault.connect(alice).deposit({ value: parseEther("1") });
      await vault.connect(alice).deposit({ value: parseEther("1") });
      expect(await vault.balanceOf(alice.address)).to.equal(parseEther("2"));
    });
    it("emits Deposit event with correct sender and amount", async function () {
      const amount = parseEther("1");
      await expect(vault.connect(alice).deposit({ value: amount }))
        .to.emit(vault, "Deposit")
        .withArgs(alice.address, amount);
    });
  });

  describe("withdraw", function () {
    it("updates balance to zero after full withdraw", async function () {
      await vault.connect(alice).deposit({ value: parseEther("1") });
      await vault.connect(alice).withdraw(parseEther("1"));
      expect(await vault.balanceOf(alice.address)).to.equal(0);
    });
    it("allows partial withdraw and updates balance correctly", async function () {
      await vault.connect(alice).deposit({ value: parseEther("2") });
      await vault.connect(alice).withdraw(parseEther("1"));
      expect(await vault.balanceOf(alice.address)).to.equal(parseEther("1"));
    });
    it("sends ether to caller", async function () {
      const before = await ethers.provider.getBalance(alice.address);
      await vault.connect(alice).deposit({ value: parseEther("1") });
      const tx = await vault.connect(alice).withdraw(parseEther("1"));
      const receipt = await tx.wait();
      const gasCost = receipt.gasUsed * receipt.gasPrice;
      const after = await ethers.provider.getBalance(alice.address);
      expect(after).to.equal(before - gasCost);
    });
    it("emits Withdraw event with correct sender and amount", async function () {
      await vault.connect(alice).deposit({ value: parseEther("1") });
      const amount = parseEther("1");
      await expect(vault.connect(alice).withdraw(amount))
        .to.emit(vault, "Withdraw")
        .withArgs(alice.address, amount);
    });
    it("reverts with 'insufficient balance' when amount > balance", async function () {
      await expect(vault.connect(alice).withdraw(parseEther("1"))).to.be.revertedWith("insufficient balance");
    });
  });

  describe("multiple users", function () {
    it("keeps separate balances for different users", async function () {
      await vault.connect(alice).deposit({ value: parseEther("1") });
      await vault.connect(bob).deposit({ value: parseEther("2") });
      expect(await vault.balanceOf(alice.address)).to.equal(parseEther("1"));
      expect(await vault.balanceOf(bob.address)).to.equal(parseEther("2"));
    });
    it("one user withdraw does not affect another user balance", async function () {
      await vault.connect(alice).deposit({ value: parseEther("1") });
      await vault.connect(bob).deposit({ value: parseEther("2") });
      await vault.connect(alice).withdraw(parseEther("1"));
      expect(await vault.balanceOf(bob.address)).to.equal(parseEther("2"));
    });
  });
});
