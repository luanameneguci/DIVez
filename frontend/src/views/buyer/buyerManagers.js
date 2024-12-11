import React, { useState, useEffect } from 'react';
import '../../App.css';
import ManagersList from '../../components/buyer/ManagersList';
import Select from 'react-select';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const BuyerManagersList = ({ userId }) => {
    const [lgShow, setLgShow] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [email, setEmail] = useState('');
    const idUser = userId;
    const buyerId = idUser; 
    const [productList, setProductList] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserLicenses = async () => {
            try {
                const response = await fetch(`http://localhost:8080/licenses/user/${idUser}`);
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

    const handleShow = (manager = null) => {
        setModalData(manager);
        setEmail(manager ? manager.email : '');
        setSelectedProducts([]);
        setLgShow(true);
    };

    const handleClose = () => {
        setLgShow(false);
        setModalData(null);
        setEmail('');
        setSelectedProducts([]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // First update the buyerId
            await axios.post('http://localhost:8080/user/updateBuyerId', {
                email,
                buyerId
            });

            // Then create the user licenses
            const productIds = selectedProducts.map(product => product.value);

            for (let productId of productIds) {
                await axios.post('http://localhost:8080/userLicenses/create', {
                    email,
                    productId
                });
            }

            handleClose();
            alert('Manager added and UserLicense created successfully!');
        } catch (error) {
            console.error('Error creating Manager or UserLicense:', error);
            alert('Failed to create Manager or UserLicense');
        }
    };

    return (
        <div className="container bg-light w-100 h-100">
            <div className='d-flex justify-content-between p-2 mx-4'>
                <h4 className="title my-2 mx-3">Managers</h4>
                <button
                    onClick={() => handleShow()}
                    className="btn btn-block btn-lg text-info hover1 mx-3"
                    style={{ backgroundColor: "#C8F2FE" }}
                >
                    <strong>Add Manager</strong>
                </button>
            </div>
            <ManagersList 
                onAddManager={handleShow}
            />
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
                    <form onSubmit={handleSubmit}>
                        <div className="col">
                            <div className="form-group mb-3">
                                <label htmlFor="manageremailinput">E-mail</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="manageremailinput" 
                                    placeholder="E-mail" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="productsinput">Add Products</label>
                                <Select
                                    id="productsinput"
                                    options={productList}
                                    isMulti
                                    placeholder="Choose Products..."
                                    className="form-control p-0"
                                    onChange={setSelectedProducts}
                                    value={selectedProducts}
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
