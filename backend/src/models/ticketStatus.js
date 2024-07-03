const Sequelize = require('sequelize');
const sequelize = require('./database');

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
