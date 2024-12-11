import React, { useState, useEffect } from "react";
import "../../App.css";
import Rating from "@mui/material/Rating";
import ManagersList from "../../components/buyer/ManagersList";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from 'react-router-dom';

const productVersion = 1.3;

const BuyerProductItem = ({ userId }) => {
  const { idProduct } = useParams();
  const [item, setItem] = useState(null);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    const idUser = userId;
    fetch(`http://localhost:8080/user/${idUser}/billings`)
      .then(response => response.json())
      .then(data => {
        const product = data.carts
          .flatMap(cart => cart.productCarts)
          .find(productCart => productCart.product.idProduct === parseInt(idProduct));

        if (product) {
          const itemData = {
            nomeApp: product.product.productName,
            photo: product.product.productImage,
            price: product.product.productPrice,
            Packages: "N/A",
            Category: `Category ${product.product.idCategory}`,
            ActiveInstall: product.product.productInstalls,
            Version: product.product.productVersion,
            Review: product.product.productRating,
            description: product.product.productDescription,
            id: product.product.idProduct,
            numeroTotal: product.numberOfLicenses,
            numeroAtivos: product.product.licenses.filter(
              license => license.idLicenseStatus === 1
            ).length
          };

          const itemsArray = createDataArraysItems([itemData]);
          const resultArray = createDataArrays([itemData]);
          const resultadoArray = calculatePercentages(resultArray);
          setItem(itemsArray[0]);
          setResultado(resultadoArray[0]);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, [idProduct]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-light w-100">
      <div className="container text-center pt-4">
        <div className="row">
          <div className="col-12">
            <ItemStatus itemData={item} resultado={resultado} />
          </div>
        </div>
      </div>
    </div>
  );
};

function createDataArraysItems(item) {
  let items = [];

  for (let i = 0; i < item.length; i++) {
    let subArray = [
      item[i].nomeApp,
      item[i].photo,
      item[i].price,
      item[i].Packages,
      item[i].Category,
      item[i].ActiveInstall,
      item[i].Version,
      item[i].Review,
      item[i].description,
      item[i].id,
      item[i].numeroTotal,
      item[i].numeroAtivos,
    ];
    items.push(subArray);
  }
  return items;
}

const ItemStatus = ({ itemData, resultado }) => {
  return (
    <div>
      <div className="col-12 d-flex">
        <div className="col-2">
          <img src={itemData[1]} alt={`${itemData[0]}`} className="mr-3" />
        </div>
        <div className="col-7 mt-3 justify-content-start">
          <h2 className="mb-0 text-start">
            <strong>{itemData[0]}</strong>
          </h2>
          <div className="col-6 d-flex justify-content-start">
            <Rating
              name="read-only"
              value={itemData[7]}
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
                    <strong>Product version:</strong> {productVersion}
                  </h5>
                  <h5>
                    <strong>Your version:</strong> {itemData[6]}
                  </h5>
                </div>
                <div className="col-6 text-end mt-auto">
                  <button
                    type="submit"
                    className="btn btn-block btn-lg text-info hover1"
                    style={{backgroundColor: "#C8F2FE"}}
                  >
                    <strong>Update</strong>
                  </button>
                </div>
              </div>
            </div>
            <div className="col d-flex align-items-center p-3 justify-content-between flex-column bg-white roundbg shadow">
              <div className="col-md-12 row">
                <ProgressDivs resultado={resultado} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col d-flex align-items-center justify-content-between flex-column bg-white roundbg shadow my-3">
        <div className="col-12 px-4 d-flex py-3 justify-content-between">
          <h2 className=" text-start">Managers</h2>
          <button
            type="submit"
            className="btn btn-block btn-lg text-info hover1"
            style={{backgroundColor: "#C8F2FE"}}
          >
            <strong>Add manager</strong>
          </button>
        </div>

        <ManagersList />
      </div>
      <div className="col d-flex align-items-center justify-content-between flex-column bg-white roundbg shadow my-3">
        <div className="col-12 px-4 py-3">
        <h3 className=" text-start">Need any help with this product?</h3>
        <p className="text-start">Check our <Link className="text-info" to="/faq">FAQ</Link>. </p>
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
        {percentage}%
      </div>
    </div>
  </div>
);

const ItemList = ({ items, resultado }) => {
  return (
    <div className="items-list d-flex flex-wrap justify-content-between">
      {items.map((item, index) => (
        <div className="col-12" key={index}>
          <ItemStatus itemData={item} resultado={resultado} />
        </div>
      ))}
    </div>
  );
};

const ProgressDivs = ({ resultado }) => {
  return (
    <div>
      <ProgressDiv
        nome={resultado[0]}
        numeroAtivos={resultado[2]}
        numeroTotal={resultado[1]}
        percentage={resultado[3]}
      />
    </div>
  );
};

function createDataArrays(data) {
  let result = [];

  for (let i = 0; i < data.length; i++) {
    let subArray = [data[i].nomeApp, data[i].numeroTotal, data[i].numeroAtivos];
    result.push(subArray);
  }

  return result;
}

function calculatePercentages(result) {
  let resultado = [];

  for (let i = 0; i < result.length; i++) {
    let item = result[i];
    let percentage = (item[2] / item[1]) * 100;
    let newItem = [...item, percentage.toFixed(0)];
    resultado.push(newItem);
  }

  return resultado;
}

export default BuyerProductItem;
