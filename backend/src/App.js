const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const AccountType = require("./routes/accountTypeRoute");
const AdminDepartment = require("./routes/adminDepartmentRoute");
const Billing = require("./routes/billingRoute");
const Budget = require("./routes/budgetRoute");
const BudgetCart = require("./routes/budgetCartRoute");
const BudgetPackage = require("./routes/budgetCartRoute");
const BudgetProduct = require("./routes/budgetProductRoute");
const BudgetStatus = require("./routes/budgetStatusRoute");
const Cart = require("./routes/cartRoute");
const Licenses = require("./routes/licensesRoute");
const LicenseStatus = require("./routes/licenseStatusRoute");
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
