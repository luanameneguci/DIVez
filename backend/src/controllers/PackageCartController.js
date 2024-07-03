const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const PackageCart = require("../models/packageCart");

const controllers = {};

controllers.packageCart_list = async (req, res) => {
  try {
    const data = await PackageCart.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.packageCart_create = async (req, res) => {
  const { idCart, idPackage } = req.body;
  try {
    const newPackageCart = await PackageCart.create({ idCart, idPackage });
    res.json(newPackageCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.packageCart_update = async (req, res) => {
  const { idCart, idPackage } = req.body;
  try {
    const updatedPackageCart = await PackageCart.update(
      { idPackage },
      { where: { idCart } }
    );
    res.json({ updatedPackageCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.packageCart_detail = async (req, res) => {
  const idCartReceived = req.params.idCart;
  try {
    const packageCart = await PackageCart.findOne({ where: { idCart: idCartReceived } });
    if (!packageCart) {
      res.status(404).json({ message: "PackageCart not found" });
      return;
    }
    res.json(packageCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.packageCart_delete = async (req, res) => {
  const idCartReceived = req.params.idCart;
  try {
    await PackageCart.destroy({ where: { idCart: idCartReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
