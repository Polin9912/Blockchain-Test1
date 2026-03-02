const { expect } = require("chai");
const { isValidAddress } = require("../../algorithms/task-06-valid-address");

describe("Algorithm Task 6: Valid Ethereum address", function () {
  it("returns true for valid 0x + 40 hex", function () {
    expect(isValidAddress("0x" + "ab".repeat(20))).to.equal(true);
    expect(isValidAddress("0x0000000000000000000000000000000000000000")).to.equal(true);
  });
  it("returns false for wrong length", function () {
    expect(isValidAddress("0x" + "ab".repeat(19))).to.equal(false);
    expect(isValidAddress("0x" + "ab".repeat(21))).to.equal(false);
  });
  it("returns false for non-hex or missing 0x", function () {
    expect(isValidAddress("0xgg" + "00".repeat(19))).to.equal(false);
    expect(isValidAddress("ab".repeat(20))).to.equal(false);
  });
});
