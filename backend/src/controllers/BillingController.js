const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const Billing = require("../models/billing");

const controllers = {};

controllers.billing_list = async (req, res) => {
  try {
    const data = await Billing.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.billing_create = async (req, res) => {
  const { IDCART, BILLDATE } = req.body;
  try {
    const newBilling = await Billing.create({ IDCART, BILLDATE });
    res.json(newBilling);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.billing_update = async (req, res) => {
  const idReceived = req.params.id;
  const { IDCART, BILLDATE } = req.body;
  try {
    const updatedBilling = await Billing.update(
      { IDCART, BILLDATE },
      { where: { IDBILL: idReceived } }
    );
    res.json({ updatedBilling });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.billing_detail = async (req, res) => {
  const idReceived = req.params.id;
  try {
    const billing = await Billing.findByPk(idReceived);
    if (!billing) {
      res.status(404).json({ message: "Billing record not found" });
      return;
    }
    res.json(billing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.billing_delete = async (req, res) => {
  const idReceived = req.params.id;
  try {
    await Billing.destroy({ where: { IDBILL: idReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
