const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const LicenseStatus = require("../models/licenseStatus");

const controllers = {};

controllers.licenseStatus_list = async (req, res) => {
  try {
    const data = await LicenseStatus.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.licenseStatus_create = async (req, res) => {
  const { licenseStatus } = req.body;
  try {
    const newLicenseStatus = await LicenseStatus.create({ licenseStatus });
    res.json(newLicenseStatus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.licenseStatus_update = async (req, res) => {
  const idReceived = req.params.id;
  const { licenseStatus } = req.body;
  try {
    const updatedLicenseStatus = await LicenseStatus.update(
      { licenseStatus },
      { where: { idLicenseStatus: idReceived } }
    );
    res.json({ updatedLicenseStatus });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.licenseStatus_detail = async (req, res) => {
  const idReceived = req.params.id;
  try {
    const licenseStatus = await LicenseStatus.findByPk(idReceived);
    if (!licenseStatus) {
      res.status(404).json({ message: "License status not found" });
      return;
    }
    res.json(licenseStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.licenseStatus_delete = async (req, res) => {
  const idReceived = req.params.id;
  try {
    await LicenseStatus.destroy({ where: { idLicenseStatus: idReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
