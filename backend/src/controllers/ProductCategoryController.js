const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const ProductCategory = require("../models/productCategory");

const controllers = {};

controllers.productCategory_list = async (req, res) => {
  try {
    const categories = await ProductCategory.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.productCategory_create = async (req, res) => {
  const { category } = req.body;
  try {
    const newCategory = await ProductCategory.create({ category });
    res.json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.productCategory_update = async (req, res) => {
  const categoryId = req.params.id;
  const { category } = req.body;
  try {
    const updatedCategory = await ProductCategory.update(
      { category },
      { where: { idCategory: categoryId } }
    );
    res.json({ updatedCategory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.productCategory_detail = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await ProductCategory.findByPk(categoryId);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.productCategory_delete = async (req, res) => {
  const categoryId = req.params.id;
  try {
    await ProductCategory.destroy({ where: { idCategory: categoryId } });
    res.json({ message: "Category deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
