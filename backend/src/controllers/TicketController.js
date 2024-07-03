const express = require("express");
const Sequelize = require('sequelize');
const sequelize = require("../models/database");
const Ticket = require("../models/ticket");
const TicketPriority = require("../models/ticketPriority");
const TicketDepartment = require("../models/ticketDepartment");
const TicketStatus = require("../models/ticketStatus");

const controllers = {};

controllers.ticket_list = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        { model: TicketPriority },
        { model: TicketDepartment },
        { model: TicketStatus }
      ]
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.ticket_create = async (req, res) => {
  const { IDTICKETPRIORITY, IDTICKETDEPARTMENT, IDTICKETSTATUS, TICKETNAME, TICKETDESCRIPTION, TICKETDATE } = req.body;
  try {
    const newTicket = await Ticket.create({
      IDTICKETPRIORITY,
      IDTICKETDEPARTMENT,
      IDTICKETSTATUS,
      TICKETNAME,
      TICKETDESCRIPTION,
      TICKETDATE
    });
    res.json(newTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.ticket_update = async (req, res) => {
  const ticketId = req.params.id;
  const { IDTICKETPRIORITY, IDTICKETDEPARTMENT, IDTICKETSTATUS, TICKETNAME, TICKETDESCRIPTION, TICKETDATE } = req.body;
  try {
    const updatedTicket = await Ticket.update(
      {
        IDTICKETPRIORITY,
        IDTICKETDEPARTMENT,
        IDTICKETSTATUS,
        TICKETNAME,
        TICKETDESCRIPTION,
        TICKETDATE
      },
      { where: { IDTICKET: ticketId } }
    );
    res.json({ updatedTicket });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.ticket_detail = async (req, res) => {
  const ticketId = req.params.id;
  try {
    const ticket = await Ticket.findOne({
      where: { IDTICKET: ticketId },
      include: [
        { model: TicketPriority },
        { model: TicketDepartment },
        { model: TicketStatus }
      ]
    });
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.ticket_delete = async (req, res) => {
  const ticketId = req.params.id;
  try {
    await Ticket.destroy({ where: { IDTICKET: ticketId } });
    res.json({ message: "Ticket deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controllers;
