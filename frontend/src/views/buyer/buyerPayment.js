import React, { useState, useEffect } from "react";
import "../../App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Shop from "../../views/buyer/buyerShop";

const BuyerPayment = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  // Fetch data from API
  useEffect(() => {
    fetch("http://localhost:8080/cart/2/products")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to sum the total quantity of items in the cart
  const sumTotalQuantity = (items) => {
    return items.reduce((total, item) => total + item.numberOfLicenses, 0);
  };

  // Calculate the total quantity using the sumTotalQuantity function
  const totalQuantity = sumTotalQuantity(items);

  // Effect to calculate the total price when items change
  useEffect(() => {
    const totalPrice = items.reduce(
      (total, item) => total + item.productPrice * item.numberOfLicenses,
      0
    );
    setTotalPrice(totalPrice);
  }, [items]);

  // Handle card number change and format it with spaces every 4 digits
  const handleCardNumberChange = (event) => {
    const inputWithoutSpaces = event.target.value.replace(/\s+/g, "");
    const formattedValue = inputWithoutSpaces.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(formattedValue);
  };

  // Handle expiry date change and insert '/' after the first 2 characters (MM)
  const handleExpiryChange = (event) => {
    let formattedValue = event.target.value;
    if (formattedValue.length === 2 && !formattedValue.includes("/")) {
      formattedValue += "/";
    }
    setExpiry(formattedValue);
  };

  return (
    <div>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="bg-white roundbg shadow">
                <div className="p-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                        <Link to="/shop" className="text-body d-flex align-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chevron-left my-auto"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                            />
                          </svg>
                          Continue shopping
                        </Link>
                      </h5>
                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">
                            You have <strong>{totalQuantity}</strong> items in your cart
                          </p>
                        </div>
                      </div>

                      <div>
                        <ShoppingCart items={items} />
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="p-3 bg-info text-white roundbg">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0">Card details</h5>
                          </div>
                          <div className="d-flex justify-content-between">
                            <img src="https://img.icons8.com/?size=100&id=13608&format=png&color=000000" />
                            <img src="https://img.icons8.com/?size=100&id=13611&format=png&color=000000" />
                            <img src="https://img.icons8.com/?size=100&id=13610&format=png&color=000000" />
                            <img src="https://img.icons8.com/?size=100&id=Pb0c8A4rGpq1&format=png&color=000000" />
                          </div>

                          <p className="small mb-2">
                            <strong>Card type</strong>
                          </p>

                          <form className="mt-4">
                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeName"
                                className="form-control form-control-lg"
                                size="17"
                                placeholder="Cardholder's Name"
                                pattern="^[^0-9]*$"
                                required
                              />
                              <label className="form-label" htmlFor="typeName">
                                <strong>Cardholder's Name</strong>
                              </label>
                            </div>

                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeText"
                                className="form-control form-control-lg"
                                size="17"
                                placeholder="1234 5678 9012 3457"
                                minLength="19"
                                maxLength="19"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                pattern="^\d{4}(\s\d{4}){3}$"
                                required
                              />
                              <label className="form-label" htmlFor="typeText">
                                <strong>Card Number</strong>
                              </label>
                            </div>

                            <div className="row mb-4">
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="text"
                                    id="typeExp"
                                    className="form-control form-control-lg"
                                    placeholder="MM/YYYY"
                                    value={expiry}
                                    onChange={handleExpiryChange}
                                    size="7"
                                    minLength="7"
                                    maxLength="7"
                                    pattern="^(0[1-9]|1[0-2])\/(20)\d{2}$"
                                    required
                                  />
                                  <label className="form-label" htmlFor="typeExp">
                                    <strong>Expiration</strong>
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="text"
                                    id="typeCvv"
                                    className="form-control form-control-lg"
                                    placeholder="&#9679;&#9679;&#9679;"
                                    size="3"
                                    minLength="3"
                                    maxLength="3"
                                    pattern="^\d{3}$"
                                    required
                                  />
                                  <label className="form-label" htmlFor="typeCvv">
                                    <strong>CVV</strong>
                                  </label>
                                </div>
                              </div>
                            </div>

                            <hr className="my-4" />

                            <div className="d-flex justify-content-between mb-4">
                              <p className="mb-2">Total (Incl. taxes)</p>
                              <p className="mb-2">${totalPrice.toFixed(2)}</p>
                            </div>

                            <button
                              type="submit"
                              className="btn bg-white btn-block btn-lg text-info col-12 hover1"
                            >
                              <strong>Checkout</strong>
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ShoppingCart component to display the items in the shopping cart
const ShoppingCart = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div className="p-3 mb-3 shadow roundbg" key={index}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center col-4">
                <div>
                  <img
                    src={item.productImage}
                    className="img-fluid roundbg"
                    alt="Shopping item"
                    style={{ width: "65px" }}
                  />
                </div>
                <div className="ms-3">
                  <h5>{item.productName}</h5>
                  <p className="small mb-0">{item.productDescription}</p>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center col-3 text-center">
                <div style={{ width: "50px" }}>
                  <h5 className="fw-normal mb-0">{item.numberOfLicenses}</h5>
                </div>
                <div style={{ width: "80px" }}>
                  <h5 className="mb-0">${(item.productPrice * item.numberOfLicenses).toFixed(2)}</h5>
                </div>
                <a href="#!" style={{ color: "#cecece" }}>
                  <i className="fas fa-trash-alt"></i>
                </a>
              </div>
              <div className="col-2 my-auto">
                <button
                  type="button"
                  className="btn btn-danger hover shadow col-12 roundbg"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyerPayment;

//npm i bootstrap-icons
