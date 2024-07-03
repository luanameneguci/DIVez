// Associations
const User = require('./user');
const Budget = require('./budget');
const Cart = require('./cart');
const Product = require('./product');
const Package = require('./package');
const Billing = require('./billing');
const BudgetProduct = require('./budgetProduct');
const BudgetPackage = require('./budgetPackage');
const BudgetCart = require('./budgetCart');
const ProductCart = require('./productCart');
const PackageCart = require('./packageCart');
const License = require('./licenses');
const LicenseStatus = require('./licenseStatus');
const ProductCategory = require('./productCategory');
const AdminDepartment = require('./adminDepartment');
const AccountType = require('./accountType');

// Define associations
User.hasMany(Budget, { foreignKey: 'idUser' });
Budget.belongsTo(User, { foreignKey: 'idUser' });

User.hasMany(Cart, { foreignKey: 'idUser' });
Cart.belongsTo(User, { foreignKey: 'idUser' });

Cart.hasMany(ProductCart, { foreignKey: 'idCart' });
ProductCart.belongsTo(Cart, { foreignKey: 'idCart' });
Cart.hasMany(PackageCart, { foreignKey: 'idCart' });
PackageCart.belongsTo(Cart, { foreignKey: 'idCart' });

Cart.hasOne(Billing, { foreignKey: 'idCart' });
Billing.belongsTo(Cart, { foreignKey: 'idCart' });

Budget.hasMany(BudgetProduct, { foreignKey: 'idBudget' });
BudgetProduct.belongsTo(Budget, { foreignKey: 'idBudget' });
Budget.hasMany(BudgetPackage, { foreignKey: 'idBudget' });
BudgetPackage.belongsTo(Budget, { foreignKey: 'idBudget' });

License.belongsTo(Billing, { foreignKey: 'idBill' });
License.belongsTo(User, { foreignKey: 'idLicenseUser' });
License.belongsTo(LicenseStatus, { foreignKey: 'idLicenseStatus' });

Product.belongsTo(ProductCategory, { foreignKey: 'idCategory' });

Package.belongsToMany(Product, { through: PackageProduct, foreignKey: 'idPackage' });
Product.belongsToMany(Package, { through: PackageProduct, foreignKey: 'idProduct' });

Budget.belongsToMany(Product, { through: BudgetProduct, foreignKey: 'idBudget' });
Budget.belongsToMany(Package, { through: BudgetPackage, foreignKey: 'idBudget' });

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
    License,
    LicenseStatus,
    ProductCategory,
    AdminDepartment,
    AccountType
};
