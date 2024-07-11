import React, { useState, useEffect } from "react";
import "../../App.css";
import Rating from "@mui/material/Rating";
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const latestVersion = "1.3";

let initialItemsDataArray = [
  {
    nomeApp: "Adobe Photoshop",
    photo: "https://img.icons8.com/?size=100&id=13677&format=png&color=000000",
    price: 4.99,
    Packages: "Adobe Essencials",
    Category: "Photography",
    ActiveInstall: 1000000,
    Version: "1.2.3",
    Review: 3.4,
    description:
      "A fitness tracking app to help you achieve your health goals.",
    id: 1,
    numeroTotal: 1000,
    numeroAtivos: 750,
  },
];

const managersList = [
  ["Luana Meneguci", "123456789", "luanameneguci@gmail.com", "Client"],
  ["Andre Pascoal", "123456789", "andrepascoal@gmail.com", "Client"],
  ["Luana Meneguci", "123456789", "luanameneguci@gmail.com", "Client"],
  ["Luana Meneguci", "123456789", "luanameneguci@gmail.com", "Client"],
  ["Luana Meneguci", "123456789", "luanameneguci@gmail.com", "Client"],
  ["Luana Meneguci", "321321321", "luanameneguci@gmail.com", "Manager"],
];

const ManagerProductItem = () => {
  const [itemsDataArray, setItemsDataArray] = useState(initialItemsDataArray);
  const [resultado, setResultado] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    let resultArray = createDataArrays(itemsDataArray);
    let resultadoArray = calculatePercentages(resultArray);
    setResultado(resultadoArray);
  }, [itemsDataArray]);

  const openModal = (productName) => {
    setProductName(productName);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleUpdateVersion = (index) => {
    // Create a copy of the current itemsDataArray
    let updatedItems = [...itemsDataArray];
    // Update the Version to latestVersion for the item at index
    updatedItems[index].Version = latestVersion;
    // Update state with the new itemsDataArray
    alert(`${updatedItems[index].nomeApp} updated successfully`); 
    setItemsDataArray(updatedItems);
  };

  return (
    <div className="bg-light w-100">
      <div className="container text-center pt-4">
        <div className="row">
          <div className="col-12">
            <ItemList itemsDataArray={itemsDataArray} resultado={resultado} openModal={openModal} handleUpdateVersion={handleUpdateVersion} />
          </div>
        </div>
      </div>

      <AddManagerModal show={showModal} onHide={closeModal} productName={productName} />
    </div>
  );
};

const AddManagerModal = ({ show, onHide, productName }) => (
  <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="addmanager"
      style={{ padding: '10px' }}
  >
      <Modal.Header closeButton>
          <Modal.Title>Add Manager</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <form>
              <div className="col">
                  <div className="form-group mb-3">
                      <label htmlFor="productinput">Product</label>
                      <input
                          type="text"
                          className="form-control"
                          id="productinput"
                          value={productName || ''}
                          readOnly
                      />
                  </div>
                  <div className="form-group mb-3">
                      <label htmlFor="manageremailinput">E-mail</label>
                      <input type="text" className="form-control" id="manageremailinput" placeholder="E-mail" />
                  </div>
              </div>
              <button type="submit" className="btn btn-info text-white">Add</button>
          </form>
      </Modal.Body>
  </Modal>
);


const ItemStatus = ({ itemData, resultado, openModal, handleUpdateVersion }) => {
  return (
    <div>
      <div className="col-12 d-flex">
        <div className="col-2">
          <img src={itemData.photo} alt={`${itemData.nomeApp}`} className="mr-3" />
        </div>
        <div className="col-7 mt-3 justify-content-start">
          <h2 className="mb-0 text-start">
            <strong>{itemData.nomeApp}</strong>
          </h2>
          <div className="col-6 d-flex justify-content-start">
            <Rating
              name="read-only"
              value={itemData.Review}
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
                    <strong>Your version:</strong> {itemData.Version}
                  </h5>
                </div>
                <div className="col-6 text-end mt-auto">
                  {latestVersion !== itemData.Version ? (
                    <button
                      type="submit"
                      className="btn btn-block btn-lg text-info hover1"
                      style={{ backgroundColor: "#C8F2FE" }}
                      onClick={() => handleUpdateVersion(itemData.id - 1)} // Assuming id is unique and starts from 1
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
                <ProgressDivs resultado={resultado} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col d-flex align-items-center justify-content-between flex-column bg-white roundbg shadow my-3">
        <div className="col-12 px-4 py-3">
          <h3 className=" text-start">Need any  help with this product?</h3>
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

const ItemList = ({ itemsDataArray, resultado, openModal, handleUpdateVersion }) => {
  return (
    <div className="items-list d-flex flex-wrap justify-content-between">
      {itemsDataArray.map((item, index) => (
        <div className="col-12" key={index}>
          <ItemStatus itemData={item} resultado={resultado} openModal={openModal} handleUpdateVersion={handleUpdateVersion} />
        </div>
      ))}
    </div>
  );
};

const ProgressDivs = ({ resultado }) => {
  return (
    <div>
      {resultado.map((item, index) => (
        <ProgressDiv
          key={index}
          nome={item[0]}
          numeroAtivos={item[2]}
          numeroTotal={item[1]}
          percentage={item[3]}
        />
      ))}
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

export default ManagerProductItem;
