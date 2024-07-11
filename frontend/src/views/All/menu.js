// Menu.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

// views import
import Login from "./login";
import Register from "./register";

// styles import
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Inicio = () => {
  return (
    <div className="row dashboard-content">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

const Menu = () => {
  return (
    <Router>
      <Inicio />
    </Router>
  );
};

export default Menu;
