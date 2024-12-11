const Sequelize = require('sequelize');
const sequelize = require('../models/database');
const Product = require('../models/product');

const controllers = {};

controllers.product_list = async (req, res) => {
    try {
        const data = await Product.findAll();
        res.json(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: error.message });
    }
};

controllers.product_create = async (req, res) => {
    const {
        idCategory,
        productName,
        productPrice,
        productVersion,
        productImage,
        productDescription,
        productInstalls,
        productRating
    } = req.body;
    try {
        const newProduct = await Product.create({
            idCategory,
            productName,
            productPrice,
            productVersion,
            productImage,
            productDescription,
            productInstalls,
            productRating
        });
        res.json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ error: error.message });
    }
};

controllers.product_update = async (req, res) => {
    const idReceived = req.params.id;
    try {
        const [updatedRowsCount, updatedProduct] = await Product.update(req.body, {
            where: { idProduct: idReceived },
            returning: true,
        });

        if (updatedRowsCount > 0) {
            res.json({ product: updatedProduct[0] });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(400).json({ error: error.message });
    }
};
controllers.product_detail = async (req, res) => {
    const idReceived = req.params.idProduct;
    
    try {
      const product = await Product.findOne({ where: { idProduct: idReceived } });
      
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

controllers.product_delete = async (req, res) => {
    const productId = req.params.id;
    try {
        const rowsDeleted = await Product.destroy({ where: { idProduct: productId } });
        if (rowsDeleted > 0) {
            res.json({ message: "Product deleted successfully!" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = controllers;
