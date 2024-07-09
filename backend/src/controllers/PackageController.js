const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const Package = require("../models/package");
const PackageProduct = require("../models/packageProduct");


const controllers = {};

controllers.package_list = async (req, res) => {
  try {
    const data = await Package.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.package_create = async (req, res) => {
  const { packageName, packagePrice, products } = req.body;

  try {
    // Create the package
    const newPackage = await Package.create({ packageName, packagePrice });

    // Associate products with the package
    if (products && products.length > 0) {
      await Promise.all(products.map(productId =>
        PackageProduct.create({ idPackage: newPackage.idPackage, idProduct: productId })
      ));
    }

    res.json(newPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


controllers.package_update = async (req, res) => {
  const idReceived = req.params.id;
  const { packageName, packagePrice } = req.body;
  try {
    const updatedPackage = await Package.update(
      { packageName, packagePrice },
      { where: { idPackage: idReceived } }
    );
    res.json({ updatedPackage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.package_detail = async (req, res) => {
  const idReceived = req.params.id;
  try {
    const package = await Package.findByPk(idReceived);
    if (!package) {
      res.status(404).json({ message: "Package not found" });
      return;
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.package_delete = async (req, res) => {
  const idReceived = req.params.id;
  try {
    await Package.destroy({ where: { idPackage: idReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
