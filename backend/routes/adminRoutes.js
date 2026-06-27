const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const handlesubmit =require("../controllers/adminController");

router.post("/find", upload.single("image") , handlesubmit)

module.exports = router;

