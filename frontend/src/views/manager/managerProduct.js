import React, { useState, useEffect } from "react";
import "../../App.css";
import Rating from "@mui/material/Rating";
import { Link } from 'react-router-dom';
import axios from "axios";

const latestVersion = "1.3";

const BuyerProductItem = ({ userId }) => {
  const [idBuyer, setIdBuyer] = useState(null);
  const [productData, setProductData] = useState(null);
  const [licensesData, setLicensesData] = useState({ numeroTotal: 0, numeroAtivos: 0 });

  useEffect(() => {
    const fetchBuyerId = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/checkIdBuyer/${userId}`);
        setIdBuyer(response.data.idBuyer);
      } catch (error) {
        console.error('Error fetching idBuyer:', error);
      }
    };

    fetchBuyerId();
  }, [userId]);

  useEffect(() => {
    const fetchProductAndLicensesData = async () => {
      if (idBuyer !== null) {
        try {
          const response = await axios.get(`http://localhost:8080/licenses/user/${idBuyer}`);
          if (response.data.length > 0) {
            const product = response.data[0]; // Assuming we need only one product for now
            setProductData({
              nomeApp: product.nomeApp,
              photo: product.photo,
              price: product.price,
              Packages: product.Packages,
              Category: product.Category,
              ActiveInstall: product.ActiveInstall,
              Version: product.Version,
              Review: product.Review,
              description: product.description,
              id: product.id
            });

            // Fetch numeroAtivos
            const responseAtivos = await axios.get(`http://localhost:8080/licenses/status/${idBuyer}`);
            const numeroAtivos = responseAtivos.data.count; // Assuming count is the correct property

            // Fetch numeroTotal
            const responseTotal = await axios.get(`http://localhost:8080/licenses/count/${idBuyer}`);
            const numeroTotal = responseTotal.data.count; // Assuming count is the correct property

            setLicensesData({ numeroTotal, numeroAtivos });
          }
        } catch (error) {
          console.error('Error fetching product and licenses data:', error);
        }
      }
    };

    fetchProductAndLicensesData();
  }, [idBuyer]);

  const handleUpdateVersion = () => {
    if (productData) {
      const updatedProduct = { ...productData, Version: latestVersion };
      setProductData(updatedProduct);
      alert(`${updatedProduct.nomeApp} updated successfully`);
    }
  };

  return (
    <div className="bg-light w-100">
      <div className="container text-center pt-4">
        <div className="row">
          <div className="col-12">
            {productData ? (
              <ItemStatus
                productData={productData}
                licensesData={licensesData}
                handleUpdateVersion={handleUpdateVersion}
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemStatus = ({ productData, licensesData, handleUpdateVersion }) => {
  const percentage = (licensesData.numeroAtivos / licensesData.numeroTotal) * 100;

  return (
    <div>
      <div className="col-12 d-flex">
        <div className="col-2">
          <img src={productData.photo} alt={`${productData.nomeApp}`} className="mr-3" />
        </div>
        <div className="col-7 mt-3 justify-content-start">
          <h2 className="mb-0 text-start">
            <strong>{productData.nomeApp}</strong>
          </h2>
          <div className="col-6 d-flex justify-content-start">
            <Rating
              name="read-only"
              value={productData.Review}
              readOnly
              precision={0.5}
            />
          </div>
        </div>
      </div>
      <div className="my-3">
        <div className="container">
          <div className="row">
            <div className="col d-flex align-items-center p-3 justify-content-between flex-column bg-white roundbg shadow me-3">
              <div className="col-md-12 row">
                <div className="col-6 text-start">
                  <h5>
                    <strong>Latest version:</strong> {latestVersion}
                  </h5>
                  <h5>
                    <strong>Your version:</strong> {productData.Version}
                  </h5>
                </div>
                <div className="col-6 text-end mt-auto">
                  {latestVersion !== productData.Version ? (
                    <button
                      type="submit"
                      className="btn btn-block btn-lg text-info hover1"
                      style={{ backgroundColor: "#C8F2FE" }}
                      onClick={handleUpdateVersion}
                    >
                      <strong>Update</strong>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-block btn-lg text-success disabled"
                      disabled
                    >
                      <strong>Updated</strong>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col d-flex align-items-center p-3 justify-content-between flex-column bg-white roundbg shadow">
              <div className="col-md-12 row">
                <ProgressDiv
                  nome={productData.nomeApp}
                  numeroAtivos={licensesData.numeroAtivos}
                  numeroTotal={licensesData.numeroTotal}
                  percentage={percentage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col d-flex align-items-center justify-content-between flex-column bg-white roundbg shadow my-3">
        <div className="col-12 px-4 py-3">
          <h3 className=" text-start">Need any help with this product?</h3>
          <p className="text-start">
            Check our <Link className="text-info" to="/faq">FAQ</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

const ProgressDiv = ({ nome, numeroAtivos, numeroTotal, percentage }) => (
  <div className="mb-3">
    <div className="d-flex justify-content-between">
      <p>
        <strong>Installations</strong>
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
        {percentage.toFixed(0)}%
      </div>
    </div>
  </div>
);

export default BuyerProductItem;
