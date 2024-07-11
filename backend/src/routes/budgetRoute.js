const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/BudgetController");

// Get all budgets
router.get("/", budgetController.budget_list);

// Create a new budget
router.post("/create/:idUser", budgetController.budget_create);

// Get number of New Budgets
router.get("/new", budgetController.countBudgetsWithStatus1);

// Get number of Pending Budgets
router.get("/pending", budgetController.countBudgetsWithStatus2);

// Get number of Paid Budgets
router.get("/paid", budgetController.countBudgetsWithStatus3);

// Get number of Rejected Budgets
router.get("/rejected", budgetController.countBudgetsWithStatus4);

// Update a budget
router.put("/update/:id", budgetController.budget_update);

// Get a budget by id
router.get("/:id", budgetController.budget_detail);

// Delete a budget by id
router.delete("/delete/:id", budgetController.budget_delete);

router.get('/count/:idUser', budgetController.count_budgets_status2);

router.get('/status2/user/:idUser', budgetController.getPendingBudgets);

router.get('/status1/user/:idUser', budgetController.getNewBudgets);

router.get('/user/:idUser', budgetController.getBudgetsByUser);

router.get('/products/:idBudget', budgetController.getBudgetProducts);

module.exports = router;
