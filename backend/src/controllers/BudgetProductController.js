const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("./database");
const BudgetProduct = require("../models/budgetProduct");

const controllers = {};

controllers.budgetProduct_list = async (req, res) => {
  try {
    const data = await BudgetProduct.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.budgetProduct_create = async (req, res) => {
  const { idProduct, idBudget } = req.body;
  try {
    const newBudgetProduct = await BudgetProduct.create({ idProduct, idBudget });
    res.json(newBudgetProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.budgetProduct_update = async (req, res) => {
  const { idProduct, idBudget } = req.body;
  try {
    const updatedBudgetProduct = await BudgetProduct.update(
      { idProduct, idBudget },
      { where: { idProduct, idBudget } }
    );
    res.json({ updatedBudgetProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.budgetProduct_detail = async (req, res) => {
  const { idProduct, idBudget } = req.params;
  try {
    const budgetProduct = await BudgetProduct.findOne({
      where: { idProduct, idBudget }
    });
    if (!budgetProduct) {
      res.status(404).json({ message: "Budget product association not found" });
      return;
    }
    res.json(budgetProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.budgetProduct_delete = async (req, res) => {
  const { idProduct, idBudget } = req.params;
  try {
    await BudgetProduct.destroy({ where: { idProduct, idBudget } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
