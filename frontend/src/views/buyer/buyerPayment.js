import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "../../components/buyer/ShoppingCart";
import axios from "axios";

const BuyerPayment = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [idCart, setIdCart] = useState(null);
  const [idUser, setIdUser] = useState(6); // Replace 6 with actual user ID if needed

  const handleDeleteFromCart = async (idProductCart) => {
    try {
      const response = await fetch(`http://localhost:8080/productCart/delete/${idProductCart}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchCartProducts(idCart);
      } else {
        console.error("Failed to delete product from cart");
      }
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

  const fetchCartProducts = async (cartId) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${cartId}/products`);
      const data = await response.json();
      setItems(data);
      console.log("Fetched items:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchHighestIdCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/cart/all/${idUser}`);
      const carts = response.data;
      if (carts && carts.length > 0) {
        const highestIdCart = carts.reduce((max, cart) => (cart.idCart > max ? cart.idCart : max), carts[0].idCart);
        setIdCart(highestIdCart);
        fetchCartProducts(highestIdCart);
      } else {
        console.error("No carts found for the user");
      }
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  };

  const createNewCart = async () => {
    try {
      const response = await axios.post("http://localhost:8080/cart/create", {
        idUser: idUser,
        cartPrice: 0,
      });
      const newCart = response.data;
      setIdCart(newCart.idCart);
      fetchCartProducts(newCart.idCart);
    } catch (error) {
      console.error("Error creating new cart:", error);
    }
  };

  const sumTotalQuantity = (items) => {
    return items.reduce((total, item) => total + item.numberOfLicenses, 0);
  };

  const totalQuantity = sumTotalQuantity(items);

  useEffect(() => {
    const totalPrice = items.reduce(
      (total, item) => total + item.productPrice * item.numberOfLicenses,
      0
    );
    setTotalPrice(totalPrice);
  }, [items]);

  useEffect(() => {
    fetchHighestIdCart();
  }, []);

  const handleCardNumberChange = (event) => {
    const inputWithoutSpaces = event.target.value.replace(/\s+/g, "");
    const formattedValue = inputWithoutSpaces.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (event) => {
    let formattedValue = event.target.value;
    if (formattedValue.length === 2 && !formattedValue.includes("/")) {
      formattedValue += "/";
    }
    setExpiry(formattedValue);
  };

  const handleCheckout = async (event) => {
    event.preventDefault();

    try {
      const billResponse = await axios.post("http://localhost:8080/billing/create", {
        idCart: idCart,
      });

      if (billResponse.status === 201) {
        console.log("Bill created successfully:", billResponse.data);

        const cartResponse = await axios.get(`http://localhost:8080/cart/${idCart}`);
        const idUser = cartResponse.data.idUser;

        console.log("Fetched idUser:", idUser);

        const licensesData = items.map((item) => ({
          numberOfLicenses: item.numberOfLicenses,
          idLicenseStatus: 2,
          licenseVersion: item.productVersion,
          idBill: billResponse.data.idBill,
          idUser: idUser,
          idProduct: item.idProduct,
        }));

        console.log("Sending licensesData:", licensesData);

        const licensesResponse = await axios.post("http://localhost:8080/licenses/create", licensesData);

        if (licensesResponse.status === 200) {
          console.log(`${licensesData.length} licenses created successfully.`);
        } else {
          console.error("Error creating licenses:", licensesResponse.statusText);
        }
      } else {
        console.error("Failed to create bill:", billResponse.statusText);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
    createNewCart();
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
                        <ShoppingCart items={items} onDelete={handleDeleteFromCart} />
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

                          <form className="mt-4" onSubmit={handleCheckout}>
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

export default BuyerPayment;
