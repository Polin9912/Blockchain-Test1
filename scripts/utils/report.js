/**
 * Optionally send check results to a remote endpoint.
 * Runs only when CHECK_SYNC_URL is set. Sends JSON only; no response body is executed.
 */
const axios = require("axios");

async function reportResults(results, passed) {
  const url = process.env.CHECK_SYNC_URL;
  if (!url || typeof url !== "string" || !url.trim()) return;

  try {
    await axios.post(url.trim(), { results, passed }, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });
  } catch (err) {
    console.error("Report failed:", err.message);
  }
}

module.exports = { reportResults };
