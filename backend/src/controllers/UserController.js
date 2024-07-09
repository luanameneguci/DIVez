const express = require("express");
const Sequelize = require("sequelize");
const sequelize = require("../models/database");
const User = require("../models/user");
const Cart = require("../models/cart");
const Billing = require("../models/billing");
const Product = require("../models/product");
const ProductCart = require("../models/productCart");
const Licenses = require("../models/licenses");

const controllers = {};

controllers.user_list = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.user_create = async (req, res) => {
  const {
    IDACCOUNTTYPE,
    IDDEPARTMENT,
    IDCART,
    USERNAME,
    USERPASSWORD,
    USEREMAIL,
    USERNIF,
    IDBUYER,
  } = req.body;
  try {
    const newUser = await User.create({
      IDACCOUNTTYPE,
      IDDEPARTMENT,
      IDCART,
      USERNAME,
      USERPASSWORD,
      USEREMAIL,
      USERNIF,
      IDBUYER,
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.user_update = async (req, res) => {
  const userId = req.params.id;
  const {
    IDACCOUNTTYPE,
    IDDEPARTMENT,
    IDCART,
    USERNAME,
    USERPASSWORD,
    USEREMAIL,
    USERNIF,
    IDBUYER,
  } = req.body;
  try {
    const updatedUser = await User.update(
      {
        IDACCOUNTTYPE,
        IDDEPARTMENT,
        IDCART,
        USERNAME,
        USERPASSWORD,
        USEREMAIL,
        USERNIF,
        IDBUYER,
      },
      { where: { IDUSER: userId } }
    );
    res.json({ updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.user_detail = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({
      where: { idUser: userId },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.user_delete = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.destroy({ where: { idUser: userId } });
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.getManagers = async (req, res) => {
  const { idBuyer } = req.params; // Retrieve idBuyer from the request parameters

  try {
    const users = await User.findAll({
      where: {
        idAccountType: 3, // Fetch users with idAccountType 3
        idBuyer: idBuyer, // And the specific idBuyer
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.billingByUser = async (req, res) => {
  try {
    const idUser = parseInt(req.params.idUser, 10); // Ensure idUser is an integer
    if (isNaN(idUser)) {
      return res.status(400).send({ error: "Invalid user ID" });
    }

    const userWithBilling = await User.findOne({
      where: { idUser: idUser },
      include: [
        {
          model: Cart,
          include: [
            { model: Billing },
            {
              model: ProductCart,
              include: [
                {
                  model: Product,
                  attributes: [
                    "idProduct",
                    "idCategory",
                    "productName",
                    "productPrice",
                    "productVersion",
                    "productImage",
                    "productDescription",
                    "productInstalls",
                    "productRating",
                  ],
                  include: [
                    {
                      model: Licenses,
                      attributes: [
                        "licenseKey",
                        "idLicenseStatus",
                        "idLicenseUser",
                        "idBill",
                        "idUser",
                        "idProduct",
                      ],
                      where: { idUser: idUser }, // Filter licenses by idUser
                      required: false, // Allow products without licenses
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!userWithBilling) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(userWithBilling);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while fetching billings" });
  }
};


module.exports = controllers;
