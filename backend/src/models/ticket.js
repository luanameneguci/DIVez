const Sequelize = require('sequelize');
const sequelize = require('./database');
const TicketPriority = require('./ticketPriority');
const TicketDepartment = require('./ticketDepartment');
const TicketStatus = require('./ticketStatus');

const Ticket = sequelize.define('Ticket', {
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
  tableName: 'Ticket',
  timestamps: false
});

// Define associations
Ticket.belongsTo(TicketPriority, { foreignKey: 'idTicketPriority' });
Ticket.belongsTo(TicketDepartment, { foreignKey: 'idTicketDepartment' });
Ticket.belongsTo(TicketStatus, { foreignKey: 'idTicketStatus' });

module.exports = Ticket;
