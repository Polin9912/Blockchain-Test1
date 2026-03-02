const { expect } = require("chai");
const { hexToBytes } = require("../../algorithms/task-10-hex-to-bytes");

describe("Algorithm Task 10: Hex to bytes", function () {
  it("returns byte array for valid hex", function () {
    expect(hexToBytes("0x00ff10")).to.deep.equal([0, 255, 16]);
  });
  it("throws for odd length hex", function () {
    expect(() => hexToBytes("0x0")).to.throw();
  });
  it("throws for non-hex characters", function () {
    expect(() => hexToBytes("0xgg")).to.throw();
  });
});
