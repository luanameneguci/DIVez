const express = require("express");
const router = express.Router();

const billingController = require("../controllers/BillingController");

// Get all billing records
router.get("/", billingController.billing_list);

// Create a new billing record
router.post("/create", billingController.billing_create);

// Update a billing record by ID
router.put("/update/:id", billingController.billing_update);

// Get a billing record by ID
router.get("/:id", billingController.billing_detail);

// Delete a billing record by ID
router.delete("/delete/:id", billingController.billing_delete);

module.exports = router;
