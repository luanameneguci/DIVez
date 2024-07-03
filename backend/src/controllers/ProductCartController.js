const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const ProductCart = require("../models/productCart");

const controllers = {};

controllers.productCart_list = async (req, res) => {
  try {
    const data = await ProductCart.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.productCart_create = async (req, res) => {
  const { idCart, idProduct } = req.body;
  try {
    const newProductCart = await ProductCart.create({ idCart, idProduct });
    res.json(newProductCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.productCart_update = async (req, res) => {
  const { idCart, idProduct } = req.body;
  try {
    const updatedProductCart = await ProductCart.update(
      { idProduct },
      { where: { idCart } }
    );
    res.json({ updatedProductCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.productCart_detail = async (req, res) => {
  const idCartReceived = req.params.idCart;
  try {
    const productCart = await ProductCart.findOne({ where: { idCart: idCartReceived } });
    if (!productCart) {
      res.status(404).json({ message: "ProductCart not found" });
      return;
    }
    res.json(productCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.productCart_delete = async (req, res) => {
  const idCartReceived = req.params.idCart;
  try {
    await ProductCart.destroy({ where: { idCart: idCartReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
