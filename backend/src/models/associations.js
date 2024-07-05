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
const LicenseStatus = require("./licenseStatus");
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

// Define associations
Budget.hasMany(BudgetProduct, { foreignKey: 'idBudget' });
BudgetProduct.belongsTo(Budget, { foreignKey: 'idBudget' });

Budget.hasMany(BudgetPackage, { foreignKey: 'idBudget' });
BudgetPackage.belongsTo(Budget, { foreignKey: 'idBudget' });

Cart.hasMany(ProductCart, { foreignKey: 'idCart' });
ProductCart.belongsTo(Cart, { foreignKey: 'idCart' });

Cart.hasMany(PackageCart, { foreignKey: 'idCart' });
PackageCart.belongsTo(Cart, { foreignKey: 'idCart' });

Cart.hasOne(Billing, { foreignKey: 'idCart' });
Billing.belongsTo(Cart, { foreignKey: 'idCart' });

User.hasMany(Cart, { foreignKey: 'idUser' });
Cart.belongsTo(User, { foreignKey: 'idUser' });

Licenses.belongsTo(Billing, { foreignKey: 'idBill' });
Licenses.belongsTo(User, { foreignKey: 'idLicenseUser' });
Licenses.belongsTo(LicenseStatus, { foreignKey: 'idLicenseStatus' });
Licenses.belongsTo(Product, { foreignKey: 'idProduct' });

Package.belongsToMany(Product, { through: PackageProduct, foreignKey: 'idPackage' });
Product.belongsToMany(Package, { through: PackageProduct, foreignKey: 'idProduct' });

Product.belongsTo(ProductCategory, { foreignKey: 'idCategory' });

Ticket.belongsTo(TicketPriority, { foreignKey: 'idTicketPriority' });
Ticket.belongsTo(TicketDepartment, { foreignKey: 'idTicketDepartment' });
Ticket.belongsTo(TicketStatus, { foreignKey: 'idTicketStatus' });

User.hasMany(Budget, { foreignKey: 'idUser' });
Budget.belongsTo(User, { foreignKey: 'idUser' });

User.hasMany(Cart, { foreignKey: 'idUser' });
Cart.belongsTo(User, { foreignKey: 'idUser' });

User.hasMany(Licenses, { foreignKey: 'idUser' });
Licenses.belongsTo(User, { foreignKey: 'idUser' });

AccountType.hasMany(User, { foreignKey: 'idAccountType' });
User.belongsTo(AccountType, { foreignKey: 'idAccountType' });

AdminDepartment.hasMany(User, { foreignKey: 'idDepartment' });
User.belongsTo(AdminDepartment, { foreignKey: 'idDepartment' });

Budget.belongsTo(BudgetStatus, { foreignKey: 'idBudgetStatus' });

module.exports = {
    User,
    Budget,
    Cart,
    Product,
    Package,
    Billing,
    BudgetProduct,
    BudgetPackage,
    BudgetCart,
    ProductCart,
    PackageCart,
    Licenses,
    LicenseStatus,
    ProductCategory,
    AdminDepartment,
    AccountType
};
