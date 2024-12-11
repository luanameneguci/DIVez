import React, { useState, useEffect } from "react";
import "../../App.css";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";

const BuyerProductList = ({ userId }) => {
  const [lgShow, setLgShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userData, setUserData] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [productList, setProductList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [emailInput, setEmailInput] = useState("");
  const idUser = userId;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/${idUser}/billings`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchProductsData = async () => {
      try {
        const response = await fetch("http://localhost:8080/product");
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProductsData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchProductList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/licenses/user/${idUser}`
        );
        const licenses = response.data;
        const uniqueProducts = Array.from(
          new Set(
            licenses.map((license) => ({
              id: license.product.idProduct,
              name: license.product.productName,
            }))
          )
        );
        const products = uniqueProducts.map((product) => ({
          label: product.name,
          value: product.id,
        }));
        setProductList(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchUserData();
    fetchProductsData();
    fetchProductList();
  }, []);

  const handleShow = (productId) => {
    setSelectedProduct(productId);
    setLgShow(true);
  };

  const handleClose = () => {
    setLgShow(false);
    setSelectedProduct(null);
    setModalData(null);
    setSelectedProducts([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const email = emailInput;
      const productId = selectedProduct;

      console.log("Email:", email);
      console.log("Product ID:", productId);

      const response = await axios.post(
        "http://localhost:8080/userLicenses/create",
        {
          email,
          productId,
        }
      );
      console.log("UserLicense created:", response.data);

      await axios.post("http://localhost:8080/user/updateBuyerId", {
        email,
        buyerId: idUser,
      });

      handleClose();
      alert("UserLicense created successfully!");
    } catch (error) {
      console.error("Failed to create UserLicense:", error);
      alert("Failed to create UserLicense");
    }
  };

  const handleCancelSubscription = async (productId, productName) => {
    if (window.confirm(`Are you sure you want to cancel subscription for ${productName}?`)) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/userLicenses/delete`,
          {
            data: { idUser, idProduct: productId },  // Ensure idUser and idProduct are correctly passed
          }
        );
        console.log("Subscription canceled:", response.data);
        alert("Subscription canceled successfully!");
        // Implement logic to update UI or fetch data again after cancellation
      } catch (error) {
        console.error("Failed to cancel subscription:", error);
        alert("Failed to cancel subscription");
      }
    }
  };

  if (!userData || !productsData) {
    return <div>Loading...</div>;
  }

  const productVersions = productsData.reduce((acc, product) => {
    acc[product.idProduct] = product.productVersion;
    return acc;
  }, {});

  const transformedData = userData.carts.flatMap((cart) =>
    cart.productCarts.map((pc) => {
      const activeLicenses = pc.product.licenses.filter(
        (license) => license.idLicenseStatus === 1
      ).length;
      const productVersion = productVersions[pc.product.idProduct];
      const licenseStatus = pc.product.licenses.some(
        (license) => license.licenseVersion < productVersion
      )
        ? "Outdated"
        : "Updated";

      return {
        idProduct: pc.product.idProduct,
        nome: pc.product.productName,
        numeroTotal: pc.product.licenses.length,
        numeroAtivos: activeLicenses,
        percentage: (
          (activeLicenses / pc.product.licenses.length) *
          100
        ).toFixed(0),
        status: licenseStatus,
      };
    })
  );

  return (
    <div className="dashboard-content bg-light w-100 h-100">
      <div className="d-flex justify-content-between p-2 mx-3">
        <h2 className="title my-2">Products</h2>
      </div>
      <BoxProgress props={transformedData} handleShow={handleShow} handleCancelSubscription={handleCancelSubscription} />
      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        aria-labelledby="addmanager"
        style={{ padding: "10px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="col">
              <div className="form-group mb-3">
                <label htmlFor="manageremailinput">E-mail</label>
                <input
                  type="text"
                  className="form-control"
                  id="manageremailinput"
                  placeholder="E-mail"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
              <div className="col">
                <div className="form-group mb-3">
                  <label htmlFor="productinput">Product</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productinput"
                    value={selectedProduct || ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-info text-white">
              Add
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const ProgressDiv = ({ idProduct, nome, numeroAtivos, numeroTotal, percentage }) => (
  <div className="mb-3">
    <div className="d-flex justify-content-between">
      <p>
        <strong>{nome}</strong>
      </p>
      <div className="d-flex">
        <p>
          {numeroAtivos} of {numeroTotal}
        </p>
      </div>
    </div>
    <div className="progress">
      <div
        className="progress-bar bg-info"
        role="progressbar"
        style={{ width: `${percentage}%` }}
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {percentage}%
      </div>
    </div>
  </div>
);

const ProgressDivs = ({ resultado, handleShow, handleCancelSubscription }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Outdated":
        return "#EB5757";
      case "Updated":
        return "#00B69B";
      default:
        return "";
    }
  };

  return (
    <div className="col-12">
      <div className="w-100 d-flex p-3 border-bottom">
        <div className="col-2 mx-2">
          <h5>Name</h5>
        </div>
        <div className="col-1 mx-2">
          <h5>Status</h5>
        </div>
        <div className="col-3 mx-2">
          <h5>Installs</h5>
        </div>
        <div className="col-4 mx-2"></div>
      </div>
      {resultado.map((item, index) => (
        <div className="d-flex col-12 p-3 border-bottom" key={index}>
          <div className="col-2 mx-2 d-flex">
            <Link to={`/productitem/${item.idProduct}`}>
              <h5 className="my-auto">{item.nome}</h5>
            </Link>
          </div>
          <div className="col-1 mx-2 d-flex">
            <p className={`my-auto ${getStatusClass(item.status)}`}>
              {item.status}
            </p>
          </div>
          <div className="col-3 mx-2">
            <ProgressDiv
              key={index}
              idProduct={item.idProduct}
              nome={item.nome}
              numeroAtivos={item.numeroAtivos}
              numeroTotal={item.numeroTotal}
              percentage={item.percentage}
            />
          </div>
          <div className="col-5 ms-auto text-end">
            <button
              className="col btn btn-outline-info hover m-2"
              onClick={() => handleShow(item.idProduct)}
            >
              Add manager
            </button>
            <Link to="/faq" className="col btn btn-outline-info hover m-2">
              Help
            </Link>
            <button
              className="col btn btn-outline-danger m-2"
              onClick={() => handleCancelSubscription(item.idProduct, item.nome)}
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const BoxProgress = ({ props, handleShow, handleCancelSubscription }) => {
  return (
    <div className="box-container bg-white col-auto roundbg d-flex shadow mx-4">
      <div className="col-12">
        <div className="col-12">
          <ProgressDivs resultado={props} handleShow={handleShow} handleCancelSubscription={handleCancelSubscription} />
        </div>
      </div>
    </div>
  );
};

export default BuyerProductList;
