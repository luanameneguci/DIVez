const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const AdminDepartment = require("../models/adminDepartment");

const controllers = {};

controllers.adminDepartment_list = async (req, res) => {
  try {
    const data = await AdminDepartment.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.adminDepartment_create = async (req, res) => {
  const { department } = req.body;
  try {
    const newAdminDepartment = await AdminDepartment.create({ department });
    res.json(newAdminDepartment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.adminDepartment_update = async (req, res) => {
  const idReceived = req.params.id;
  const { department } = req.body;
  try {
    const updatedAdminDepartment = await AdminDepartment.update(
      { department },
      { where: { idDepartment: idReceived } }
    );
    res.json({ updatedAdminDepartment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.adminDepartment_detail = async (req, res) => {
  const idReceived = req.params.id;
  try {
    const adminDepartment = await AdminDepartment.findByPk(idReceived);
    if (!adminDepartment) {
      res.status(404).json({ message: "Admin department not found" });
      return;
    }
    res.json(adminDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.adminDepartment_delete = async (req, res) => {
  const idReceived = req.params.id;
  try {
    await AdminDepartment.destroy({ where: { idDepartment: idReceived } });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
