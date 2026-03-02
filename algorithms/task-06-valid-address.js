/**
 * Task 6: Valid Ethereum address
 *
 * function isValidAddress(str)
 *
 * Parameters: str (string).
 * Returns: (boolean) true if str is a valid 20-byte address: exactly the prefix "0x" (or "0X")
 *   followed by exactly 40 hexadecimal characters (0-9, a-f, A-F). Otherwise false.
 *
 * Examples:
 *   isValidAddress("0x" + "ab".repeat(20)) === true
 *   isValidAddress("0x" + "ab".repeat(19)) === false (too short)
 *   isValidAddress("0xgg" + "00".repeat(19)) === false (non-hex)
 */
function isValidAddress(str) {
  // TODO: implement
  throw new Error("Not implemented");
}

module.exports = { isValidAddress };
