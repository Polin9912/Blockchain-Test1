const { expect } = require("chai");
const { verifyMerkleProof } = require("../../algorithms/task-01-merkle-verify");
const { buildMerkleRoot, getMerkleProof } = require("./merkle-helper");
const { keccak256 } = require("ethers");

describe("Algorithm Task 1: Merkle proof verification", function () {
  it("returns true for valid proof (single leaf)", function () {
    const leaf = "0x" + "ab".repeat(32);
    const leaves = [leaf];
    const root = buildMerkleRoot(leaves);
    const proof = getMerkleProof(leaves, 0);
    expect(verifyMerkleProof(leaf, root, proof)).to.equal(true);
  });

  it("returns true for valid proof (four leaves)", function () {
    const leaves = ["0x11", "0x22", "0x33", "0x44"].map((h) => keccak256(h));
    const root = buildMerkleRoot(leaves);
    expect(verifyMerkleProof(leaves[0], root, getMerkleProof(leaves, 0))).to.equal(true);
    expect(verifyMerkleProof(leaves[2], root, getMerkleProof(leaves, 2))).to.equal(true);
  });

  it("returns false for wrong leaf", function () {
    const leaves = ["0x11", "0x22"].map((h) => keccak256(h));
    const root = buildMerkleRoot(leaves);
    const proof = getMerkleProof(leaves, 0);
    expect(verifyMerkleProof(leaves[1], root, proof)).to.equal(false);
  });

  it("returns false for wrong root", function () {
    const leaf = keccak256("0x11");
    const root = "0x" + "00".repeat(32);
    expect(verifyMerkleProof(leaf, root, [])).to.equal(false);
  });
});
