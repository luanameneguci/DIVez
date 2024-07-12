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

controllers.list = async (req, res) => {
  const data = await User.findAll()
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

controllers.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({
      success: false,
      message: "Campos em Branco",
    });
  }

  try {
    const user = await User.findOne({ where: { userEmail: email } });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Dados de autenticação inválidos.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.userPassword);

    if (isMatch) {
      const token = jwt.sign({ userEmail: email }, config.secret, {
        expiresIn: "1h", // Expires in 1 hour
      });

      return res.json({
        success: true,
        message: "Autenticação realizada com sucesso!",
        token: token,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Dados de autenticação inválidos.",
      });
    }
  } catch (error) {
    console.error("Erro: ", error);
    return res.status(500).json({
      success: false,
      message: "Erro no processo de autenticação. Tente de novo mais tarde.",
    });
  }
};

controllers.user_create = async (req, res) => {
  console.log(req.body); // Log the request body to inspect incoming data
  const {
    idAccountType,
    idDepartment,
    idCart,
    userName,
    userPassword,
    userEmail,
    userNif,
    idBuyer,
  } = req.body;

  try {
    const newUser = await User.create({
      idAccountType,
      idDepartment,
      idCart,
      userName,
      userPassword,
      userEmail,
      userNif,
      idBuyer,
    });

    res.status(201).json(newUser); // Return 201 for successful creation
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


controllers.user_update = async (req, res) => {
  const userId = req.params.id;
  const {
    idAccountType,
    idDepartment,
    idCart,
    userName,
    userPassword,
    userEmail,
    userNif,
    idBuyer,
  } = req.body;
  try {
    const updatedUser = await User.update(
      {
        idAccountType,
        idDepartment,
        idCart,
        userName,
        userPassword,
        userEmail,
        userNif,
        idBuyer,
      },
      { where: { idUser: userId } }
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
                        "licenseVersion"
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

controllers.updateBuyerId = async (req, res) => {
  const { email, buyerId } = req.body;

  console.log('Received update request:', { email, buyerId });

  try {
    // Find the user by email
    const user = await User.findOne({ where: { userEmail: email } });

    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: "User not found" });
    }

    // Update the idBuyer
    if (buyerId === null) {
      user.idBuyer = null;
    } else {
      user.idBuyer = buyerId;
    }

    await user.save();

    console.log('Updated user:', user);

    res.status(200).json({ message: "idBuyer updated successfully", user });
  } catch (error) {
    console.error("Error updating idBuyer:", error);
    res.status(500).json({ message: "Failed to update idBuyer" });
  }
};

controllers.getIdBuyerId = async (req, res) =>{
  const { idUser } = req.params; // Extract idUser from request parameters

  try {
    // Find the user by idUser
    const user = await User.findOne({
      where: { idUser },
      attributes: ['idBuyer'] // Select only the idBuyer field
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' }); // Handle case where idUser doesn't exist
    }

    return res.json({ idBuyer: user.idBuyer }); // Return idBuyer associated with the found user
  } catch (error) {
    console.error('Error retrieving idBuyer:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' }); // Return server error
  }
}



module.exports = controllers;
