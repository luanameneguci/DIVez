const User = require('../models/user');
const Product = require('../models/product');
const Licenses = require('../models/licenses');
const UserLicense = require('../models/userLicenses');
const sequelize = require('../models/database');
const { Op } = require('sequelize');

const controllers = {};

// Define the getManagers function
controllers.getManagers = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user to ensure it exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find all managers for the given user
        const managers = await User.findAll({
            where: {
                idBuyer: userId
            },
            include: [
                {
                    model: Product,
                    through: { attributes: [] },
                    attributes: ['idProduct', 'productName']
                }
            ],
            attributes: ['idUser', 'userName', 'userNif', 'userEmail'] // Add desired manager attributes here
        });

        // Structure the response
        const response = managers.map(manager => ({
            managerId: manager.idUser,
            managerName: manager.userName,
            managerNif: manager.userNif,
            managerEmail: manager.userEmail,
            managedProducts: manager.products.map(product => ({
                productId: product.idProduct,
                productName: product.productName
            }))
        }));

        return res.json(response);
    } catch (error) {
        console.error('Error fetching managers:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = controllers;
