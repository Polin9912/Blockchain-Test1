const { expect } = require("chai");
const { bytesToHex } = require("../../algorithms/task-09-bytes-to-hex");

describe("Algorithm Task 9: Bytes to hex", function () {
  it("returns 0x prefix and lowercase hex", function () {
    expect(bytesToHex([0, 255, 16])).to.equal("0x00ff10");
  });
  it("returns empty 0x for empty array", function () {
    expect(bytesToHex([])).to.equal("0x");
  });
});
