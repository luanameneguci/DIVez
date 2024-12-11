const express = require("express");
const router = express.Router();
const licenseStatusController = require("../controllers/LicenseStatusController");

// Get all license statuses
router.get("/", licenseStatusController.licenseStatus_list);

// Create a new license status
router.post("/create", licenseStatusController.licenseStatus_create);

// Update a license status by id
router.put("/update/:id", licenseStatusController.licenseStatus_update);

// Get a license status by id
router.get("/:id", licenseStatusController.licenseStatus_detail);

// Delete a license status by id
router.delete("/delete/:id", licenseStatusController.licenseStatus_delete);

module.exports = router;
