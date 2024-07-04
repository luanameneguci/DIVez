const express = require("express");
const router = express.Router();

const accountTypeController = require("../controllers/AccountTypeController");

// Get all account types
router.get("/", accountTypeController.accountType_list);

// Create a new account type
router.post("/create", accountTypeController.accountType_create);

// Update an account type by ID
router.put("/update/:id", accountTypeController.accountType_update);

// Get an account type by ID
router.get("/:id", accountTypeController.accountType_detail);

// Delete an account type by ID
router.delete("/delete/:id", accountTypeController.accountType_delete);

module.exports = router;