const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const ProductCart = require("../models/productCart");
const Cart = require("../models/cart");

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
  const { idProductCart } = req.params;

  try {
    // Check if the product cart entry exists
    const productCart = await ProductCart.findOne({
      where: {
        idProductCart: idProductCart
      }
    });

    if (!productCart) {
      return res.status(404).json({ message: 'ProductCart not found' });
    }

    // Delete the product cart entry
    await productCart.destroy();

    res.status(200).json({
      success: true,
      message: 'ProductCart deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product from cart:', error);
    res.status(500).json({ error: error.message });
  }
};

controllers.addProductToCart = async (req, res) => {
  const { idUser, idProduct, numberOfLicenses } = req.body;

  try {
    // Step 1: Find the user's cart
    const cart = await Cart.findOne({
      where: {
        idUser: idUser
      },
      order: [['idCart', 'DESC']] // Get the latest cart for the user
    });

    if (!cart) {
      return res.status(404).json({ message: 'No cart found for the user' });
    }

    // Step 2: Add the product to ProductCart
    const newProductCart = await ProductCart.create({
      idCart: cart.idCart,
      idProduct: idProduct,
      numberOfLicenses: numberOfLicenses,
    });

    res.status(201).json({
      success: true,
      message: 'Product added to cart successfully!',
      productCart: newProductCart,
    });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = controllers;
