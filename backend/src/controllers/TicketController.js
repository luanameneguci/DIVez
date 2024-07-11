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
  const { idTicketPriority, idTicketDepartment, idTicketStatus, ticketName, ticketDescription, ticketDate } = req.body;
  try {
    const newTicket = await Ticket.create({
      idTicketPriority,
      idTicketDepartment,
      idTicketStatus,
      ticketName,
      ticketDescription,
      ticketDate
    });
    res.json(newTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controllers.ticket_update = async (req, res) => {
  const ticketId = req.params.id;
  const { idTicketPriority, idTicketDepartment, idTicketStatus, ticketName, ticketDescription, ticketDate } = req.body;
  try {
    const updatedTicket = await Ticket.update(
      {
        idTicketPriority,
        idTicketDepartment,
        idTicketStatus,
        ticketName,
        ticketDescription,
        ticketDate
      },
      { where: { idTicket: ticketId } }
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
      where: { idTicket: ticketId },
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
    await Ticket.destroy({ where: { idTicket: ticketId } });
    res.json({ message: "Ticket deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.TicketsById = async (req, res) => {
  const { idBuyer } = req.params; // Retrieve idBuyer from the request parameters

  try {
    const tickets = await Ticket.findAll({
      where: {
        idBuyer: idBuyer
      },
      include: [
        {
          model: TicketDepartment,
          attributes: ['ticketDepartment'] // Include department name
        },
        {
          model: TicketStatus,
          attributes: ['ticketStatus'] // Include status name
        }
      ]
    });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controllers.countTicketsWithStatus2 = async (req, res) => {
  try {
      const count = await Ticket.count({
          where: {
              idTicketStatus: 2
          }
      });
      res.json({ count });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

controllers.countTicketsByStatusAndDepartment = async (req, res) => {
  try {
    const ticketCounts = await Ticket.findAll({
      attributes: [
        'idTicketDepartment',
        [Sequelize.fn('COUNT', Sequelize.col('idTicket')), 'count']
      ],
      where: {
        idTicketStatus: 2
      },
      group: ['idTicketDepartment'],
      raw: true
    });

    const formattedCounts = ticketCounts.map(item => ({
      idTicketDepartment: item.idTicketDepartment,
      count: parseInt(item.count)
    }));

    res.json(formattedCounts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = controllers;
