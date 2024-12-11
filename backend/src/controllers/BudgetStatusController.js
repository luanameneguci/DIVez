const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const BudgetStatus = require("../models/budgetStatus");

const controllers = {};

controllers.budgetStatus_list = async (req, res) => {
  try {
    const data = await BudgetStatus.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.budgetStatus_create = async (req, res) => {
  const { budgetStatus } = req.body;
  try {
    const newBudgetStatus = await BudgetStatus.create({ budgetStatus });
    res.json(newBudgetStatus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.budgetStatus_update = async (req, res) => {
  const idReceived = req.params.id;
  const { budgetStatus } = req.body;
  try {
    const updatedBudgetStatus = await BudgetStatus.update(
      { budgetStatus },
      { where: { idBudgetStatus: idReceived } }
    );
    res.json({ updatedBudgetStatus });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.budgetStatus_detail = async (req, res) => {
  const idReceived = req.params.id;
  try {
    const budgetStatus = await BudgetStatus.findByPk(idReceived);
    if (!budgetStatus) {
      res.status(404).json({ message: "Budget status not found" });
      return;
    }
    res.json(budgetStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.budgetStatus_delete = async (req, res) => {
  const idReceived = req.params.id;
  try {
    await BudgetStatus.destroy({ where: { idBudgetStatus: idReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
