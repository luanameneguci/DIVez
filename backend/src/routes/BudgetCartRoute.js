const express = require("express");
const router = express.Router();
const budgetCartController = require("../controllers/BudgetCartController");

// Get all budget cart associations
router.get("/", budgetCartController.budgetCart_list);

// Create a new budget cart association
router.post("/create", budgetCartController.budgetCart_create);

// Update a budget cart association
router.put("/update", budgetCartController.budgetCart_update);

// Get a budget cart association by idCart and idBudget
router.get("/:idCart/:idBudget", budgetCartController.budgetCart_detail);

// Delete a budget cart association by idCart and idBudget
router.delete("/delete/:idCart/:idBudget", budgetCartController.budgetCart_delete);

module.exports = router;
