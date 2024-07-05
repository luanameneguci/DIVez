var AccountType = require("./accountType");
var AdminDepartment = require("./adminDepartment");
var Billing = require("./billing");
var Budget = require("./budget");
var BudgetCart = require("./budgetCart");
var BudgetPackage = require("./budgetPackage");
var BudgetProduct = require("./budgetProduct");
var BudgetStatus = require("./budgetStatus");
var Cart = require("./cart");
var Licenses = require("./licenses");
var LicenseStatus = require("./licenseStatus");
var LicenseUser = require("./licenseUser");
var Package = require("./package");
var PackageCart = require("./packageCart");
var PackageProduct = require("./packageProduct");
var Product = require("./product");
var ProductCart = require("./productCart");
var ProductCategory = require("./productCategory");
var User = require("./user");
var Ticket = require("./ticket");
var TicketDepartment = require("./ticketDepartment");
var TicketPriority = require("./ticketPriority");
var TicketStatus = require("./ticketStatus");

// Require the insertInitialData function
var insertInitialData = require('./insertInitialData');

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

    // Final wave
    await Licenses.sync({ alter: true });
    await BudgetCart.sync({ alter: true });
    await BudgetPackage.sync({ alter: true });
    await BudgetProduct.sync({ alter: true });
    await LicenseUser.sync({ alter: true });
    await PackageCart.sync({ alter: true });
    await PackageProduct.sync({ alter: true });
    await ProductCart.sync({ alter: true });

    console.log("All models were synchronized successfully.");

    // Call the insertInitialData function after all tables are synchronized
    await insertInitialData();
  } catch (error) {
    console.error("An error occurred while syncing models or inserting initial data:", error);
  }
})();
