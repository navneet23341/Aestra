const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { findOutfit } = require("../controllers/userController");

router.post(
    "/find",
    upload.single("image"),
    findOutfit
);

module.exports = router;