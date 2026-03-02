# Live coding test – instructions for applicants

You will be assigned **two** problems by the interviewer:

1. **One algorithm problem** (Task 1–10)  
2. **One smart contract problem** (Vault or Token)

Implement only the **assigned** algorithm and the **assigned** contract (the Solidity code). You do not need to complete all 10 algorithms or both contracts. For the contract task, implement the smart contract so the existing tests pass; do not edit the test files.

**Important:** Use `npm run test` to run tests (do **not** use `npx hardhat test`). This project uses a local Hardhat installation; `npx` may run a different version and fail.

---

## 1. Environment and setup

**Requirements:** Node.js (v18 or later recommended), npm.

**Setup:**

```bash
cd <project-folder>
npm install
```

**Contract result (Vault & Token):**

```bash
npm run test
```

Runs the Vault and Token test suites.

**Algorithm result (tasks 1–10):**

```bash
npm run check
```

Runs all algorithm tasks; one line per task (OK / MISMATCH / Error) and a summary.


**Run only your assigned tests** (pass `--grep` after `--`):

- Algorithm Task 3:  
  `npm run test -- --grep "Task 3"`
- Vault only:  
  `npm run test -- --grep "Vault"`
- Token only:  
  `npm run test -- --grep "Token"`

Correctness is checked by running the test suite; your assigned tests must pass.

---

## 2. Project structure

| Path | Purpose |
|------|--------|
| `contracts/Vault.sol` | Vault contract (deposit/withdraw ETH) |
| `contracts/Token.sol` | Token contract (mint, transfer, approve, transferFrom) |
| `algorithms/task-01-merkle-verify.js` … `task-10-hex-to-bytes.js` | Algorithm stubs — implement the assigned one |
| `test/helpers.js` | `deployVault()`, `deployToken()`, `parseEther()` — use in contract tests |
| `test/Vault.js` | Vault tests (complete — do not edit) |
| `test/Token.js` | Token tests (complete — do not edit) |
| `test/algorithms/task-01.test.js` … `task-10.test.js` | Algorithm tests (do not edit) |
| `test/algorithms/merkle-helper.js` | Helper for Task 1 tests (do not edit) |
| `hardhat.config.js` | Hardhat config (do not edit) |
| `scripts/check.js` | Quick check for all algorithm tasks (`npm run check`) |
| `config/test-accounts.js` | Account labels reference |

---

## 3. Algorithm problems (Tasks 1–10)

Implement the required function in the file listed. Each file currently throws `"Not implemented"`. Replace that with your implementation and **keep the same function name and export**. Do not change the test files.

---

### Task 1: Merkle proof verification

**File to edit:** `algorithms/task-01-merkle-verify.js`

**Function to implement:**

```js
function verifyMerkleProof(leafHash, rootHash, proof)
```

- **Parameters:**  
  - `leafHash` (string): 32-byte hex string, e.g. `"0x" + 64 hex chars`.  
  - `rootHash` (string): 32-byte hex string (Merkle root).  
  - `proof` (string[]): Array of 32-byte hex strings. Order is from leaf toward root: `proof[0]` is the sibling of the leaf, then the sibling of the parent, etc.
- **Returns:** `true` if the leaf is in the Merkle tree with the given root, otherwise `false`.

**Hashing rule (must match the tests):** When combining two hashes into a parent, **sort the two hashes by string comparison** (smaller first), then concatenate their raw bytes (without `0x`) and take `keccak256`. Use `ethers.keccak256` and `Buffer.from(hex.slice(2), "hex")` for consistency.

**Examples (conceptually):**  
- Single leaf: `proof` is empty; return `true` only if `leafHash === rootHash`.  
- Two leaves: `proof` has one element (sibling of the leaf); compute one parent hash and compare to `rootHash`.

---

### Task 2: Ceiling division

**File to edit:** `algorithms/task-02-ceil-division.js`

**Function to implement:**

```js
function ceilDivision(a, b)
```

- **Parameters:** `a` (bigint), `b` (bigint). Both non-negative; `b > 0`.  
- **Returns:** (bigint) Smallest integer `>= a / b`. No floating point.

**Formula (integer only):** `ceil(a / b) = (a + b - 1n) / b` when `a >= 0` and `b > 0`. Handle `a === 0n` so the result is `0n`.

**Examples:**  
- `ceilDivision(7n, 3n) === 3n`  
- `ceilDivision(10n, 3n) === 4n`  
- `ceilDivision(0n, 5n) === 0n`

---

### Task 3: Integer square root

**File to edit:** `algorithms/task-03-integer-sqrt.js`

**Function to implement:**

```js
function integerSqrt(n)
```

- **Parameters:** `n` (bigint), non-negative.  
- **Returns:** (bigint) `floor(sqrt(n))`.

**Examples:**  
- `integerSqrt(0n) === 0n`  
- `integerSqrt(4n) === 2n`  
- `integerSqrt(10n) === 3n`  
- `integerSqrt(99n) === 9n`

You can use e.g. the Babylonian (Newton) method in integers until the result stabilizes.

