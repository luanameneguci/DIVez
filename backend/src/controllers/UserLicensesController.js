const User = require("../models/user");
const Product = require("../models/product");
const Licenses = require("../models/licenses");
const UserLicense = require("../models/userLicenses");
const sequelize = require("../models/database");
const { Op } = require("sequelize");

const controllers = {};

// Define the getManagers function
controllers.getManagers = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user to ensure it exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find all managers for the given user
    const managers = await User.findAll({
      where: {
        idBuyer: userId,
      },
      include: [
        {
          model: Product,
          through: { attributes: [] },
          attributes: ["idProduct", "productName"],
        },
      ],
      attributes: ["idUser", "userName", "userNif", "userEmail"], // Add desired manager attributes here
    });

    // Structure the response
    const response = managers.map((manager) => ({
      managerId: manager.idUser,
      managerName: manager.userName,
      managerNif: manager.userNif,
      managerEmail: manager.userEmail,
      managedProducts: manager.products.map((product) => ({
        productId: product.idProduct,
        productName: product.productName,
      })),
    }));

    return res.json(response);
  } catch (error) {
    console.error("Error fetching managers:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

controllers.createUserLicense = async (req, res) => {
    const { email, productId } = req.body;
  
    console.log("Creating UserLicense for email:", email, "and productId:", productId);
  
    try {
      // Find user by email
      const user = await User.findOne({ where: { userEmail: email } });
  
      // Check if user and product exist
      const product = await Product.findByPk(productId);
  
      if (!user || !product) {
        return res.status(404).json({ message: "User or Product not found" });
      }
  
      // Create the userLicense
      const newUserLicense = await UserLicense.create({
        idUser: user.idUser,
        idProduct: productId,
      });
  
      console.log("UserLicense created:", newUserLicense);
  
      res.status(201).json(newUserLicense);
    } catch (error) {
      console.error("Error creating UserLicense:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

controllers.deleteUserLicenses = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { userEmail: email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await UserLicense.destroy({ where: { idUser: user.idUser } });

    res.status(200).json({ message: "User licenses deleted successfully" });
  } catch (error) {
    console.error("Error deleting user licenses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = controllers;
