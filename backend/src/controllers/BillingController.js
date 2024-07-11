const sequelize = require("../models/database");
const Billing = require("../models/billing");
const Cart = require("../models/cart");
const ProductCart = require("../models/productCart");
const Product = require("../models/product");
const Licenses = require("../models/licenses");



const { Op } = require('sequelize');

const controllers = {};

controllers.billing_list = async (req, res) => {
  try {
    const data = await Billing.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.billing_create = async (req, res) => {
  const { idCart } = req.body;

  try {
    // Create a new bill using Sequelize model
    const newBill = await Billing.create({
      idCart: idCart
      // billDate will automatically default to the current date
    });

    // Respond with the created bill object
    res.status(201).json(newBill);
  } catch (err) {
    console.error("Error creating bill:", err);
    res.status(400).json({ error: "Failed to create bill" });
  }
};

controllers.billing_update = async (req, res) => {
  const idReceived = req.params.id;
  const { IDCART, BILLDATE } = req.body;
  try {
    const updatedBilling = await Billing.update(
      { IDCART, BILLDATE },
      { where: { IDBILL: idReceived } }
    );
    res.json({ updatedBilling });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.billing_detail = async (req, res) => {
  const idReceived = req.params.id;
  try {
    const billing = await Billing.findByPk(idReceived);
    if (!billing) {
      res.status(404).json({ message: "Billing record not found" });
      return;
    }
    res.json(billing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.billing_delete = async (req, res) => {
  const idReceived = req.params.id;
  try {
    await Billing.destroy({ where: { IDBILL: idReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/*
controllers.sales_data = async (req, res) => {
  try {
      // Calculate date 7 days ago from today
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Fetch sales data and calculate products sold and total profit
      const data = await Billing.findAll({
          attributes: [
              [sequelize.fn('date_trunc', 'day', sequelize.col('billDate')), 'day'],
              [sequelize.fn('count', sequelize.col('productCart.idProductCart')), 'productsSold'],
              [sequelize.literal('SUM("cart.cartPrice")'), 'totalProfit']
          ],
          include: [
              {
                  model: ProductCart,
                  attributes: [],
                  required: true,
                  include: [
                      { model: Cart, attributes: [], required: true }
                  ]
              }
          ],
          where: {
              billDate: { [Op.gte]: sevenDaysAgo }
          },
          group: [sequelize.fn('date_trunc', 'day', sequelize.col('billDate'))],
          order: [[sequelize.fn('date_trunc', 'day', sequelize.col('billDate')), 'ASC']],
      });

      // Map the data to match frontend expectations
      const mappedData = data.map(item => ({
          day: item.dataValues.day,
          productsSold: item.dataValues.productsSold,
          totalProfit: item.dataValues.totalProfit || 0, // Handle cases where totalProfit is null
      }));

      res.json(mappedData);
  } catch (error) {
      console.error('Error fetching sales data:', error);
      res.status(500).json({ error: error.message });
  }
};*/

module.exports = controllers;
