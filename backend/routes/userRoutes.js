const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadProfilePhoto } = require("../controllers/userController");

router.post(
    "/profile-photo",
    authMiddleware,
    upload.single("image"),
    uploadProfilePhoto
);

module.exports = router;