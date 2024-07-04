const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/BudgetController");

// Get all budgets
router.get("/", budgetController.budget_list);

// Create a new budget
router.post("/create", budgetController.budget_create);

// Update a budget
router.put("/update/:id", budgetController.budget_update);

// Get a budget by id
router.get("/:id", budgetController.budget_detail);

// Delete a budget by id
router.delete("/delete/:id", budgetController.budget_delete);

module.exports = router;
