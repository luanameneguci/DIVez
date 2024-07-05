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
const { sequelize } = require('./database');

// Insert initial data function
async function insertInitialData() {
    const transaction = await sequelize.transaction();
    try {
        const accountTypes = [
            { accountType: 'Admin' },
            { accountType: 'Buyer' },
            { accountType: 'Manager' }
        ];
        const adminDepartments = [
            { department: 'Design' },
            { department: 'Programming' },
            { department: 'Human Resources' },
            { department: 'Finance' }
        ];
        const budgetStatuses = [
            { budgetStatus: 'New' },
            { budgetStatus: 'Pending' },
            { budgetStatus: 'Paid' },
            { budgetStatus: 'Rejected' }
        ];
        const licenseStatuses = [
            { licenseStatus: 'Active' },
            { licenseStatus: 'Inactive' },
            { licenseStatus: 'Revoked' }
        ];
        const productCategories = [
            { category: 'Programming' },
            { category: 'Design' },
            { category: 'Animation' },
            { category: 'Managing' },
            { category: 'Web' }
        ];
        const ticketDepartments = [
            { ticketDepartment: 'Design' },
            { ticketDepartment: 'Programming' },
            { ticketDepartment: 'Human Resources' },
            { ticketDepartment: 'Finance' }
        ];
        const ticketPriorities = [
            { ticketPriority: 1 },
            { ticketPriority: 2 },
            { ticketPriority: 3 },
            { ticketPriority: 4 },
            { ticketPriority: 0 }
        ];
        const ticketStatuses = [
            { ticketStatus: 'New' },
            { ticketStatus: 'Pending' },
            { ticketStatus: 'Solved' },
            { ticketStatus: 'Rejected' }
        ];
        const carts = [
            { idUser: 5, cartPrice: 100.50 },
            { idUser: 6, cartPrice: 75.25 },
            { idUser: 7, cartPrice: 120.75 },
            { idUser: 8, cartPrice: 200.75 }
        ];
        const billings = [
            { idCart: 1, billDate: '2024-07-01' },
            { idCart: 2, billDate: '2024-07-02' },
            { idCart: 3, billDate: '2024-07-03' },
            { idCart: 4, billDate: '2024-07-04' },
            { idCart: 1, billDate: '2024-07-05' },
            { idCart: 2, billDate: '2024-07-06' },
            { idCart: 3, billDate: '2024-07-07' },
            { idCart: 4, billDate: '2024-07-08' },
            { idCart: 1, billDate: '2024-07-09' },
            { idCart: 2, billDate: '2024-07-10' }
        ];
        const packages = [
            { packageName: 'Standard Package', packagePrice: 49.99 },
            { packageName: 'Silver Package', packagePrice: 99.99 },
            { packageName: 'Gold Package', packagePrice: 149.99 },
            { packageName: 'Platinum Package', packagePrice: 199.99 },
            { packageName: 'Diamond Package', packagePrice: 299.99 }
        ];
        const products = [
            { idCategory: 1, productName: 'Product 1', productPrice: 19.99, productVersion: 1.0, productImage: 'image1.jpg', productDescription: 'Description for Product 1', productInstalls: 1000, productRating: 4.5 },
            { idCategory: 2, productName: 'Product 2', productPrice: 29.99, productVersion: 2.0, productImage: 'image2.jpg', productDescription: 'Description for Product 2', productInstalls: 1500, productRating: 4.2 },
            { idCategory: 3, productName: 'Product 3', productPrice: 39.99, productVersion: 1.5, productImage: 'image3.jpg', productDescription: 'Description for Product 3', productInstalls: 800, productRating: 4.7 },
            { idCategory: 4, productName: 'Product 4', productPrice: 49.99, productVersion: 2.5, productImage: 'image4.jpg', productDescription: 'Description for Product 4', productInstalls: 1200, productRating: 4.3 },
            { idCategory: 5, productName: 'Product 5', productPrice: 59.99, productVersion: 1.2, productImage: 'image5.jpg', productDescription: 'Description for Product 5', productInstalls: 900, productRating: 4.6 },
            { idCategory: 1, productName: 'Product 6', productPrice: 69.99, productVersion: 2.1, productImage: 'image6.jpg', productDescription: 'Description for Product 6', productInstalls: 1100, productRating: 4.4 },
            { idCategory: 2, productName: 'Product 7', productPrice: 79.99, productVersion: 1.8, productImage: 'image7.jpg', productDescription: 'Description for Product 7', productInstalls: 1300, productRating: 4.8 },
            { idCategory: 3, productName: 'Product 8', productPrice: 89.99, productVersion: 3.0, productImage: 'image8.jpg', productDescription: 'Description for Product 8', productInstalls: 700, productRating: 4.1 },
            { idCategory: 4, productName: 'Product 9', productPrice: 99.99, productVersion: 1.7, productImage: 'image9.jpg', productDescription: 'Description for Product 9', productInstalls: 1400, productRating: 4.9 },
            { idCategory: 5, productName: 'Product 10', productPrice: 109.99, productVersion: 2.3, productImage: 'image10.jpg', productDescription: 'Description for Product 10', productInstalls: 950, productRating: 4.2 }
        ];
        const tickets = [
            { idTicketPriority: 1, idTicketDepartment: 1, idTicketStatus: 1, ticketName: 'Ticket 1', ticketDescription: 'Description for ticket 1', ticketDate: '2024-07-05' },
            { idTicketPriority: 1, idTicketDepartment: 2, idTicketStatus: 2, ticketName: 'Ticket 2', ticketDescription: 'Description for ticket 2', ticketDate: '2024-07-05' },
            { idTicketPriority: 3, idTicketDepartment: 3, idTicketStatus: 3, ticketName: 'Ticket 3', ticketDescription: 'Description for ticket 3', ticketDate: '2024-07-05' },
            { idTicketPriority: 1, idTicketDepartment: 4, idTicketStatus: 4, ticketName: 'Ticket 4', ticketDescription: 'Description for ticket 4', ticketDate: '2024-07-05' },
            { idTicketPriority: 3, idTicketDepartment: 1, idTicketStatus: 1, ticketName: 'Ticket 5', ticketDescription: 'Description for ticket 5', ticketDate: '2024-07-05' },
            { idTicketPriority: 4, idTicketDepartment: 2, idTicketStatus: 2, ticketName: 'Ticket 6', ticketDescription: 'Description for ticket 6', ticketDate: '2024-07-05' },
            { idTicketPriority: 3, idTicketDepartment: 3, idTicketStatus: 3, ticketName: 'Ticket 7', ticketDescription: 'Description for ticket 7', ticketDate: '2024-07-05' },
            { idTicketPriority: 1, idTicketDepartment: 4, idTicketStatus: 4, ticketName: 'Ticket 8', ticketDescription: 'Description for ticket 8', ticketDate: '2024-07-05' },
            { idTicketPriority: 3, idTicketDepartment: 1, idTicketStatus: 1, ticketName: 'Ticket 9', ticketDescription: 'Description for ticket 9', ticketDate: '2024-07-05' },
            { idTicketPriority: 4, idTicketDepartment: 2, idTicketStatus: 2, ticketName: 'Ticket 10', ticketDescription: 'Description for ticket 10', ticketDate: '2024-07-05' }
        ];

        const budgetPackage = [
                { idPackage: 1, idBudget: 1 },
                { idPackage: 1, idBudget: 2 },
                { idPackage: 2, idBudget: 3 },
                { idPackage: 4, idBudget: 2 }
        ];

        const budgetProduct = [
                { idProduct: 5, idBudget: 1 },
                { idProduct: 2, idBudget: 1 },
                { idProduct: 3, idBudget: 3 },
                { idProduct: 4, idBudget: 2 }
        ];


        // Insert data using transactions
        await AccountType.bulkCreate(accountTypes, { transaction });
        await AdminDepartment.bulkCreate(adminDepartments, { transaction });
        await BudgetStatus.bulkCreate(budgetStatuses, { transaction });
        await LicenseStatus.bulkCreate(licenseStatuses, { transaction });
        await ProductCategory.bulkCreate(productCategories, { transaction });
        await TicketDepartment.bulkCreate(ticketDepartments, { transaction });
        await TicketPriority.bulkCreate(ticketPriorities, { transaction });
        await TicketStatus.bulkCreate(ticketStatuses, { transaction });
        await Cart.bulkCreate(carts, { transaction });
        await Billing.bulkCreate(billings, { transaction });
        await Package.bulkCreate(packages, { transaction });
        await Product.bulkCreate(products, { transaction });
        await Ticket.bulkCreate(tickets, { transaction });

        await transaction.commit();
        console.log('Initial data inserted successfully');
    } catch (error) {
        await transaction.rollback();
        console.error('Error inserting initial data:', error);
    }
}

module.exports = insertInitialData;
