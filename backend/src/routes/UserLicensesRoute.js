const express = require("express");
const router = express.Router();
const UserLicensesController = require('../controllers/UserLicensesController');

router.get("/:id/managers", UserLicensesController.getManagers); 
router.post("/create", UserLicensesController.createUserLicense);
router.delete('/delete', UserLicensesController.deleteUserLicenses);

module.exports = router;