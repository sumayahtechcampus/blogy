// require necessary npm packages
const express = require("express");
// Instantiate Express a Router Object (mini app to handle routes)
const router = express();
/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /
 * Description: Get the Root Route
 */
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Blogy" });
});
// Export the router so we can use it in the server.js file
module.exports = router;