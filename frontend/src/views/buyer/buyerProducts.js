import React, { useState, useEffect } from "react";
import "../../App.css";
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BuyerProductList = () => {
    const [lgShow, setLgShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [userData, setUserData] = useState(null); // State to store fetched user data
    const [productsData, setProductsData] = useState(null); // State to store fetched product data

    useEffect(() => {
        // Function to fetch user data based on idUser
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/user/6/billings'); // Replace 6 with dynamic idUser
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData(data); // Set fetched data into state
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        // Function to fetch product data
        const fetchProductsData = async () => {
            try {
                const response = await fetch('http://localhost:8080/product');
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setProductsData(data); // Set fetched data into state
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchUserData(); // Invoke the fetch function when component mounts
        fetchProductsData(); // Invoke the fetch function when component mounts
    }, []); // Empty dependency array ensures effect runs only once

    const handleShow = (productName) => {
        setSelectedProduct(productName);
        setLgShow(true);
    };

    const handleClose = () => {
        setLgShow(false);
        setSelectedProduct(null);
    };

    if (!userData || !productsData) {
        return <div>Loading...</div>; // Display a loading indicator while fetching data
    }

    // Map product IDs to their versions
    const productVersions = productsData.reduce((acc, product) => {
        acc[product.idProduct] = product.productVersion;
        return acc;
    }, {});

    // Transform userData to match your expected format
    const transformedData = userData.carts.flatMap(cart =>
        cart.productCarts.map(pc => {
            const activeLicenses = pc.product.licenses.filter(license => license.idLicenseStatus === 1).length;
            const productVersion = productVersions[pc.product.idProduct];
            const licenseStatus = pc.product.licenses.some(license => license.licenseVersion < productVersion)
                ? "Outdated"
                : "Updated";

            return {
                nome: pc.product.productName,
                numeroTotal: pc.product.licenses.length,
                numeroAtivos: activeLicenses,
                percentage: ((activeLicenses / pc.product.licenses.length) * 100).toFixed(0),
                status: licenseStatus,
            };
        })
    );

    return (
        <div className="dashboard-content bg-light w-100 h-100">
            <div className="d-flex justify-content-between p-2 mx-3">
                <h2 className="title my-2">Products</h2>
            </div>
            <BoxProgress props={transformedData} handleShow={handleShow} />
            <AddManagerModal
                show={lgShow}
                onHide={handleClose}
                productName={selectedProduct}
            />
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

const ProgressDiv = ({ nome, numeroAtivos, numeroTotal, percentage }) => (
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

const ProgressDivs = ({ resultado, handleShow }) => {
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
                    <div className="col-2 mx-2 d-flex ">
                        <h5 className="my-auto">{item.nome}</h5>
                    </div>
                    <div className="col-1 mx-2 d-flex">
                        <p className={`my-auto ${getStatusClass(item.status)}`}>{item.status}</p>
                    </div>
                    <div className="col-3 mx-2">
                        <ProgressDiv
                            key={index}
                            nome={item.nome}
                            numeroAtivos={item.numeroAtivos}
                            numeroTotal={item.numeroTotal}
                            percentage={item.percentage}
                        />
                    </div>
                    <div className="col-5 ms-auto text-end">
                        <button
                            className="col btn btn-outline-info hover m-2"
                            onClick={() => handleShow(item.nome)}
                        >
                            Add manager
                        </button>
                        <Link to='/faq' className="col btn btn-outline-info hover m-2">Help</Link>
                        <button className="col btn btn-outline-danger m-2">
                            Cancel Subscription
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const BoxProgress = ({ props, handleShow }) => {
    return (
        <div className="box-container bg-white col-auto roundbg d-flex shadow mx-4">
            <div className="col-12">
                <div className="col-12">
                    <ProgressDivs resultado={props} handleShow={handleShow} />
                </div>
            </div>
        </div>
    );
};

export default BuyerProductList;
