const express = require("express");
const router = express.Router();
const licensesController = require("../controllers/LicensesController");

// Get all licenses
router.get("/", licensesController.licenses_list);

// Create a new license
router.post("/create", licensesController.createLicenses);

// Get count of licenses with idLicenseStatus = 1
router.get('/active', licensesController.countLicensesWithStatus1);

// Get count of licenses with idLicenseStatus = 2
router.get('/inactive', licensesController.countLicensesWithStatus2);


// Update a license by licenseKey
router.put("/update/:licenseKey", licensesController.licenses_update);

// Get a license by licenseKey
router.get("/:licenseKey", licensesController.licenses_detail);

// Delete a license by licenseKey
router.delete("/delete", licensesController.licenses_delete);

router.get("/status/:idUser", licensesController.getActiveLicenses);

router.get("/count/:idUser", licensesController.countLikedUsers);

router.get('/user/:idUser', licensesController.licensesByUser);

module.exports = router;
