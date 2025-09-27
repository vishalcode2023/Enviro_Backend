const express = require("express");
const router = express.Router();
const { ContactController, enviroController } = require("../Controller/ContactController");

router.post("/contact", ContactController);
router.post("/enviro", enviroController);

module.exports = router;
