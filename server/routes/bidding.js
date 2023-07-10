const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/submit/:bidid", auth, (req, res) => {
    res.status(200).json({"message":"In Progress"});
});

module.exports = router;