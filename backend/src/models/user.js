const Sequelize = require('sequelize');
const sequelize = require('./database');
const Budget = require('./budget');
const Cart = require('./cart');
const AccountType = require('./accountType');
const AdminDepartment = require('./adminDepartment');


const User = sequelize.define('user', {
    idUser: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idAccountType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'accountType',
            key: 'idAccountType'
        }
    },
    idDepartment: {
        type: Sequelize.INTEGER,
        references: {
            model: 'adminDepartment',
            key: 'idDepartment'
        }
    },
    idCart: {
        type: Sequelize.INTEGER,
        references: {
            model: 'cart',
            key: 'idCart'
        }
    },
    userName: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    userPassword: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    userEmail: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    userNif: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    idBuyer: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

User.hasMany(Budget, { foreignKey: 'idUser' });
Budget.belongsTo(User, { foreignKey: 'idUser' });

User.hasMany(Cart, { foreignKey: 'idUser' });
Cart.belongsTo(User, { foreignKey: 'idUser' });

AccountType.hasMany(User, { foreignKey: 'idAccountType'});
User.belongsTo(AccountType, {foreignKey: 'idAccountType'});

AdminDepartment.hasMany(User, { foreignKey: 'idDepartment'});
User.belongsTo(AdminDepartment, {foreignKey: 'idDepartment'});

module.exports = User;
