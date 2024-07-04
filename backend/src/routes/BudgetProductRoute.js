const express = require("express");
const router = express.Router();
const budgetProductController = require("../controllers/BudgetProductController");

// Get all budget products
router.get("/", budgetProductController.budgetProduct_list);

// Create a new budget product
router.post("/create", budgetProductController.budgetProduct_create);

// Update a budget product
router.put("/update", budgetProductController.budgetProduct_update);

// Get a budget product by idProduct and idBudget
router.get("/:idProduct/:idBudget", budgetProductController.budgetProduct_detail);

// Delete a budget product by idProduct and idBudget
router.delete("/delete/:idProduct/:idBudget", budgetProductController.budgetProduct_delete);

module.exports = router;
