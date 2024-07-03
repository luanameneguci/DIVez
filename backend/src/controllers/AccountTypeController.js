const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const AccountType = require("../models/accountType");

const controllers = {};

controllers.accountType_list = async (req, res) => {
  try {
    const data = await AccountType.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.accountType_create = async (req, res) => {
  const { accountType } = req.body;
  try {
    const newAccountType = await AccountType.create({ accountType });
    res.json(newAccountType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.accountType_update = async (req, res) => {
  const idReceived = req.params.id;
  const { accountType } = req.body;
  try {
    const updatedAccountType = await AccountType.update(
      { accountType },
      { where: { idAccountType: idReceived } }
    );
    res.json({ updatedAccountType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.accountType_detail = async (req, res) => {
  const idReceived = req.params.id;
  try {
    const accountType = await AccountType.findByPk(idReceived);
    if (!accountType) {
      res.status(404).json({ message: "Account type not found" });
      return;
    }
    res.json(accountType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.accountType_delete = async (req, res) => {
  const idReceived = req.params.id;
  try {
    await AccountType.destroy({ where: { idAccountType: idReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
