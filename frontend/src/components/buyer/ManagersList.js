import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';

function ManagersList() {
    // States for input filters
    const [nameFilter, setNameFilter] = useState('');
    const [nifFilter, setNifFilter] = useState('');
    const [mailFilter, setMailFilter] = useState('');
    const [productsFilter, setProductsFilter] = useState('');

    // States for managers and products
    const [managersList, setManagersList] = useState([]);
    const [productList, setProductList] = useState([]);

    // State for modal data and visibility
    const [modalData, setModalData] = useState(null);
    const [lgShow, setLgShow] = useState(false);

    useEffect(() => {
        // Fetch managers list from the URL
        axios.get('http://localhost:8080/userLicenses/6/managers')
            .then(response => {
                const managers = response.data.map(manager => {
                    return {
                        name: manager.managerName,
                        nif: manager.managerNif.toString(), // Convert NIF to string if necessary
                        email: manager.managerEmail,
                        products: manager.managedProducts.map(mp => mp.productName).join(', ')
                    };
                });
                setManagersList(managers);
            })
            .catch(error => console.error('Error fetching managers:', error));

        // Fetch all products associated with licenses for user ID 6
        axios.get('http://localhost:8080/licenses/user/6')
            .then(response => {
                const licenses = response.data;

                // Extract unique products from licenses
                const uniqueProducts = Array.from(new Set(licenses.map(license => license.product.productName)));

                // Map unique products to format suitable for react-select
                const products = uniqueProducts.map(productName => ({
                    label: productName,
                    value: productName // Assuming product name as value for simplicity
                }));

                setProductList(products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Function to filter rows based on input filters
    const filteredRows = managersList.filter(row =>
        row.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        row.nif.includes(nifFilter) &&
        row.email.toLowerCase().includes(mailFilter.toLowerCase()) &&
        row.products.toLowerCase().includes(productsFilter.toLowerCase())
    );

    // Function to show modal with selected manager details
    const handleShow = (row) => {
        setModalData(row.email);
        setLgShow(true);
    };

    // Function to close modal
    const handleClose = () => {
        setLgShow(false);
        setModalData(null);
    };

    return (
        <div className="container bg-white px-0 roundbg shadow h-100 pb-1">
            <table className='table text-start'>
                <thead className='text-white'>
                    <tr>
                        <th className="ps-3 py-2">Name
                            <input
                                className="form-control w-75"
                                type="text"
                                placeholder="Search"
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                            />
                        </th>
                        <th className="ps-3 py-2">NIF
                            <input
                                className="form-control w-75"
                                type="text"
                                placeholder="Search"
                                value={nifFilter}
                                onChange={(e) => setNifFilter(e.target.value)}
                            />
                        </th>
                        <th className="ps-3 py-2">Mail
                            <input
                                className="form-control w-75"
                                type="text"
                                placeholder="Search"
                                value={mailFilter}
                                onChange={(e) => setMailFilter(e.target.value)}
                            />
                        </th>
                        <th className="ps-3 py-2">Products
                            <input
                                className="form-control w-75"
                                type="text"
                                placeholder="Search"
                                value={productsFilter}
                                onChange={(e) => setProductsFilter(e.target.value)}
                            />
                        </th>
                        <th className="py-2 align-text-top text-center pt-2">Action</th>
                    </tr>
                </thead>
                <tbody className='text-start roundbg'>
                    {filteredRows.map((row, index) => (
                        <tr key={index}>
                            <td style={{ padding: '15px 0 15px 2%' }}>{row.name}</td>
                            <td style={{ padding: '15px 0 15px 2%' }}>{row.nif}</td>
                            <td style={{ padding: '15px 0 15px 2%' }}>{row.email}</td>
                            <td style={{ padding: '15px 0 15px 2%' }}>{row.products}</td>
                            <td className="d-flex justify-content-center">
                                <button onClick={() => handleShow(row)} className="btn btn-outline-info me-2">
                                    Add
                                </button>
                                <button className='btn btn-outline-danger'>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="manageremailinput" 
                                    placeholder="E-mail" 
                                    value={modalData || ''} 
                                    readOnly
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

export default ManagersList;
