const Sequelize = require('sequelize');
const sequelize = require('./database');

const TicketDepartment = require("./ticketDepartment");
const TicketPriority = require("./ticketPriority");
const TicketStatus = require("./ticketStatus");
const User = require("./user");

const Ticket = sequelize.define('ticket', {
  idTicket: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idTicketPriority: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: TicketPriority,
      key: 'idTicketPriority'
    }
  },
  idTicketDepartment: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: TicketDepartment,
      key: 'idTicketDepartment'
    }
  },
  idTicketStatus: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: TicketStatus,
      key: 'idTicketStatus'
    }
  },
  idBuyer: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'idUser'
    }
  },
  ticketName: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  ticketDescription: {
    type: Sequelize.STRING(300),
    allowNull: true
  },
  ticketDate: {
    type: Sequelize.DATE,
    allowNull: true
  }
}, {
  timestamps: false
});

module.exports = Ticket;