---

### Task 4: Sort addresses

**File to edit:** `algorithms/task-04-sort-addresses.js`

**Function to implement:**

```js
function sortAddresses(addresses)
```

- **Parameters:** `addresses` (string[]): Array of Ethereum addresses, each `"0x"` followed by exactly 40 hexadecimal characters (e.g. `"0x0000000000000000000000000000000000000001"`).  
- **Returns:** (string[]) A **new** array with the same addresses sorted in **ascending order by the hex string** (e.g. lexicographic comparison of the full string). Do **not** mutate the original array.

**Example:**  
- Input: `["0x...03", "0x...01", "0x...02"]`  
- Output: `["0x...01", "0x...02", "0x...03"]`

---

### Task 5: Has duplicate

**File to edit:** `algorithms/task-05-has-duplicate.js`

**Function to implement:**

```js
function hasDuplicate(arr)
```

- **Parameters:** `arr` (array): Array of primitives or strings (no need to support objects).  
- **Returns:** (boolean) `true` if any value appears more than once (by value equality), otherwise `false`.

**Examples:**  
- `hasDuplicate([1, 2, 1]) === true`  
- `hasDuplicate([1, 2, 3]) === false`  
- `hasDuplicate([]) === false`

---

### Task 6: Valid Ethereum address

**File to edit:** `algorithms/task-06-valid-address.js`

**Function to implement:**

```js
function isValidAddress(str)
```

- **Parameters:** `str` (string).  
- **Returns:** (boolean) `true` if `str` is a valid 20-byte address: **exactly** the prefix `"0x"` (or `"0X"`) followed by **exactly 40 hexadecimal characters** (`0-9`, `a-f`, `A-F`). Otherwise `false`.

**Examples:**  
- `isValidAddress("0x" + "ab".repeat(20)) === true`  
- `isValidAddress("0x" + "ab".repeat(19)) === false` (too short)  
- `isValidAddress("0xgg" + "00".repeat(19)) === false` (non-hex)

---

### Task 7: Percentage of

**File to edit:** `algorithms/task-07-percentage-of.js`

**Function to implement:**

```js
function percentageOf(value, numerator, denominator)
```

- **Parameters:** All bigint. `denominator` is non-zero.  
- **Returns:** (bigint) `floor((value * numerator) / denominator)`.

**Examples:**  
- `percentageOf(100n, 5n, 100n) === 5n` (5% of 100)  
- `percentageOf(100n, 1n, 3n) === 33n`

---

### Task 8: Min and max

**File to edit:** `algorithms/task-08-min-max.js`

**Function to implement:**

```js
function minMax(a, b)
```

- **Parameters:** `a` (bigint), `b` (bigint).  
- **Returns:** (object) `{ min: bigint, max: bigint }`. Do not use `Math.min` / `Math.max` (they don’t support BigInt in all environments). Use comparisons only.

**Examples:**  
- `minMax(5n, 10n)` → `{ min: 5n, max: 10n }`  
- `minMax(10n, 5n)` → `{ min: 5n, max: 10n }`  
- `minMax(10n, 10n)` → `{ min: 10n, max: 10n }`

---

### Task 9: Bytes to hex

**File to edit:** `algorithms/task-09-bytes-to-hex.js`

**Function to implement:**

```js
function bytesToHex(bytes)
```

- **Parameters:** `bytes` (number[]): Array of integers in range 0–255.  
- **Returns:** (string) The hex encoding with `"0x"` prefix and **lowercase** hex digits, e.g. `"0x00ff10"` for `[0, 255, 16]`. For empty array return `"0x"`.

---

### Task 10: Hex to bytes

**File to edit:** `algorithms/task-10-hex-to-bytes.js`

**Function to implement:**

```js
function hexToBytes(hex)
```

- **Parameters:** `hex` (string): Must be `"0x"` followed by an **even** number of hex characters.  
- **Returns:** (number[]) Array of integers 0–255 (one byte per two hex chars).  
- **Errors:** Throw an `Error` (or use `require`) if the string is not valid hex or has odd length (e.g. `"0x0"`).

**Example:** `hexToBytes("0x00ff10")` → `[0, 255, 16]`

---

## 4. Smart contract problem A: Vault

**Your task:** Implement the **contract** in `contracts/Vault.sol`. The contract is currently a stub (deposit and withdraw revert with "Not implemented"). Replace the stub logic so that the contract matches the API below. The tests in `test/Vault.js` are already written; do **not** edit them. Run `npm run test` (or `npm run test -- --grep "Vault"`) to verify your implementation.

### 4.1 Vault contract API (your implementation must match)

- **State:**  
  - `balanceOf(address) → uint256`: ETH balance per user.
- **Events:**  
  - `Deposit(address indexed sender, uint256 amount)`  
  - `Withdraw(address indexed sender, uint256 amount)`
