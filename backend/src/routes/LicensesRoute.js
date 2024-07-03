const express = require("express");
const router = express.Router();
const licensesController = require("../controllers/LicensesController");

// Get all licenses
router.get("/", licensesController.licenses_list);

// Create a new license
router.post("/create", licensesController.licenses_create);

// Update a license by licenseKey
router.put("/update/:licenseKey", licensesController.licenses_update);

// Get a license by licenseKey
router.get("/:licenseKey", licensesController.licenses_detail);

// Delete a license by licenseKey
router.delete("/delete/:licenseKey", licensesController.licenses_delete);

module.exports = router;
