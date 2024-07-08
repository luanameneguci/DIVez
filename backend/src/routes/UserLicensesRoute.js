const express = require("express");
const router = express.Router();
const UserLicensesController = require('../controllers/UserLicensesController');

router.get("/:id/managers", UserLicensesController.getManagers); 

module.exports = router;