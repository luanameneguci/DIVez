import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import "../../App.css";
import logo from "../../images/logo-navbar.svg";
import { UserContext } from '../All/UserContext';

import BuyerProductItem from "../../views/buyer/buyerProductItem";
import BuyerPayment from "../../views/buyer/buyerPayment";
import BuyerShopItem from "../../views/buyer/buyerShopItem";
import FAQ from "../../views/buyer/faq";
import BuyerBudgetList from "../../views/buyer/buyerBudgetList";
import BuyerPurchasesList from "../../views/buyer/buyerPurchases";
import BuyerProductList from "../../views/buyer/buyerProducts";
import BuyerManagerList from "../../views/buyer/buyerManagers";
import BuyerDashboard from "../../views/buyer/buyerDashboard";
import Shop from "../../views/buyer/buyerShop";
import ShopItem from "../../views/buyer/buyerShopItem";
import BuyerBudgetReply from "./buerBudgetRequest";
import BuyerBudgetDetail from "./buyerBudgetDetail";

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
    <div className="row flex-nowrap px-0 mx-0 bg-light">
      <div className="col-auto col-md-3 col-xl-2 px-sm-3 px-0 bg-white fixed-top">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a href="/dashboard" className="d-flex align-items-center pb-3 mx-auto">
            <img src={logo} alt="logo divez" className="header-logo" />
          </a>
          <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start col-12" id="menu">
            <li className="nav-item col-12 text-center">
              <Link to="/dashboard" className={getNavItemClass('/dashboard')}>
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item col-12 text-center">
              <Link to="/shop" className={getNavItemClass('/shop')}>
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Shop</span>
              </Link>
            </li>
            <li className="nav-item col-12 text-center">
              <Link to="/managers" className={getNavItemClass('/managers')}>
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Managers</span>
              </Link>
            </li>
            <li className="nav-item col-12 text-center">
              <Link to="/products" className={getNavItemClass('/products')}>
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Products</span>
              </Link>
            </li>
            <li className="nav-item col-12 text-center">
              <Link to="/purchases" className={getNavItemClass('/purchases')}>
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Purchases</span>
              </Link>
            </li>
            <li className="nav-item col-12 text-center">
              <Link to="/budgets" className={getNavItemClass('/budgets')}>
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Budget</span>
              </Link>
            </li>
            <li className="nav-item col-12 text-center">
              <Link to="/faq" className={getNavItemClass('/faq')}>
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">FAQ</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-auto col-md-3 col-xl-2 px-sm-3 px-0"></div>
      <div className="col-10 h-25 bg-light px-0">
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
              <span className="account-text">Client</span>
            </div>
          </div>
          <div className="mx-3">
            <Link to="/checkout" className="text-black">
              <img
                className="me-2"
                src="https://img.icons8.com/?size=100&id=CE7rP-35_XQR&format=png&color=000000"
                style={{ height: 30 + "px" }}
              />
            </Link>
            <Link to="/budgets" className="text-black">
              <img
                src="https://img.icons8.com/?size=100&id=nwhUUqONScaC&format=png&color=000000"
                style={{ height: 30 + "px" }}
              />
            </Link>
          </div>
        </div>

        <div className="mw-100 h-25 bg-light py-2 px-3">
          <div className="row dashboard-content">
            <Routes>
              <Route path="/dashboard" element={<BuyerDashboard userId={userId} />} />
              <Route path="/managers" element={<BuyerManagerList userId={userId} />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:idProduct" element={<ShopItem />} />
              <Route path="/products" element={<BuyerProductList userId={userId} />} />
              <Route path="/purchases" element={<BuyerPurchasesList userId={userId} />} />
              <Route path="/budgets" element={<BuyerBudgetList userId={userId} />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/checkout" element={<BuyerPayment />} />
              <Route path="/productitem/:idProduct" element={<BuyerProductItem userId={userId} />} />
              <Route path="/shop/:id" element={<BuyerShopItem />} />
              <Route path="/budgetrequest" element={<BuyerBudgetReply />} />
              <Route path="/budget/details/:idBudget" element={<BuyerBudgetDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const BuyerMenu = ({ userId }) => {
  return (
    <Router>
      <Menu userId={userId} />
    </Router>
  );
};

export default BuyerMenu;
