const express = require("express");
const router = express.Router();
const budgetPackageController = require("../controllers/BudgetPackageController");

// Get all budget packages
router.get("/", budgetPackageController.budgetPackage_list);

// Create a new budget package
router.post("/create", budgetPackageController.budgetPackage_create);

// Update a budget package
router.put("/update", budgetPackageController.budgetPackage_update);

// Get a budget package by idPackage and idBudget
router.get("/:idPackage/:idBudget", budgetPackageController.budgetPackage_detail);

// Delete a budget package by idPackage and idBudget
router.delete("/delete/:idPackage/:idBudget", budgetPackageController.budgetPackage_delete);

module.exports = router;
