import React, { useState, useEffect } from 'react';
import '../../App.css';
import ManagersList from '../../components/buyer/ManagersList';
import Select from 'react-select';
import { Modal } from 'react-bootstrap';

const BuyerManagersList = () => {
    const [lgShow, setLgShow] = useState(false);
    const [modal, setModal] = useState(null);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserLicenses = async () => {
            try {
                const response = await fetch('http://localhost:8080/licenses/user/6');
                if (!response.ok) {
                    throw new Error('Failed to fetch user licenses');
                }
                const data = await response.json();
                
                // Extract unique products from licenses
                const uniqueProducts = Array.from(new Set(data.map(license => license.product.idProduct)));
                
                // Fetch detailed product information for each unique product ID
                const productRequests = uniqueProducts.map(productId => (
                    fetch(`http://localhost:8080/product/${productId}`)
                        .then(response => response.json())
                ));

                // Wait for all product requests to complete
                const productsData = await Promise.all(productRequests);

                // Format products for react-select
                const formattedProducts = productsData.map(product => ({
                    value: product.idProduct,
                    label: product.productName
                }));

                setProductList(formattedProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user licenses:', error);
                setLoading(false);
            }
        };

        fetchUserLicenses();
    }, []);

    const handleShow = () => {
        setLgShow(true);
    };

    const handleClose = () => {
        setLgShow(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container bg-light w-100 h-100">
            <div className='d-flex justify-content-between p-2 mx-4'>
                <h4 className="title my-2 mx-3">Managers</h4>
                <button
                    onClick={handleShow}
                    className="btn btn-block btn-lg text-info hover1 mx-3"
                    style={{ backgroundColor: "#C8F2FE" }}
                >
                    <strong>Add Manager</strong>
                </button>
            </div>
            <ManagersList />
            <Modal
                size="lg"
                show={lgShow}
                onHide={handleClose}
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
                                <label htmlFor="manageremailinput">E-mail</label>
                                <input type="text" className="form-control" id="manageremailinput" placeholder="E-mail" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="packagesinput">Add Products</label>
                                <Select
                                    id="productsinput"
                                    options={productList}
                                    isMulti
                                    placeholder="Choose Products..."
                                    className="form-control p-0"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-info text-white">Add</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default BuyerManagersList;
