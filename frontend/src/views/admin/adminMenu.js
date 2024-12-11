// npms import
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from "react-router-dom";
import { UserContext } from '../All/UserContext';

// images import
import logo from "../../images/logo-navbar.svg";

// views import
import AdminDashboard from "../../views/admin/adminDashboard";
import AdminClientList from "../../views/admin/adminClientList";
import AdminClientDashboard from "../../views/admin/adminClientDashboard";
import AdminProductDashboard from "../../views/admin/adminProductDashboard";
import AdminProductList from "../../views/admin/adminProductList";
import AdminTicketList from "../../views/admin/adminTicketList";
import AdminSalesList from "../../views/admin/adminSalesList";
import AdminBudgetList from "../../views/admin/adminBudgetList";
import PackageAdd from "../../views/admin/packageAdd";
import ProductAdd from "../../views/admin/productAdd";
import ProductEdit from "../../views/admin/productEdit";
import AdminBudgetReply from "../../views/admin/adminBudgetReply";
import AdminSalesDashboard from "../../views/admin/adminSalesDashboard";
import AdminTicketReply from "../../views/admin/adminTicketReply";


// styles import
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Menu = ({ userId }) => {
  const { logoutUser } = useContext(UserContext);
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
  };

  const getNavItemClass = (path) => {
    return location.pathname.includes(path) ? 'navbar-link text-decoration-none text-white align-middle px-5 py-2 bg-info roundbg w-100 col-12' : 'navbar-link text-decoration-none text-black align-middle px-5 py-2';
  };

  return (
    <div className="App">
      <div className="row flex-nowrap px-0 mx-0 bg-light">
        <div className="col-auto col-md-3 col-xl-2 px-sm-3 px-0 bg-white fixed-top">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mx-auto">
              <img src={logo} alt="logo divez" className="header-logo" />
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item">
                <Link to="/dashboard" className={getNavItemClass('/dashboard')}>
                  <i className="fs-4 bi-house"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/clients" className={getNavItemClass('/client')}>
                  <i className="fs-4 bi-house"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Clients</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className={getNavItemClass('/product')}>
                  <i className="fs-4 bi-house"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Products</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/tickets" className={getNavItemClass('/ticket')}>
                  <i className="fs-4 bi-house"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Tickets</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sales" className={getNavItemClass('/sales')}>
                  <i className="fs-4 bi-house"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Sales</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/budgets" className={getNavItemClass('/budget')}>
                  <i className="fs-4 bi-house"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Budgets</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-auto col-md-3 col-xl-2 px-sm-3 px-0"></div>
        <div className="col-10 h-25 bg-white px-0">
          <div className="d-flex align-self-end sticky-top flex-row-reverse bg-white px-5 py-2">
            <div>
              <button className="btn btn-danger ms-3" onClick={handleLogout}>
                x
              </button>
            </div>
            <div>
              <div>
                <span className="username-text">User</span>
              </div>
              <div className="account-type">
                <span className="account-text">Admin</span>
              </div>
            </div>
          </div>
          <div className="w-100 bg-light">
            <div className="row dashboard-content">
              <Routes>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/clients" element={<AdminClientList />} />
                <Route path="/client/:idUser" element={<AdminClientDashboard />} />
                <Route path="/product-dashboard" element={<AdminProductDashboard />} />
                <Route path="/products" element={<AdminProductList />} />
                <Route path="/tickets" element={<AdminTicketList />} />
                <Route path="/sales" element={<AdminSalesList />} />
                <Route path="/sale" element={<AdminSalesDashboard />} />
                <Route path="/budgets" element={<AdminBudgetList />} />
                <Route path="/package" element={<PackageAdd />} />
                <Route path="/product" element={<ProductAdd />} />
                <Route path="/productedit/:idProduct" element={<ProductEdit />} />
                <Route path="/budgetreply/:idBudget" element={<AdminBudgetReply />} />
                <Route path="/ticketreply/:idTicket" element={<AdminTicketReply />} />
                <Route path="/ticketreply" element={<AdminTicketReply />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminMenu = ({ userId }) => {
  return (
    <Router>
      <Menu userId={userId} />
    </Router>
  );
};

export default AdminMenu;

