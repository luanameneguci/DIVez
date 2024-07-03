const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const BudgetCart = require("../models/budgetCart");

const controllers = {};

controllers.budgetCart_list = async (req, res) => {
  try {
    const data = await BudgetCart.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.budgetCart_create = async (req, res) => {
  const { idCart, idBudget } = req.body;
  try {
    const newBudgetCart = await BudgetCart.create({ idCart, idBudget });
    res.json(newBudgetCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.budgetCart_update = async (req, res) => {
  const { idCart, idBudget } = req.body;
  try {
    const updatedBudgetCart = await BudgetCart.update(
      { idCart, idBudget },
      { where: { idCart, idBudget } }
    );
    res.json({ updatedBudgetCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.budgetCart_detail = async (req, res) => {
  const { idCart, idBudget } = req.params;
  try {
    const budgetCart = await BudgetCart.findOne({
      where: { idCart, idBudget }
    });
    if (!budgetCart) {
      res.status(404).json({ message: "Budget cart association not found" });
      return;
    }
    res.json(budgetCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.budgetCart_delete = async (req, res) => {
  const { idCart, idBudget } = req.params;
  try {
    await BudgetCart.destroy({ where: { idCart, idBudget } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
