import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";

const ShopItem = () => {
  const { idProduct } = useParams(); // Extract idProduct from URL params
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/product/${idProduct}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setItem({
          productName: data.productName,
          image: data.image,
          productPrice: data.productPrice,
          package: "Some Package", // Placeholder
          category: "Some Category", // Placeholder
          installations: data.installations,
          version: data.productVersion,
          review: 4.5, // Placeholder for Review
          description: data.productDescript,
        });
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };
  
    fetchProduct();
  }, [idProduct]); // Depend on idProduct to refetch when URL changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="item-details bg-light w-100">
      <h4 className="title mx-4 px-4 py-3">{item.productName}</h4>
      <div className="container text-center py-4">
        <div className="row">
          <div className="col-12">
            <div className="my-3 m-3 shadow roundbg">
              <div className="col-12 d-flex align-items-center p-3 justify-content-between flex-column bg-white roundbg">
                <div className="col-12 row">
                  <div className="col-2 thumb-img">
                    <img src={item.image} alt={`${item.productName}`} className="mr-3" />
                  </div>
                  <div className="col-10">
                    <div className="col-12 row ms-2">
                      <div className="col-8 mt-3 d-flex justify-content-start">
                        <p className="mb-0">
                          <strong>{item.productName}</strong>
                        </p>
                      </div>
                      <div className="col-4 mb-2 mt-3 d-flex justify-content-end">
                        {/* Placeholder icons */}
                        <div>
                          <img
                            className="me-2"
                            src="https://img.icons8.com/?size=100&id=CE7rP-35_XQR&format=png&color=000000"
                            style={{ height: 30 + "px" }}
                            alt="Icon 1"
                          />
                          <img
                            src="https://img.icons8.com/?size=100&id=nwhUUqONScaC&format=png&color=000000"
                            style={{ height: 30 + "px" }}
                            alt="Icon 2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 row d-flex justify-content-end ms-2">
                      <div className="col-6 d-flex justify-content-start">
                        <Rating
                          name="read-only"
                          value={item.review}
                          readOnly
                          precision={0.5}
                        />
                      </div>
                      <div className="col-6 d-flex justify-content-end">
                        <p className="mb-0">{item.productPrice}/ month</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 my-3 d-flex justify-content-start">
                    <p className="mb-0" style={{ minHeight: 48 + "px", textAlign: "justify" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="col-12 row my-3 ">
                  <div className="col-6 d-flex justify-content-start">
                    <p className="mb-0">
                      <strong>Packages: </strong>
                      {item.package}
                    </p>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <p className="mb-0">
                      <strong>Category: </strong>
                      {item.category}
                    </p>
                  </div>
                </div>
                <div className="col-12 row">
                  <div className="col-6 d-flex justify-content-start">
                    <p className="mb-0">{item.installations} active Installations</p>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <p className="mb-0">
                      <strong>Version: </strong>
                      {item.version}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
