import React, { useEffect, useState } from "react";
import "../../App.css";
import Rating from "@mui/material/Rating";
import { Link } from 'react-router-dom';

const BuyerShop = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/product')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        const transformedData = data.map(item => ({
          idProduct: item.idProduct,
          productName: item.productName,
          image: item.image,
          productPrice: item.productPrice,
          package: "Some Package", // Placeholder
          category: "Some Category", // Placeholder
          installations: item.installations,
          version: item.productVersion,
          review: 4.5, // Placeholder for Review
          description: item.productDescript,
        }));
        setItems(transformedData);
        setLoading(false); // Set loading to false after successful fetch
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false); // Set loading to false on error
      });
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

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
    </div>
  );
};

const ItemStatus = ({ itemData }) => {
  return (
    <div className="my-3 m-3 shadow roundbg hover">
      <div className="col-12 d-flex align-items-center p-3 justify-content-between flex-column bg-white roundbg">
        <div className="col-12 row">
          <div className="col-2 thumb-img">
            <Link to={"/shop/" + itemData.idProduct} className="text-black">
              <img src={itemData.image} alt={itemData.productName} className="mr-3" />
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
                  <Link to="/checkout" className="text-black">
                    <img
                      className="me-2"
                      src="https://img.icons8.com/?size=100&id=CE7rP-35_XQR&format=png&color=000000"
                      style={{ height: 30 + "px" }}
                      alt="Checkout"
                    />
                  </Link>
                  <Link to={"/shop/" + itemData.id} className="text-black">
                    <img
                      src="https://img.icons8.com/?size=100&id=nwhUUqONScaC&format=png&color=000000"
                      style={{ height: 30 + "px" }}
                      alt="Detailed View"
                    />
                  </Link>
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
            <p className="mb-0" style={{ minHeight: 48 + "px", textAlign: "justify" }}>
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
            <p className="mb-0">{itemData.installations} active Installations</p>
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
      {items.map(item => (
        <div className="col-6" key={item.id}>
          <ItemStatus itemData={item} />
        </div>
      ))}
    </div>
  );
};

export default BuyerShop;
