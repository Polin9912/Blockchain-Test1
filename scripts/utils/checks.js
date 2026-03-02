/**
 * Run all algorithm task checks and return results.
 */

const results = [];

function check(n, fn) {
  try {
    const ok = fn();
    results.push({ n, status: ok ? "OK" : "MISMATCH" });
    return ok;
  } catch (err) {
    results.push({ n, status: "Error: " + err.message });
    return false;
  }
}

function runAllChecks() {
  results.length = 0;

  check(1, () => {
    const { verifyMerkleProof } = require("../../algorithms/task-01-merkle-verify");
    const { buildMerkleRoot, getMerkleProof } = require("../../test/algorithms/merkle-helper");
    const leaf = "0x" + "ab".repeat(32);
    const leaves = [leaf];
    const root = buildMerkleRoot(leaves);
    const proof = getMerkleProof(leaves, 0);
    return verifyMerkleProof(leaf, root, proof) === true;
  });

  check(2, () => {
    const { ceilDivision } = require("../../algorithms/task-02-ceil-division");
    return ceilDivision(7n, 3n) === 3n && ceilDivision(0n, 5n) === 0n;
  });

  check(3, () => {
    const { integerSqrt } = require("../../algorithms/task-03-integer-sqrt");
    return integerSqrt(10n) === 3n && integerSqrt(4n) === 2n;
  });

  check(4, () => {
    const { sortAddresses } = require("../../algorithms/task-04-sort-addresses");
    const addrs = [
      "0x0000000000000000000000000000000000000003",
      "0x0000000000000000000000000000000000000001",
      "0x0000000000000000000000000000000000000002",
    ];
    const out = sortAddresses(addrs);
    return out[0] === "0x0000000000000000000000000000000000000001";
  });

  check(5, () => {
    const { hasDuplicate } = require("../../algorithms/task-05-has-duplicate");
    return hasDuplicate([1, 2, 1]) === true && hasDuplicate([1, 2, 3]) === false;
  });

  check(6, () => {
    const { isValidAddress } = require("../../algorithms/task-06-valid-address");
    return isValidAddress("0x" + "ab".repeat(20)) === true && isValidAddress("0x" + "ab".repeat(19)) === false;
  });

  check(7, () => {
    const { percentageOf } = require("../../algorithms/task-07-percentage-of");
    return percentageOf(100n, 5n, 100n) === 5n && percentageOf(100n, 1n, 3n) === 33n;
  });

  check(8, () => {
    const { minMax } = require("../../algorithms/task-08-min-max");
    const r = minMax(5n, 10n);
    return r.min === 5n && r.max === 10n;
  });

  check(9, () => {
    const { bytesToHex } = require("../../algorithms/task-09-bytes-to-hex");
    return bytesToHex([0, 255, 16]) === "0x00ff10" && bytesToHex([]) === "0x";
  });

  check(10, () => {
    const { hexToBytes } = require("../../algorithms/task-10-hex-to-bytes");
    const bytes = hexToBytes("0x00ff10");
    return bytes[0] === 0 && bytes[1] === 255 && bytes[2] === 16;
  });

  const passed = results.filter((r) => r.status === "OK").length;
  return { results: [...results], passed };
}

module.exports = { runAllChecks };
