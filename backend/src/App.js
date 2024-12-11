const express = require("express");
const app = express();
const sequelize = require('./models/database');
const associations = require('./models/associations');
const middleware = require('./middleware');

const bodyParser = require("body-parser");

// Import your route modules
const AccountType = require("./routes/accountTypeRoute");
const AdminDepartment = require("./routes/adminDepartmentRoute");
const Billing = require("./routes/billingRoute");
const Budget = require("./routes/budgetRoute");
const BudgetCart = require("./routes/budgetCartRoute");
const BudgetPackage = require("./routes/budgetPackageRoute");
const BudgetProduct = require("./routes/BudgetProductRoute");
const BudgetStatus = require("./routes/budgetStatusRoute");
const Cart = require("./routes/cartRoute");
const Licenses = require("./routes/LicensesRoute");
const LicenseStatus = require("./routes/licensesStatusRoute");
const LicenseUser = require("./routes/licenseUserRoute");
const Package = require("./routes/packageRoute");
const PackageCart = require("./routes/packageCartRoute");
const PackageProduct = require("./routes/packageProductRoute");
const Product = require("./routes/productRoute");
const ProductCart = require("./routes/productCartRoute");
const ProductCategory = require("./routes/productCategoryRoute");
const User = require("./routes/userRoute");
const Ticket = require("./routes/ticketRoute");
const TicketDepartment = require("./routes/ticketDepartmentRoute");
const TicketPriority = require("./routes/ticketPriorityRoute");
const TicketStatus = require("./routes/ticketStatusRoute");
const UserLicense = require("./routes/UserLicensesRoute");


// Configure CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Middleware configurations
app.use(express.json());

// Define your routes
app.use('/accountType', AccountType);
app.use('/adminDepartment', AdminDepartment);
app.use('/billing', Billing);
app.use('/budget', Budget);
app.use('/budgetCart', BudgetCart);
app.use('/budgetPackage', BudgetPackage);
app.use('/budgetProduct', BudgetProduct);
app.use('/budgetStatus', BudgetStatus);
app.use('/cart', Cart);
app.use('/licenses', Licenses);
app.use('/licenseStatus', LicenseStatus);
app.use('/licenseUser', LicenseUser);
app.use('/package', Package);
app.use('/packageCart', PackageCart);
app.use('/packageProduct', PackageProduct);
app.use('/product', Product);
app.use('/productCart', ProductCart);
app.use('/productCategory', ProductCategory);
app.use('/user', User);
app.use('/ticket', Ticket);
app.use('/ticketDepartment', TicketDepartment);
app.use('/ticketPriority', TicketPriority);
app.use('/ticketStatus', TicketStatus);
app.use('/userLicenses', UserLicense);

// Set the port
app.set("port", process.env.PORT || 8080);

// Connect to the database and sync models
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');

        // Sync the models with the database
        return sequelize.sync();
    })
    .then(() => {
        console.log('All models were synchronized successfully.');

        // Start the server on port 8080
        app.listen(app.get("port"), () => {
            console.log("Start server on port " + app.get("port"));
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database or synchronize the models:', err);
    }
);
