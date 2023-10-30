const express = require('express');
const router = express.Router();
const paymenController = require("../controllers/paymenController")
router.post("/create-payment", paymenController.createPayment)

module.exports = router;
