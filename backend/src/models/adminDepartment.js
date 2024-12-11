const Sequelize = require('sequelize');
const sequelize = require('./database');

const AdminDepartment = sequelize.define('adminDepartment', {
    idDepartment: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    department: {
        type: Sequelize.STRING(50),
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = AdminDepartment;
