const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const AccountType = require("./routes/accountType");
const AdminDepartment = require("./routes/adminDepartment");
const Billing = require("./routes/billing");
const Budget = require("./routes/budget");
const BudgetCart = require("./routes/budgetCart");
const BudgetPackage = require("./routes/budgetCart");
const BudgetProduct = require("./routes/budgetProduct");
const BudgetStatus = require("./routes/budgetStatus");
const Cart = require("./routes/cart");
const Licenses = require("./routes/licenses");
const LicenseStatus = require("./routes/licenseStatus");
const LicenseUser = require("./routes/licenseUser");
const Package = require("./routes/package");
const PackageCart = require("./routes/packageCart");
const PackageProduct = require("./routes/packageProduct");
const Product = require("./routes/product");
const ProductCart = require("./routes/productCart");
const ProductCategory = require("./routes/productCategory");
const User = require("./routes/user");
const Ticket = require("./routes/ticket");
const TicketDepartment = require("./routes/ticketDepartment");
const TicketPriority = require("./routes/ticketPriority");
const TicketStatus = require("./routes/ticketStatus");



// Configurar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
  }); 

//Configurações
app.set("port", process.env.PORT || 8080);
//Middlewares
app.use(express.json());
//Rotas
app.use('/accountType', AccountType) 
app.use('/adminDepartment',AdminDepartment)
app.use('/billing', Billing)
app.use('/budget', Budget)
app.use('/budgetCart',BudgetCart)
app.use('/budgetPackage',BudgetPackage)
app.use('/budgetProduct',BudgetProduct)
app.use('/budgetStatus',BudgetStatus)
app.use('/cart',Cart)
app.use('/licenses',Licenses)
app.use('/licenseStatus',LicenseStatus)
app.use('/licenseUser', LicenseUser)
app.use('/package',Package)
app.use('/packageCart',PackageCart)
app.use('/packageProduct',PackageProduct)
app.use('/product',Product)
app.use('/productCart',ProductCart)
app.use('/productCategory',ProductCategory)
app.use('/user',User)
app.use('/product',productRoutes)
app.use('/ticket',Ticket)
app.use('/ticketDepartment',TicketDepartment)
app.use('/ticketPriority',TicketPriority)
app.use('/ticketStatus',TicketStatus)

app.listen(app.get("port"), () => {
  console.log("Start server on port " + app.get("port"));
});
