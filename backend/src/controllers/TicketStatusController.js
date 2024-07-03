const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("./database");
const TicketStatus = require("./models/TicketStatus");

const controllers = {};

controllers.ticketStatus_list = async (req, res) => {
  try {
    const statuses = await TicketStatus.findAll();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.ticketStatus_create = async (req, res) => {
  const { TICKETSTATUS } = req.body;
  try {
    const newStatus = await TicketStatus.create({ TICKETSTATUS });
    res.json(newStatus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.ticketStatus_update = async (req, res) => {
  const statusId = req.params.id;
  const { TICKETSTATUS } = req.body;
  try {
    const updatedStatus = await TicketStatus.update(
      { TICKETSTATUS },
      { where: { IDTICKETSTATUS: statusId } }
    );
    res.json({ updatedStatus });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.ticketStatus_detail = async (req, res) => {
  const statusId = req.params.id;
  try {
    const status = await TicketStatus.findOne({
      where: { IDTICKETSTATUS: statusId }
    });
    if (!status) {
      res.status(404).json({ message: "Ticket Status not found" });
      return;
    }
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.ticketStatus_delete = async (req, res) => {
  const statusId = req.params.id;
  try {
    await TicketStatus.destroy({ where: { IDTICKETSTATUS: statusId } });
    res.json({ message: "Ticket Status deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
