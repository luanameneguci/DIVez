const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const Budget = require("../models/budget");

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
  const { budgetDescription, budgetDate, idBudgetStatus, idUser } = req.body;
  try {
    const newBudget = await Budget.create({ budgetDescription, budgetDate, idBudgetStatus, idUser });
    res.json(newBudget);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

module.exports = controllers;
