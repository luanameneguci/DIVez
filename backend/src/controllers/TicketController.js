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
  const { idTicketDepartment, ticketDescription, ticketDate, idUser } = req.body;
  
  try {
    const newTicket = await Ticket.create({
      idTicketPriority: 1,
      idTicketDepartment,
      idTicketStatus: 1, 
      idBuyer: idUser, 
      ticketName: 'Ticket', 
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
  const { idBuyer } = req.params;

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
      // Get the count of all tickets grouped by department
      const totalTicketCounts = await Ticket.findAll({
          attributes: [
              'idTicketDepartment',
              [Sequelize.fn('COUNT', Sequelize.col('idTicket')), 'total']
          ],
          group: ['idTicketDepartment'],
          raw: true
      });

      // Get the count of pending tickets grouped by department
      const pendingTicketCounts = await Ticket.findAll({
          attributes: [
              'idTicketDepartment',
              [Sequelize.fn('COUNT', Sequelize.col('idTicket')), 'pending']
          ],
          where: {
              idTicketStatus: 2
          },
          group: ['idTicketDepartment'],
          raw: true
      });

      // Merge the results
      const ticketCounts = totalTicketCounts.map(totalItem => {
          const pendingItem = pendingTicketCounts.find(p => p.idTicketDepartment === totalItem.idTicketDepartment);
          return {
              idTicketDepartment: totalItem.idTicketDepartment,
              total: parseInt(totalItem.total),
              pending: pendingItem ? parseInt(pendingItem.pending) : 0
          };
      });

      res.json(ticketCounts);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = controllers;