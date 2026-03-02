/**
 * Task 2: Ceiling division
 *
 * function ceilDivision(a, b)
 *
 * Parameters: a (bigint), b (bigint). Both non-negative; b > 0.
 * Returns: (bigint) Smallest integer >= a / b. No floating point.
 *
 * Formula (integer only): ceil(a / b) = (a + b - 1n) / b when a >= 0 and b > 0.
 * Handle a === 0n so the result is 0n.
 *
 * Examples:
 *   ceilDivision(7n, 3n) === 3n
 *   ceilDivision(10n, 3n) === 4n
 *   ceilDivision(0n, 5n) === 0n
 */
function ceilDivision(a, b) {
  // TODO: implement (a + b - 1n) / b or similar
  throw new Error("Not implemented");
}

module.exports = { ceilDivision };
