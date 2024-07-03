const Sequelize = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('user', {
    IDUSER: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IDACCOUNTTYPE: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'ACCOUNTTYPE',
            key: 'IDACCOUNTTYPE'
        }
    },
    IDDEPARTMENT: {
        type: Sequelize.INTEGER,
        references: {
            model: 'ADMINDEPARTMENT',
            key: 'IDDEPARTMENT'
        }
    },
    IDCART: {
        type: Sequelize.INTEGER,
        references: {
            model: 'CART',
            key: 'IDCART'
        }
    },
    USERNAME: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    USERPASSWORD: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    USEREMAIL: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    USERNIF: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    IDBUYER: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = User;
