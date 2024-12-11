const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const LicenseUser = require("../models/licenseUser");

const controllers = {};

controllers.licenseUser_list = async (req, res) => {
  try {
    const data = await LicenseUser.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.licenseUser_create = async (req, res) => {
  const { licenseUser } = req.body;
  try {
    const newLicenseUser = await LicenseUser.create({ licenseUser });
    res.json(newLicenseUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.licenseUser_update = async (req, res) => {
  const idReceived = req.params.id;
  const { licenseUser } = req.body;
  try {
    const updatedLicenseUser = await LicenseUser.update(
      { licenseUser },
      { where: { idLicenseUser: idReceived } }
    );
    res.json({ updatedLicenseUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.licenseUser_detail = async (req, res) => {
  const idReceived = req.params.id;
  try {
    const licenseUser = await LicenseUser.findByPk(idReceived);
    if (!licenseUser) {
      res.status(404).json({ message: "License user not found" });
      return;
    }
    res.json(licenseUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.licenseUser_delete = async (req, res) => {
  const idReceived = req.params.id;
  try {
    await LicenseUser.destroy({ where: { idLicenseUser: idReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
