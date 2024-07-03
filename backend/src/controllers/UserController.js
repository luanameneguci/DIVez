const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const User = require("../models/user");

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
  const { IDACCOUNTTYPE, IDDEPARTMENT, IDCART, USERNAME, USERPASSWORD, USEREMAIL, USERNIF, IDBUYER } = req.body;
  try {
    const newUser = await User.create({ IDACCOUNTTYPE, IDDEPARTMENT, IDCART, USERNAME, USERPASSWORD, USEREMAIL, USERNIF, IDBUYER });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.user_update = async (req, res) => {
  const userId = req.params.id;
  const { IDACCOUNTTYPE, IDDEPARTMENT, IDCART, USERNAME, USERPASSWORD, USEREMAIL, USERNIF, IDBUYER } = req.body;
  try {
    const updatedUser = await User.update(
      { IDACCOUNTTYPE, IDDEPARTMENT, IDCART, USERNAME, USERPASSWORD, USEREMAIL, USERNIF, IDBUYER },
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
      where: { IDUSER: userId }
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
    await User.destroy({ where: { IDUSER: userId } });
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
