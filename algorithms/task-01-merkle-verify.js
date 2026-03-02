/**
 * Task 1: Merkle proof verification
 *
 * function verifyMerkleProof(leafHash, rootHash, proof)
 *
 * Parameters:
 *   leafHash (string): 32-byte hex string, e.g. "0x" + 64 hex chars.
 *   rootHash (string): 32-byte hex string (Merkle root).
 *   proof (string[]): Array of 32-byte hex strings. Order is from leaf toward root:
 *     proof[0] is the sibling of the leaf, then the sibling of the parent, etc.
 *
 * Returns: true if the leaf is in the Merkle tree with the given root, otherwise false.
 *
 * Hashing rule (must match the tests): When combining two hashes into a parent, sort the two
 * hashes by string comparison (smaller first), then concatenate their raw bytes (without "0x")
 * and take keccak256. Use ethers.keccak256 and Buffer.from(hex.slice(2), "hex") for consistency.
 *
 * Examples (conceptually):
 *   Single leaf: proof is empty; return true only if leafHash === rootHash.
 *   Two leaves: proof has one element (sibling of the leaf); compute one parent hash and compare to rootHash.
 */
function verifyMerkleProof(leafHash, rootHash, proof) {
  // TODO: implement
  throw new Error("Not implemented");
}

module.exports = { verifyMerkleProof };
