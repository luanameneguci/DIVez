const Sequelize = require('sequelize');
const sequelize = require('./database');
const Budget = require('./budget');
const Cart = require('./cart');
const AccountType = require('./accountType');
const AdminDepartment = require('./adminDepartment');


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
            model: 'accountType',
            key: 'idAccountType'
        }
    },
    IDDEPARTMENT: {
        type: Sequelize.INTEGER,
        references: {
            model: 'adminDepartment',
            key: 'idDepartment'
        }
    },
    IDCART: {
        type: Sequelize.INTEGER,
        references: {
            model: 'cart',
            key: 'idCart'
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

// fui buscar agua

User.hasMany(Budget, { foreignKey: 'idUser' });
Budget.belongsTo(User, { foreignKey: 'idUser' });

User.hasMany(Cart, { foreignKey: 'idUser' });
Cart.belongsTo(User, { foreignKey: 'idUser' });

AccountType.hasMany(User, { foreignKey: 'idAccountType'});
User.belongsTo(AccountType, {foreignKey: 'idAccountType'});

AdminDepartment.hasMany(User, { foreignKey: 'idDepartment'});
User.belongsTo(AdminDepartment, {foreignKey: 'idDepartment'});

module.exports = User;
