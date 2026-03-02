/**
 * Format and print check results to stdout.
 */

function printResults(results, passed) {
  console.log("--- Algorithm check ---\n");
  results.forEach(({ n, status }) => console.log("  Task " + n + ": " + status));
  console.log("\n  " + passed + " / 10 passing\n");
}


module.exports = { printResults };
