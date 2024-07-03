var AccountType = require("../models/accountType");
var AdminDepartment = require("../models/adminDepartment");
var Billing = require("../models/billing");
var Budget = require("../models/budget");
var BudgetCart = require("../models/budgetCart");
var BudgetPackage = require("../models/budgetCart");
var BudgetProduct = require("../models/budgetProduct");
var BudgetStatus = require("../models/budgetStatus");
var Cart = require("../models/cart");
var Licenses = require("../models/licenses");
var LicenseStatus = require("../models/licenseStatus");
var LicenseUser = require("../models/licenseUser");
var Package = require("../models/package");
var PackageCart = require("../models/packageCart");
var PackageProduct = require("../models/packageProduct");
var Product = require("../models/product");
var ProductCart = require("../models/productCart");
var ProductCategory = require("../models/productCategory");
var User = require("../models/user");


(async () => {

  try {
    await AccountType.sync({ alter: true });
    await AdminDepartment.sync({ alter: true });
    await BudgetStatus.sync({ alter: true });
    await LicenseStatus.sync({ alter: true });
    await ProductCategory.sync({ alter: true });

    await User.sync({ alter: true });
    await Budget.sync({ alter: true });
    await Cart.sync({ alter: true });
    await Licenses.sync({ alter: true });
    await Package.sync({ alter: true });
    await Product.sync({ alter: true });

    await Billing.sync({ alter: true });
    await BudgetCart.sync({ alter: true });
    await BudgetPackage.sync({ alter: true });
    await BudgetProduct.sync({ alter: true });
    await LicenseUser.sync({ alter: true });
    await PackageCart.sync({ alter: true });
    await PackageProduct.sync({ alter: true });
    await ProductCart.sync({ alter: true });

    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("An error occurred while syncing models:", error);
  }
})();
