const express = require("express");
const router = express.Router();
const licenseUserController = require("../controllers/LicenseUserController");

// Get all license users
router.get("/", licenseUserController.licenseUser_list);

// Create a new license user
router.post("/create", licenseUserController.licenseUser_create);

// Update a license user by id
router.put("/update/:id", licenseUserController.licenseUser_update);

// Get a license user by id
router.get("/:id", licenseUserController.licenseUser_detail);

// Delete a license user by id
router.delete("/delete/:id", licenseUserController.licenseUser_delete);

module.exports = router;
