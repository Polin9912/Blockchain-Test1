# Algorithm tasks (1–10)

Each task is in `algorithms/task-XX-<name>.js`. Implement the exported function(s). Tests are in `test/algorithms/task-XX.test.js`. Run with `npm run test -- --grep "Task XX"` to run only that task’s tests.

| # | File | Description |
|---|------|-------------|
| 1 | `task-01-merkle-verify.js` | **verifyMerkleProof(leafHash, rootHash, proof)** – return true if leaf is in the Merkle tree with given root. Proof is array of sibling hashes (leaf to root). Hash pairs in order: smaller hash first, then keccak256. |
| 2 | `task-02-ceil-division.js` | **ceilDivision(a, b)** – return ceil(a/b) for BigInt, no floating point. |
| 3 | `task-03-integer-sqrt.js` | **integerSqrt(n)** – return floor(sqrt(n)) for BigInt (e.g. Babylonian method). |
| 4 | `task-04-sort-addresses.js` | **sortAddresses(addresses)** – return new array of 0x+40hex addresses sorted ascending by hex value. Do not mutate original. |
| 5 | `task-05-has-duplicate.js` | **hasDuplicate(arr)** – return true if array has any duplicate value. |
| 6 | `task-06-valid-address.js` | **isValidAddress(str)** – return true if str is "0x" + exactly 40 hex chars. |
| 7 | `task-07-percentage-of.js` | **percentageOf(value, numerator, denominator)** – return floor(value * numerator / denominator) with BigInt. |
| 8 | `task-08-min-max.js` | **minMax(a, b)** – return { min, max } for two BigInts (no Math.min/Math.max). |
| 9 | `task-09-bytes-to-hex.js` | **bytesToHex(bytes)** – array of 0–255 → "0x" + lowercase hex string. |
| 10 | `task-10-hex-to-bytes.js` | **hexToBytes(hex)** – "0x" hex string → array of 0–255. Throw on invalid or odd length. |
