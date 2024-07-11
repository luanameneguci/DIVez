const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const Cart = require("../models/cart");
const Billing = require("../models/billing");
const Product = require("../models/product");
const ProductCart = require("../models/productCart");
const Licenses = require("../models/licenses");

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
  const { idUser, cartPrice } = req.body;
  try {
    const newCart = await Cart.create({ idUser, cartPrice });
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

controllers.getUserCartDetails = async (req, res) => {
  try {
    const { idUser } = req.params;

    // Fetch carts for the given user
    const carts = await Cart.findAll({
        where: { idUser },
        include: [
            {
                model: Billing,
                attributes: ['idBill', 'billDate'], 
                required: false   
            },
            {
                model: ProductCart,
                include: [
                    {
                        model: Product,
                        attributes: ['idProduct', 'productName']
                    }
                ]
            }
        ]
    });

    if (!carts || carts.length === 0) {
        return res.status(404).json({ message: 'No carts found for the user' });
    }

    // Fetch licenses count for the given user
    const licensesCount = await Licenses.count({
        where: { idUser }
    });

    // Construct response
    const response = carts.map(cart => {
        const cartDetails = {
            idCart: cart.idCart,
            cartPrice: cart.cartPrice,
            bills: cart.billing ? [{ // Check if billing exists
                idBill: cart.billing.idBill,
                billDate: cart.billing.billDate
            }] : [], // If not, return empty array
            products: cart.productCarts ? cart.productCarts.map(pc => ({
                idProduct: pc.product.idProduct,
                productName: pc.product.productName,
                numberOfLicenses: pc.numberOfLicenses // Assuming this field exists in the productCart model
            })) : [],
            licensesCount: licensesCount
        };

        return cartDetails;
    });

    res.status(200).json(response);
} catch (error) {
    console.error('Error fetching cart details:', error);
    res.status(500).json({ message: 'An error occurred while fetching cart details' });
}
};

controllers.getAllProductsInCart = async (req, res) => {
  const { idCart } = req.params;

  try {
      // Find the cart with given idCart
      const cart = await Cart.findOne({
          where: { idCart },
          include: [{
              model: ProductCart,
              attributes: ['numberOfLicenses', 'idProductCart'],
              include: [{
                  model: Product,
                  attributes: ['idProduct', 'productName', 'productPrice', 'productDescription', 'productImage', 'productVersion'] // Specify the attributes you want to fetch
              }]
          }]
      });

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      // Extract products from the cart
      const productsInCart = cart.productCarts.map(productCart => ({
          productImage: productCart.product.productImage,
          idProduct: productCart.product.idProduct,
          productName: productCart.product.productName,
          productPrice: productCart.product.productPrice,
          productDescription: productCart.product.productDescription,
          numberOfLicenses: productCart.numberOfLicenses,
          idProductCart: productCart.idProductCart,
          productVersion: productCart.product.productVersion
          // Add more fields as needed
      }));

      res.status(200).json(productsInCart);
  } catch (error) {
      console.error('Error fetching products in cart:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

controllers.CartsByUserId = async (req, res) => {
  const idUser = req.params.idUser;

    try {
        const carts = await Cart.findAll({
            where: { idUser: idUser }
        });

        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: 'Carts not found for the user' });
        }

        res.json(carts);
    } catch (error) {
        console.error('Error fetching carts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = controllers;
