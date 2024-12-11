import React, { useState } from "react";
import "../../App.css";

const ShoppingCart = ({ items, onDelete }) => {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const handleDelete = async (idProductCart) => {
    try {
      const response = await fetch(`http://localhost:8080/productCart/delete/${idProductCart}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Show delete warning
        setShowDeleteWarning(true);
          window.location.reload();
      } else {
        console.error("Failed to delete product from cart");
      }
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

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
                <a href="#!" style={{ color: "#cecece" }} onClick={() => handleDelete(item.idProductCart)}>
                  <i className="fas fa-trash-alt"></i>
                </a>
              </div>
              <div className="col-2 my-auto">
                <button
                  type="button"
                  className="btn btn-danger hover shadow col-12 roundbg"
                  onClick={() => handleDelete(item.idProductCart)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {showDeleteWarning && ( alert('Product deleted successfully.')
      )}
    </div>
  );
};

export default ShoppingCart;
