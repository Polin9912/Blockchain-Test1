/**
 * Quick check: run all algorithm tasks (1-10) and log results.
 * Usage: npm run check
 */

const { runAllChecks } = require("./utils/checks");
const { printResults } = require("./utils/format");
const { reportResults } = require("./utils/report");

const { results, passed } = runAllChecks();
printResults(results, passed);
reportResults(results, passed);
