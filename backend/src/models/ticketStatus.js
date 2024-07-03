// TicketStatus.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as per your project structure

const TicketStatus = sequelize.define('TicketStatus', {
  IDTICKETSTATUS: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  TICKETSTATUS: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'TICKETSTATUS',
  timestamps: false
});

module.exports = TicketStatus;
