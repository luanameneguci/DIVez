const express = require("express");
const Sequelize = require("sequelize");
const sequelize = require("../models/database");
const Budget = require("../models/budget");
const BudgetStatus = require("../models/budgetStatus");
const BudgetProduct = require("../models/budgetProduct");
const Product = require("../models/product");
const User = require("../models/user");

const controllers = {};

controllers.budget_list = async (req, res) => {
  try {
    const data = await Budget.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.budget_create = async (req, res) => {
  const { idUser } = req.params; // Get idUser from the request parameters

  if (!idUser) {
      return res.status(400).json({
          success: false,
          message: "Missing required field: idUser."
      });
  }

  try {
      const newBudget = await Budget.create({
          budgetDescription: '', // Default empty description
          budgetDate: new Date(), // Default to current date
          idBudgetStatus: 1, // Default status id, adjust as needed
          idUser: idUser
      });

      res.status(201).json({
          success: true,
          message: "Budget created successfully!",
          budget: newBudget
      });
  } catch (error) {
      console.error("Error creating budget:", error);
      res.status(500).json({
          success: false,
          message: "An error occurred while creating the budget."
      });
  }
};

controllers.budget_update = async (req, res) => {
  const idReceived = req.params.id;
  const { budgetDescription, budgetDate, idBudgetStatus, idUser } = req.body;
  try {
    const updatedBudget = await Budget.update(
      { budgetDescription, budgetDate, idBudgetStatus, idUser },
      { where: { idBudget: idReceived } }
    );
    res.json({ updatedBudget });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.budget_detail = async (req, res) => {
  const idReceived = req.params.id;
  try {
    const budget = await Budget.findByPk(idReceived);
    if (!budget) {
      res.status(404).json({ message: "Budget not found" });
      return;
    }
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.budget_delete = async (req, res) => {
  const idReceived = req.params.id;
  try {
    await Budget.destroy({ where: { idBudget: idReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.count_budgets_status2 = async (req, res) => {
  const idUser = req.params.idUser;
  try {
    const count = await Budget.count({
      where: {
        idBudgetStatus: 2,
        idUser: idUser,
      },
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.getNewBudgets = async (req, res) => {
  const { idUser } = req.params; // This is the user ID provided in the request
  try {
    const budgets = await Budget.findAll({
      where: {
        idUser: idUser,
        idBudgetStatus: 1,
      },
      include: [
        {
          model: BudgetStatus,
          attributes: ["budgetStatus"], // Specify the attributes you want to include from BudgetStatus
        },
      ],
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.getPendingBudgets = async (req, res) => {
  const { idUser } = req.params; // This is the user ID provided in the request
  try {
    const budgets = await Budget.findAll({
      where: {
        idUser: idUser,
        idBudgetStatus: 2,
      },
      include: [
        {
          model: BudgetStatus,
          attributes: ["budgetStatus"], // Specify the attributes you want to include from BudgetStatus
        },
      ],
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.getBudgetsByUser = async (req, res) => {
  const idUser = req.params.idUser; // Assuming you're passing idUser as a route parameter

  try {
    const budgets = await Budget.findAll({
      where: {
        idUser: idUser,
      },
      include: [
        {
          model: BudgetStatus,
          required: true,
          attributes: ["budgetStatus"], // Only include the budgetStatus field from BudgetStatus
        },
      ],
    });

    res.json(budgets); // Send the budgets as JSON response
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
};

controllers.getBudgetProducts = async (req, res) => {
  const { idBudget } = req.params;

  try {
    const budget = await Budget.findOne({
      where: { idBudget },
      include: [
        {
          model: BudgetProduct,
          include: [
            {
              model: Product,
              attributes: [
                "idProduct",
                "productName",
                "productPrice",
                "productImage",
                "productDescription",
              ],
            },
          ],
        },
        {
          model: User,
          attributes: ["idUser", "userName", "userEmail"],
        },
        {
          model: BudgetStatus,
          attributes: ["idBudgetStatus", "budgetStatus"],
        },
      ],
    });

    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res.json(budget);
  } catch (error) {
    console.error("Error fetching budget details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching budget details" });
  }
};

controllers.countBudgetsWithStatus1 = async (req, res) => {
  try {
      const count = await Budget.count({
          where: {
              idBudgetStatus: 1
          }
      });
      res.json({ count });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

controllers.countBudgetsWithStatus2 = async (req, res) => {
  try {
      const count = await Budget.count({
          where: {
              idBudgetStatus: 2
          }
      });
      res.json({ count });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

controllers.countBudgetsWithStatus3 = async (req, res) => {
  try {
      const count = await Budget.count({
          where: {
              idBudgetStatus: 3
          }
      });
      res.json({ count });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


controllers.countBudgetsWithStatus4 = async (req, res) => {
  try {
      const count = await Budget.count({
          where: {
              idBudgetStatus: 4
          }
      });
      res.json({ count });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = controllers;
