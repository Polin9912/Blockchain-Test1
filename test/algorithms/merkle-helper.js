const { keccak256 } = require("ethers");

function hashPair(a, b) {
  const [left, right] = a < b ? [a, b] : [b, a];
  return keccak256(
    Buffer.concat([
      Buffer.from(left.slice(2), "hex"),
      Buffer.from(right.slice(2), "hex"),
    ])
  );
}

function buildMerkleRoot(leaves) {
  if (leaves.length === 0) return "0x" + "00".repeat(32);
  let layer = leaves.map((l) => (l.startsWith("0x") ? l : keccak256(l)));
  while (layer.length > 1) {
    const next = [];
    for (let i = 0; i < layer.length; i += 2) {
      const right = i + 1 < layer.length ? layer[i + 1] : layer[i];
      next.push(hashPair(layer[i], right));
    }
    layer = next;
  }
  return layer[0];
}

function getMerkleProof(leaves, leafIndex) {
  let layer = leaves.map((l) => (l.startsWith("0x") && l.length === 66 ? l : keccak256(l)));
  const proof = [];
  let idx = leafIndex;
  while (layer.length > 1) {
    const next = [];
    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i];
      const right = i + 1 < layer.length ? layer[i + 1] : left;
      next.push(hashPair(left, right));
      if (i === idx || i + 1 === idx) {
        proof.push(idx % 2 === 0 ? right : left);
        idx = Math.floor(idx / 2);
      }
    }
    layer = next;
  }
  return proof;
}

module.exports = { buildMerkleRoot, getMerkleProof, hashPair };
