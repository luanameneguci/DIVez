import React, { useEffect, useState } from "react";
import "../../App.css";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

const BuyerShop = ({ userId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lgShow, setLgShow] = useState(false);
  const [budgetShow, setBudgetShow] = useState(false);
  const [numberOfLicenses, setNumberOfLicenses] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState("");
  const idUser = userId;

  useEffect(() => {
    fetch("http://localhost:8080/product")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        const transformedData = data.map((item) => ({
          idProduct: item.idProduct,
          productName: item.productName,
          image: item.productImage,
          productPrice: item.productPrice,
          package: "Some Package",
          category: "Some Category",
          installations: item.productInstalls,
          version: item.productVersion,
          review: 4.5,
          description: item.productDescription,
        }));
        setItems(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      });
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/budget/status1/user/${idUser}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch budgets");
      }
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const handleAddToCart = async (idUser, idProduct, numberOfLicenses) => {
    try {
      const response = await fetch(
        "http://localhost:8080/productCart/add-to-cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idUser: idUser,
            idProduct: idProduct,
            numberOfLicenses: numberOfLicenses,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }
      const data = await response.json();
      console.log("Product added to cart:", data);
      setLgShow(false);
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  const handleClickAddToCart = () => {
    const selectedProduct = items.find(
      (item) => item.idProduct === selectedProductId
    );
    if (selectedProduct) {
      handleAddToCart(idUser, selectedProduct.idProduct, numberOfLicenses);
    }
  };

  const handleClose = () => {
    setLgShow(false);
    setSelectedProductId(null);
  };

  const handleShow = (idProduct) => {
    setSelectedProductId(idProduct);
    setLgShow(true);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setNumberOfLicenses(parseInt(value));
  };

  const handleShowBudgets = (idProduct) => {
    setSelectedProductId(idProduct);
    fetchBudgets();
    setBudgetShow(true);
  };

  const handleSelectBudget = async () => {
    console.log("Selected Budget ID:", selectedBudgetId);
    console.log("Selected Product ID:", selectedProductId);
    console.log("Number of Licenses:", numberOfLicenses);

    try {
      const response = await fetch(
        `http://localhost:8080/budgetProduct/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idUser: idUser,
            idProduct: selectedProductId,
            idBudget: selectedBudgetId,
            numberOfLicenses: numberOfLicenses,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add product to budget");
      }
      const data = await response.json();
      console.log("Product added to budget:", data);
      setBudgetShow(false); // Close the budget modal after success
    } catch (error) {
      console.error("Error adding product to budget:", error.message);
    }
  };

  const ItemStatus = ({ itemData }) => {
    return (
      <div className="my-3 m-3 shadow roundbg hover">
        <div className="col-12 d-flex align-items-center p-3 justify-content-between flex-column bg-white roundbg">
          <div className="col-12 row">
            <div className="col-2 thumb-img">
              <Link to={"/shop/" + itemData.idProduct} className="text-black">
                <img
                  src={itemData.image}
                  alt={itemData.productName}
                  className="mr-3"
                />
              </Link>
            </div>
            <div className="col-10">
              <div className="col-12 row ms-2">
                <div className="col-8 mt-3 d-flex justify-content-start">
                  <p className="mb-0">
                    <strong>{itemData.productName}</strong>
                  </p>
                </div>
                <div className="col-4 mb-2 mt-3 d-flex justify-content-end">
                  <div>
                    <button
                      onClick={() => handleShow(itemData.idProduct)}
                      className="border-none bg-white"
                      style={{ backgroundColor: "#C8F2FE" }}
                    >
                      <img
                        src="https://img.icons8.com/?size=100&id=CE7rP-35_XQR&format=png&color=000000"
                        style={{ height: 30 + "px" }}
                        alt="Checkout"
                      />
                    </button>
                    <button
                      onClick={() => handleShowBudgets(itemData.idProduct)}
                      className="border-none bg-white"
                    >
                      <img
                        src="https://img.icons8.com/?size=100&id=nwhUUqONScaC&format=png&color=000000"
                        style={{ height: 30 + "px" }}
                        alt="Budget"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 row d-flex justify-content-end ms-2">
                <div className="col-6 d-flex justify-content-start">
                  <Rating
                    name="read-only"
                    value={itemData.review}
                    readOnly
                    precision={0.5}
                  />
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <p className="mb-0">{itemData.productPrice}/ month</p>
                </div>
              </div>
            </div>
            <div className="col-12 my-3 d-flex justify-content-start">
              <p
                className="mb-0"
                style={{ minHeight: 48 + "px", textAlign: "justify" }}
              >
                {itemData.description}
              </p>
            </div>
          </div>
          <div className="col-12 row my-3 ">
            <div className="col-6 d-flex justify-content-start">
              <p className="mb-0">
                <strong>Packages: </strong>
                {itemData.package}
              </p>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <p className="mb-0">
                <strong>Category: </strong>
                {itemData.category}
              </p>
            </div>
          </div>
          <div className="col-12 row">
            <div className="col-6 d-flex justify-content-start">
              <p className="mb-0">
                {itemData.installations} active Installations
              </p>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <p className="mb-0">
                <strong>Version: </strong>
                {itemData.version}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ItemList = ({ items }) => {
    return (
      <div className="items-list d-flex flex-wrap justify-content-between">
        {items.map((item) => (
          <div className="col-6" key={item.idProduct}>
            <ItemStatus itemData={item} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-content bg-light w-100">
      <h4 className="title mx-4 px-4 py-3">Shop</h4>
      <div className="container text-center py-4">
        <div className="row">
          <div className="col-12">
            <ItemList items={items} />
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        aria-labelledby="addproduct"
        style={{ padding: "10px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add product to cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="col">
              <div className="form-group mb-3">
                <label htmlFor="numberOfLicensesInput">
                  Number of Licenses
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="numberOfLicensesInput"
                  placeholder="Enter number of licenses"
                  value={numberOfLicenses}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-info text-white"
              onClick={handleClickAddToCart}
            >
              Add to Cart
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={budgetShow}
        onHide={() => setBudgetShow(false)}
        aria-labelledby="addToBudget"
        style={{ padding: "10px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Budget and Licenses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group mb-3">
              <label htmlFor="budgetSelect">Select Budget</label>
              <select
                id="budgetSelect"
                className="form-control"
                value={selectedBudgetId}
                onChange={(e) => setSelectedBudgetId(e.target.value)}
              >
                <option value="">Select a budget</option>
                {budgets.map((budget) => (
                  <option key={budget.idBudget} value={budget.idBudget}>
                    {`Budget# ${budget.idBudget}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="budgetNumberOfLicenses">Number of Licenses</label>
              <input
                type="number"
                className="form-control"
                id="budgetNumberOfLicenses"
                placeholder="Enter number of licenses"
                value={numberOfLicenses}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-info text-white"
              onClick={handleSelectBudget}
            >
              Add to Budget
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BuyerShop;
