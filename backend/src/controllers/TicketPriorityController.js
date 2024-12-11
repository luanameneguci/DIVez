const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const TicketPriority = require("../models/ticketPriority");

const controllers = {};

controllers.ticketPriority_list = async (req, res) => {
  try {
    const priorities = await TicketPriority.findAll();
    res.json(priorities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.ticketPriority_create = async (req, res) => {
  const { TICKETPRIORITY } = req.body;
  try {
    const newPriority = await TicketPriority.create({ TICKETPRIORITY });
    res.json(newPriority);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.ticketPriority_update = async (req, res) => {
  const priorityId = req.params.id;
  const { TICKETPRIORITY } = req.body;
  try {
    const updatedPriority = await TicketPriority.update(
      { TICKETPRIORITY },
      { where: { IDTICKETPRIORITY: priorityId } }
    );
    res.json({ updatedPriority });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.ticketPriority_detail = async (req, res) => {
  const priorityId = req.params.id;
  try {
    const priority = await TicketPriority.findOne({
      where: { IDTICKETPRIORITY: priorityId }
    });
    if (!priority) {
      res.status(404).json({ message: "Ticket Priority not found" });
      return;
    }
    res.json(priority);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.ticketPriority_delete = async (req, res) => {
  const priorityId = req.params.id;
  try {
    await TicketPriority.destroy({ where: { IDTICKETPRIORITY: priorityId } });
    res.json({ message: "Ticket Priority deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
