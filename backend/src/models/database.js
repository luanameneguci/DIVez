var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'Divez',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
);

module.exports = sequelize;

/*
const AccountType = require("./accountType");
const AdminDepartment = require("./adminDepartment");
const Billing = require("./billing");
const Budget = require("./budget");
const BudgetCart = require("./budgetCart");
const BudgetPackage = require("./budgetPackage");
const BudgetProduct = require("./budgetProduct");
const BudgetStatus = require("./budgetStatus");
const Cart = require("./cart");
const Licenses = require("./licenses");
const LicenseStatus = require("./licensesStatus");
const LicenseUser = require("./licenseUser");
const Package = require("./package");
const PackageCart = require("./packageCart");
const PackageProduct = require("./packageProduct");
const Product = require("./product");
const ProductCart = require("./productCart");
const ProductCategory = require("./productCategory");
const User = require("./user");
const Ticket = require("./ticket");
const TicketDepartment = require("./ticketDepartment");
const TicketPriority = require("./ticketPriority");
const TicketStatus = require("./ticketStatus");

const models = { 
    AccountType, AdminDepartment, Billing, Budget, BudgetCart, BudgetPackage,
    BudgetProduct, BudgetStatus, Cart, Licenses, LicenseStatus, LicenseUser, 
    Package, PackageCart, PackageProduct, Product, ProductCart, ProductCategory,
    User, Ticket, TicketDepartment, TicketPriority, TicketStatus
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});*/