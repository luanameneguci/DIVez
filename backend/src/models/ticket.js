const Sequelize = require('sequelize');
const sequelize = require('./database');
const TicketPriority = require('./ticketPriority');
const TicketDepartment = require('./ticketDepartment');
const TicketStatus = require('./ticketStatus');

const Ticket = sequelize.define('Ticket', {
  IDTICKET: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  IDTICKETPRIORITY: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: TicketPriority,
      key: 'IDTICKETPRIORITY'
    }
  },
  IDTICKETDEPARTMENT: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: TicketDepartment,
      key: 'IDTICKETDEPARTMENT'
    }
  },
  IDTICKETSTATUS: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: TicketStatus,
      key: 'IDTICKETSTATUS'
    }
  },
  TICKETNAME: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  TICKETDESCRIPTION: {
    type: Sequelize.STRING(300),
    allowNull: true
  },
  TICKETDATE: {
    type: Sequelize.DATE,
    allowNull: true
  }
}, {
  tableName: 'TICKET',
  timestamps: false
});

// Define associations
Ticket.belongsTo(TicketPriority, { foreignKey: 'IDTICKETPRIORITY' });
Ticket.belongsTo(TicketDepartment, { foreignKey: 'IDTICKETDEPARTMENT' });
Ticket.belongsTo(TicketStatus, { foreignKey: 'IDTICKETSTATUS' });

module.exports = Ticket;
