const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const Cart = require("../models/cart");

const controllers = {};

controllers.cart_list = async (req, res) => {
  try {
    const data = await Cart.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.cart_create = async (req, res) => {
  const { IDUSER, CARTPRICE } = req.body;
  try {
    const newCart = await Cart.create({ IDUSER, CARTPRICE });
    res.json(newCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.cart_update = async (req, res) => {
  const idReceived = req.params.id;
  const { IDUSER, CARTPRICE } = req.body;
  try {
    const updatedCart = await Cart.update(
      { IDUSER, CARTPRICE },
      { where: { IDCART: idReceived } }
    );
    res.json({ updatedCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.cart_detail = async (req, res) => {
  const idReceived = req.params.id;
  try {
    const cart = await Cart.findByPk(idReceived);
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.cart_delete = async (req, res) => {
  const idReceived = req.params.id;
  try {
    await Cart.destroy({ where: { IDCART: idReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
