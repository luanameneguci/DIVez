const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const PackageProduct = require("../models/packageProduct");

const controllers = {};

controllers.packageProduct_list = async (req, res) => {
  try {
    const data = await PackageProduct.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.packageProduct_create = async (req, res) => {
  const { idProduct, idPackage } = req.body;
  try {
    const newPackageProduct = await PackageProduct.create({ idProduct, idPackage });
    res.json(newPackageProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.packageProduct_update = async (req, res) => {
  const { idProduct, idPackage } = req.body;
  try {
    const updatedPackageProduct = await PackageProduct.update(
      { idPackage },
      { where: { idProduct } }
    );
    res.json({ updatedPackageProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.packageProduct_detail = async (req, res) => {
  const idProductReceived = req.params.idProduct;
  try {
    const packageProduct = await PackageProduct.findOne({ where: { idProduct: idProductReceived } });
    if (!packageProduct) {
      res.status(404).json({ message: "PackageProduct not found" });
      return;
    }
    res.json(packageProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.packageProduct_delete = async (req, res) => {
  const idProductReceived = req.params.idProduct;
  try {
    await PackageProduct.destroy({ where: { idProduct: idProductReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