- **Functions:**  
  - `deposit()`: `payable`. Adds `msg.value` to `balanceOf[msg.sender]` and emits `Deposit(msg.sender, msg.value)`.  
  - `withdraw(uint256 amount)`: Requires `balanceOf[msg.sender] >= amount`. Subtracts from balance, sends `amount` ETH to `msg.sender`, emits `Withdraw(msg.sender, amount)`. Reverts with `"insufficient balance"` if balance is too low.

### 4.2 Test helpers

At the top of `test/Vault.js` you have:

```js
const { deployVault, parseEther } = require("./helpers");
```

- `deployVault()`: Returns a deployed Vault contract instance.  
- `parseEther("1")` or `parseEther(1)`: Returns bigint for 1 ether (10^18 wei). Use for `value` and amounts.

Signers: `[owner, alice, bob] = await ethers.getSigners()`. Use `vault.connect(alice)` when the transaction must be sent by `alice`.

### 4.3 Implementation note

Update state (e.g. `balanceOf[msg.sender] -= amount`) **before** the external call in `withdraw` (e.g. `msg.sender.call{value: amount}("")`) to avoid reentrancy. Revert with exactly `"insufficient balance"` when balance is too low.

---

## 5. Smart contract problem B: Token

**Your task:** Implement the **contract** in `contracts/Token.sol`. The contract is currently a stub (mint, transfer, approve, transferFrom revert with "Not implemented"). Replace the stub logic so that the contract matches the API below. The tests in `test/Token.js` are already written; do **not** edit them. Run `npm run test` (or `npm run test -- --grep "Token"`) to verify your implementation.

### 5.1 Token contract API (your implementation must match)

- **State:**  
  - `name()` → "Test Token", `symbol()` → "TKN", `decimals()` → 18  
  - `totalSupply()` → uint256  
  - `balanceOf(address)` → uint256  
  - `allowance(owner, spender)` → uint256
- **Events:**  
  - `Transfer(address indexed from, address indexed to, uint256 value)`  
  - `Approval(address indexed owner, address indexed spender, uint256 value)`
- **Functions:**  
  - `mint(address to, uint256 amount)`: Adds `amount` to `totalSupply` and `balanceOf[to]`, emits `Transfer(address(0), to, amount)`.  
  - `transfer(address to, uint256 amount)`: Transfers from `msg.sender` to `to`. Reverts with `"insufficient balance"` if `balanceOf[msg.sender] < amount`.  
  - `approve(address spender, uint256 amount)`: Sets `allowance[msg.sender][spender] = amount`, emits `Approval`.  
  - `transferFrom(address from, address to, uint256 amount)`: Requires `allowance[from][msg.sender] >= amount` and `balanceOf[from] >= amount`. Decreases allowance and moves tokens. Reverts with `"insufficient allowance"` or `"insufficient balance"` as appropriate.

Amounts in tests can be plain numbers (e.g. `100`) or bigint; ethers will handle them. For 18-decimal tokens, `100` means 100 units (100 * 10^18 in wei internally if the contract uses 18 decimals).

### 5.2 Test helpers

```js
const { deployToken, parseEther } = require("./helpers");
```

- `deployToken()`: Returns a deployed Token instance.  
- `parseEther` is available if you need large amounts; for simple token amounts you can use e.g. `100n` or `100`.

Use `token.connect(alice)` so that `mint`, `transfer`, etc. are called by `alice`. Only the deployer (or anyone, for this contract) can call `mint`; in tests you can call `token.mint(alice.address, 100)` from default signer, then use `token.connect(alice).transfer(...)`.

### 5.3 Implementation note

The tests in `test/Token.js` already cover deployment, mint, transfer, approve, and transferFrom. Implement the contract so they pass. Revert with exactly `"insufficient balance"` or `"insufficient allowance"` as specified.

---

## 6. Quick reference

| What you do        | File(s) to edit                    | Run tests with                                |
|--------------------|-------------------------------------|-----------------------------------------------|
| All algorithms     | —                                  | `npm run check`                               |
| Contract result    | —                                  | `npm run test`                                |
| Algorithm Task 1   | `algorithms/task-01-merkle-verify.js` | `npm run test -- --grep "Task 1"`             |
| Algorithm Task 2   | `algorithms/task-02-ceil-division.js` | `npm run test -- --grep "Task 2"`             |
| … through Task 10  | `algorithms/task-10-hex-to-bytes.js` | `npm run test -- --grep "Task 10"`            |
| Vault              | `contracts/Vault.sol`               | `npm run test -- --grep "Vault"`               |
| Token              | `contracts/Token.sol`               | `npm run test -- --grep "Token"`              |

- **ethers** is available globally in Hardhat tests (`require("hardhat")` gives you `ethers`).  
- **expect** from chai: `expect(x).to.equal(y)`, `expect(x).to.deep.equal(y)`, `expect(tx).to.be.revertedWith("message")`, `expect(tx).to.emit(contract, "EventName").withArgs(...)`.  
- For **payable** calls: `contract.deposit({ value: parseEther("1") })`.  
- **BigInt**: use `n` suffix (e.g. `100n`) or `BigInt(x)`.

Once you know your assigned algorithm and contract, open the right file and start coding. Good luck.
