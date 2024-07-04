const express = require("express");
const router = express.Router();
const budgetStatusController = require("../controllers/BudgetStatusController");

// Get all budget statuses
router.get("/", budgetStatusController.budgetStatus_list);

// Create a new budget status
router.post("/create", budgetStatusController.budgetStatus_create);

// Update a budget status by ID
router.put("/update/:id", budgetStatusController.budgetStatus_update);

// Get a budget status by ID
router.get("/:id", budgetStatusController.budgetStatus_detail);

// Delete a budget status by ID
router.delete("/delete/:id", budgetStatusController.budgetStatus_delete);

module.exports = router;
