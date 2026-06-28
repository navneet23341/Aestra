const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const handlesubmit =require("../controllers/adminController");

router.post("/store", upload.single("image") , handlesubmit)

module.exports = router;

