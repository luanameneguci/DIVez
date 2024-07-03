const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const BudgetPackage = require("../models/budgetPackage");

const controllers = {};

controllers.budgetPackage_list = async (req, res) => {
  try {
    const data = await BudgetPackage.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.budgetPackage_create = async (req, res) => {
  const { idPackage, idBudget } = req.body;
  try {
    const newBudgetPackage = await BudgetPackage.create({ idPackage, idBudget });
    res.json(newBudgetPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.budgetPackage_update = async (req, res) => {
  const { idPackage, idBudget } = req.body;
  try {
    const updatedBudgetPackage = await BudgetPackage.update(
      { idPackage, idBudget },
      { where: { idPackage, idBudget } }
    );
    res.json({ updatedBudgetPackage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.budgetPackage_detail = async (req, res) => {
  const { idPackage, idBudget } = req.params;
  try {
    const budgetPackage = await BudgetPackage.findOne({
      where: { idPackage, idBudget }
    });
    if (!budgetPackage) {
      res.status(404).json({ message: "Budget package association not found" });
      return;
    }
    res.json(budgetPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.budgetPackage_delete = async (req, res) => {
  const { idPackage, idBudget } = req.params;
  try {
    await BudgetPackage.destroy({ where: { idPackage, idBudget } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
