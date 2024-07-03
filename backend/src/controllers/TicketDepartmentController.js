const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const TicketDepartment = require("../models/ticketDepartment");

const controllers = {};

controllers.ticketDepartment_list = async (req, res) => {
  try {
    const departments = await TicketDepartment.findAll();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.ticketDepartment_create = async (req, res) => {
  const { TICKETDEPARTMENT } = req.body;
  try {
    const newDepartment = await TicketDepartment.create({ TICKETDEPARTMENT });
    res.json(newDepartment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.ticketDepartment_update = async (req, res) => {
  const departmentId = req.params.id;
  const { TICKETDEPARTMENT } = req.body;
  try {
    const updatedDepartment = await TicketDepartment.update(
      { TICKETDEPARTMENT },
      { where: { IDTICKETDEPARTMENT: departmentId } }
    );
    res.json({ updatedDepartment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.ticketDepartment_detail = async (req, res) => {
  const departmentId = req.params.id;
  try {
    const department = await TicketDepartment.findOne({
      where: { IDTICKETDEPARTMENT: departmentId }
    });
    if (!department) {
      res.status(404).json({ message: "Ticket Department not found" });
      return;
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.ticketDepartment_delete = async (req, res) => {
  const departmentId = req.params.id;
  try {
    await TicketDepartment.destroy({ where: { IDTICKETDEPARTMENT: departmentId } });
    res.json({ message: "Ticket Department deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
