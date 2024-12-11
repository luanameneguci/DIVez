import React, { useContext } from 'react';
import { UserContext } from '../All/UserContext';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
} from "react-router-dom";
import "../../App.css";
import logo from "../../images/logo-navbar.svg";
import ManagerProducts from "../../views/manager/managerProducts";
import FAQ from "../../views/buyer/faq";
import ManagerTicketList from "../../views/manager/managerTicketList";
import ManagerProduct from "../../views/manager/managerProduct";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Menu = ({ userId }) => {
  const { logoutUser } = useContext(UserContext);
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
  };

  const getNavItemClass = (path) => {
    return location.pathname.includes(path)
      ? "navbar-link text-decoration-none text-white align-middle px-5 py-2 bg-info roundbg w-100 col-12"
      : "navbar-link text-decoration-none text-black align-middle px-5 py-2";
  };

  return (
    <div className="row flex-nowrap px-0 mx-0 bg-light">
      <div className="col-auto col-md-3 col-xl-2 px-sm-3 px-0 bg-white fixed-top">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a href="/" className="d-flex align-items-center pb-3 mx-auto">
            <img src={logo} alt="logo divez" className="header-logo" />
          </a>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="nav-item col-12 text-center">
              <Link to="/dashboard" className={getNavItemClass("/dashboard")}>
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item col-12 text-center">
              <Link to="/tickets" className={getNavItemClass("/ticket")}>
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Tickets</span>
              </Link>
            </li>
            <li className="nav-item col-12 text-center">
              <Link to="/faq" className={getNavItemClass("/faq")}>
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
              <span className="account-text">Manager</span>
            </div>
          </div>
        </div>

        <div className="mw-100 h-25 bg-light py-2 px-3">
          <div className="row dashboard-content">
            {/*Corrigir rotas*/}
            <Routes>
              <Route path="/dashboard" element={<ManagerProducts userId={userId} />} />
              <Route path="/tickets" element={<ManagerTicketList userId={userId} />} />
              <Route path="/product" element={<ManagerProduct userId={userId} />} />
              <Route path="/faq" element={<FAQ userId={userId} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManagerMenu = ({ userId }) => {
  return (
    <Router>
      <Menu userId={userId} />
    </Router>
  );
};

export default ManagerMenu;
