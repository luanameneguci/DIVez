import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressBox = ({ productId, handleShow }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch product details based on productId
                const response = await axios.get(`http://localhost:8080/license/${productId}`);
                const productData = response.data;

                // Set the product data to state
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        if (productId) {
            fetchData();
        }
    }, [productId]);

    const ProgressDiv = ({ product }) => {
        if (!product) return null;

        const { productName, installations } = product;
        const percentage = (installations / installations) * 100;

        return (
            <div className="mb-3">
                <div className="d-flex justify-content-between">
                    <p><strong>{productName}</strong></p>
                    <div className="d-flex">
                        <p>{installations} of {installations}</p>
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
                <div className="text-end mt-2">
                    <button
                        className="btn btn-outline-info hover m-2"
                        onClick={() => handleShow(productName)}
                    >
                        Add manager
                    </button>
                    <Link to='/faq' className="btn btn-outline-info hover m-2">Help</Link>
                    <button className="btn btn-outline-danger m-2">
                        Cancel Subscription
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="box-container bg-white col-auto roundbg d-flex shadow pb-3 shadow h-100">
            <div className="col-12">
                <span className="box-title d-flex justify-content-start pt-3 ps-3 pb-3">
                    <strong><h4>Product Details</h4></strong>
                </span>
                <div className="px-3">
                    <ProgressDiv product={product} />
                </div>
            </div>
        </div>
    );
};

export default ProgressBox;
