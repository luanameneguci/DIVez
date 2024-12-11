const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const Licenses = require("../models/licenses");
const Product = require("../models/product");

const controllers = {};

controllers.licenses_list = async (req, res) => {
  try {
    const data = await Licenses.findAll({
      include: Product // Include the Product model to fetch associated product data
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.licenses_create = async (req, res) => {
  const { licenseKey, idLicenseStatus, idLicenseUser, idBill } = req.body;
  try {
    const newLicense = await Licenses.create({ licenseKey, idLicenseStatus, idLicenseUser, idBill });
    res.json(newLicense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.licenses_update = async (req, res) => {
  const licenseKeyReceived = req.params.licenseKey;
  const { idLicenseStatus, idLicenseUser, idBill } = req.body;
  try {
    const updatedLicense = await Licenses.update(
      { idLicenseStatus, idLicenseUser, idBill },
      { where: { licenseKey: licenseKeyReceived } }
    );
    res.json({ updatedLicense });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.licenses_detail = async (req, res) => {
  const licenseKeyReceived = req.params.licenseKey;
  try {
    const license = await Licenses.findByPk(licenseKeyReceived);
    if (!license) {
      res.status(404).json({ message: "License not found" });
      return;
    }
    res.json(license);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.licenses_delete = async (req, res) => {
  const { idUser, idProduct } = req.body;

  try {
    // Delete licenses with matching idUser and idProduct
    const deletedCount = await Licenses.destroy({
      where: {
        idUser,
        idProduct
      }
    });

    res.status(200).json({ deletedCount });
  } catch (error) {
    console.error('Error deleting licenses:', error);
    res.status(500).json({ error: 'Failed to delete licenses' });
  }
};

controllers.getActiveLicenses = async (req, res) => {
  const { idUser } = req.params; // This is the user ID provided in the request
    try {
        const count = await Licenses.count({
            where: {
                idLicenseStatus: 1,
                idUser: idUser // Ensure this matches the field representing the owner in your licenses table
            }
        });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

controllers.countLikedUsers = async (req, res) => {
  const { idUser } = req.params; // This is the user ID provided in the request
  try {
      const count = await Licenses.count({
          where: {
              idLicenseStatus: {
                  [Sequelize.Op.in]: [1, 2]
              },
              idUser: idUser // Ensure this matches the field representing the owner in your licenses table
          }
      });
      res.json({ count });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

controllers.licensesByUser = async (req, res) => {
  const { idUser } = req.params; // Extracting idUser from request parameters

  try {
    const licenses = await Licenses.findAll({
      where: {
        idUser: idUser // Filtering licenses by idUser
      },
      include: {
        model: Product, // Include the Product model
        as: 'product', // Alias for the included model
        attributes: [
          'idProduct',
          'productName',
          'productPrice',
          'productVersion',
          'productImage',
          'productDescription',
          'productInstalls',
          'productRating'
        ]
      }
    });
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.countLicensesWithStatus1 = async (req, res) => {
  try {
      const count = await Licenses.count({
          where: {
              idLicenseStatus: 1
          }
      });
      res.json({ count });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

controllers.countLicensesWithStatus2 = async (req, res) => {
  try {
      const count = await Licenses.count({
          where: {
              idLicenseStatus: 2
          }
      });
      res.json({ count });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


function generateRandomLicenseKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Available characters
  let licenseKey = '';

  for (let i = 0; i < 23; i++) {
    if (i > 0 && i % 5 === 0) {
      licenseKey += ' '; // Insert space every 5 characters
    } else {
      const randomIndex = Math.floor(Math.random() * characters.length);
      licenseKey += characters.charAt(randomIndex);
    }
  }

  return licenseKey;
}

controllers.createLicenses = async (req, res) => {
  const licensesData = req.body;

  try {
    const createdLicenses = await Promise.all(licensesData.map(async (license) => {
      const { numberOfLicenses, idLicenseStatus, idUser, idBill, idProduct, licenseVersion } = license;

      if (!numberOfLicenses || numberOfLicenses <= 0) {
        return res.status(400).json({ error: 'Number of licenses must be greater than zero.' });
      }

      const licenses = [];

      for (let i = 0; i < numberOfLicenses; i++) {
        const licenseKey = generateRandomLicenseKey(); // Assuming this function generates a unique key

        // Create license object
        const newLicense = {
          licenseKey: licenseKey,
          idLicenseStatus: idLicenseStatus,
          idLicenseUser: idUser, // Or whatever logic you use to assign the user ID
          licenseVersion: licenseVersion, // Assuming this is how you get the version from the license
          idBill: idBill, // Assign the bill ID received from the client
          idUser: idUser, // Assign the user ID received from the client
          idProduct: idProduct // Assign the product ID received from the client
        };

        licenses.push(newLicense);
      }

      // Bulk create licenses in the database
      const created = await Licenses.bulkCreate(licenses);
      return created;
    }));

    res.status(200).json(createdLicenses);
  } catch (error) {
    console.error('Error creating licenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = controllers;
