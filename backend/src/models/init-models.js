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
const UserLicense = require("./userLicenses");

// Require the insertInitialData function
//const insertInitialData = require('./insertData');

(async () => {
  try {
    // First wave to load since the rest of the tables are dependent of these
    await AccountType.sync({ alter: true });
    await AdminDepartment.sync({ alter: true });
    await BudgetStatus.sync({ alter: true });
    await LicenseStatus.sync({ alter: true });
    await ProductCategory.sync({ alter: true });
    await TicketDepartment.sync({ alter: true });
    await TicketPriority.sync({ alter: true });
    await TicketStatus.sync({ alter: true });

    // Second wave of tables
    await User.sync({ alter: true });
    await Cart.sync({ alter: true });
    await Billing.sync({ alter: true });
    await Package.sync({ alter: true });
    await Product.sync({ alter: true });
    await Ticket.sync({ alter: true });
    await Budget.sync({ alter: true });
    await Licenses.sync({ alter: true });

    // Final wave
    await BudgetCart.sync({ alter: true });
    await BudgetPackage.sync({ alter: true });
    await BudgetProduct.sync({ alter: true });
    await LicenseUser.sync({ alter: true });
    await ProductCart.sync({ alter: true });
    await PackageCart.sync({ alter: true });
    await PackageProduct.sync({ alter: true });
    await UserLicense.sync({ alter: true });

    console.log("All models were synchronized successfully.");

    // Call the insertInitialData function after all tables are synchronized
    //await insertInitialData();
  } catch (error) {
    console.error("An error occurred while syncing models or inserting initial data:", error);
  }
})();
