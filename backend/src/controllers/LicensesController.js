const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const Licenses = require("../models/licenses");

const controllers = {};

controllers.licenses_list = async (req, res) => {
  try {
    const data = await Licenses.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.licenses_create = async (req, res) => {
  const { licenseKey, idLicenseStatus, idLicenseUser, idBill } = req.body;
  try {
    const newLicense = await Licenses.create({ licenseKey, idLicenseStatus, idLicenseUser, idBill });
    res.json(newLicense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.licenses_update = async (req, res) => {
  const licenseKeyReceived = req.params.licenseKey;
  const { idLicenseStatus, idLicenseUser, idBill } = req.body;
  try {
    const updatedLicense = await Licenses.update(
      { idLicenseStatus, idLicenseUser, idBill },
      { where: { licenseKey: licenseKeyReceived } }
    );
    res.json({ updatedLicense });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.licenses_detail = async (req, res) => {
  const licenseKeyReceived = req.params.licenseKey;
  try {
    const license = await Licenses.findByPk(licenseKeyReceived);
    if (!license) {
      res.status(404).json({ message: "License not found" });
      return;
    }
    res.json(license);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.licenses_delete = async (req, res) => {
  const licenseKeyReceived = req.params.licenseKey;
  try {
    await Licenses.destroy({ where: { licenseKey: licenseKeyReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.getActiveLicenses = async (req, res) => {
  const { idUser } = req.params; // This is the user ID provided in the request
    try {
        const count = await Licenses.count({
            where: {
                idLicenseStatus: 1,
                idUser: idUser // Ensure this matches the field representing the owner in your licenses table
            }
        });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

controllers.countLikedUsers = async (req, res) => {
  const { idUser } = req.params; // This is the user ID provided in the request
  try {
      const count = await Licenses.count({
          where: {
              idLicenseStatus: {
                  [Sequelize.Op.in]: [1, 2]
              },
              idUser: idUser // Ensure this matches the field representing the owner in your licenses table
          }
      });
      res.json({ count });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
