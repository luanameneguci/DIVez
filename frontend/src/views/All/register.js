import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import logo from "../../images/logo-navbar.svg";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userNif, setUserNif] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (userPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/user/create", {
        idAccountType: 2, // Always register as buyer
        idDepartment: null, // Null because buyers don't have departments
        idCart: null, // A cart is attributed after account creation
        userName,
        userPassword,
        userEmail,
        userNif: parseInt(userNif), // Parse userNif to integer
        idBuyer: null, // Null because buyers don't have buyers
      });
  
      console.log("Registration successful:", response.data);
      // Redirect or show success message
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again."); // Update error state
    }
  };

  return (
    <section className="vh-100 Gradient">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="bg-light shadow card-registration" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="userName"
                          className="form-control form-control-lg"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="userName">
                          Username
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 d-flex align-items-center">
                      <div className="form-outline">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="userNif"
                          maxLength="9"
                          minLength="9"
                          pattern="^\d{9}$"
                          value={userNif}
                          onChange={(e) => setUserNif(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="userNif">
                          NIF
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="userEmail"
                          className="form-control form-control-lg"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="userEmail">
                          Email
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="userPassword"
                          className="form-control form-control-lg"
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="userPassword">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="confirmPassword"
                          className="form-control form-control-lg"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                      </div>
                    </div>
                  </div>

                  {error && <p className="text-danger">{error}</p>}

                  <div className="mt-4 pt-2 col-12">
                    <input
                      className="btn btn-info text-white btn-lg col-12 hover"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
