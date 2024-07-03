const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const Product = require("../models/product");

const controllers = {};

controllers.product_list = async (req, res) => {
  try {
    const data = await Product.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.product_create = async (req, res) => {
  const {
    idCategory,
    productName,
    productPrice,
    productVersion,
    productImage,
    productDescription,
    productInstalls,
    productRating
  } = req.body;
  try {
    const newProduct = await Product.create({
      idCategory,
      productName,
      productPrice,
      productVersion,
      productImage,
      productDescription,
      productInstalls,
      productRating
    });
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.product_update = async (req, res) => {
  const idReceived = req.params.idProduct;
  const {
    idCategory,
    productName,
    productPrice,
    productVersion,
    productImage,
    productDescription,
    productInstalls,
    productRating
  } = req.body;
  try {
    const updatedProduct = await Product.update(
      {
        idCategory,
        productName,
        productPrice,
        productVersion,
        productImage,
        productDescription,
        productInstalls,
        productRating
      },
      { where: { idProduct: idReceived } }
    );
    res.json({ updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.product_detail = async (req, res) => {
  const idReceived = req.params.idProduct;
  try {
    const product = await Product.findByPk(idReceived);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.product_delete = async (req, res) => {
  const idReceived = req.params.idProduct;
  try {
    await Product.destroy({ where: { idProduct: idReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
