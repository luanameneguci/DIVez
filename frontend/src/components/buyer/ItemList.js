import React from "react";
import Rating from "@mui/material/Rating";

const ItemStatus = ({ itemData, productVersion }) => {
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
      <div className="my-3 col-12 d-flex">
        <div className="col-6 d-flex align-items-center p-3 justify-content-between flex-column bg-white rounded shadow me-2">
          <div className="col-12 row">
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
                className="btn bg-info btn-block btn-lg text-white hover1"
              >
                <strong>Update</strong>
              </button>
            </div>
          </div>
        </div>
        <div className="col-6 d-flex align-items-center p-3 justify-content-between flex-column bg-white rounded shadow ms-2">
          <div className="col-12 row">
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
                className="btn bg-info btn-block btn-lg text-white hover1"
              >
                <strong>Update</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemList = ({ items, productVersion }) => {
  return (
    <div className="items-list d-flex flex-wrap justify-content-between">
      {items.map((item, index) => (
        <div className="col-12" key={index}>
          <ItemStatus itemData={item} productVersion={productVersion} />
        </div>
      ))}
    </div>
  );
};

export default ItemList;
