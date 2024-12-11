import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';

function ManagersList() {
    const [nameFilter, setNameFilter] = useState('');
    const [nifFilter, setNifFilter] = useState('');
    const [mailFilter, setMailFilter] = useState('');
    const [productsFilter, setProductsFilter] = useState('');
    const [managersList, setManagersList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [lgShow, setLgShow] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const idUser = 6; // Set idUser to 6

    useEffect(() => {
        axios.get(`http://localhost:8080/userLicenses/${idUser}/managers`)
            .then(response => {
                const managers = response.data.map(manager => {
                    return {
                        id: manager.idUser,
                        name: manager.managerName,
                        nif: manager.managerNif.toString(),
                        email: manager.managerEmail,
                        products: manager.managedProducts.map(mp => mp.productName).join(', ')
                    };
                });
                setManagersList(managers);
            })
            .catch(error => console.error('Error fetching managers:', error));

        axios.get(`http://localhost:8080/licenses/user/${idUser}`)
            .then(response => {
                const licenses = response.data;
                const uniqueProducts = Array.from(new Set(licenses.map(license => ({
                    id: license.product.idProduct,
                    name: license.product.productName
                }))));
                const products = uniqueProducts.map(product => ({
                    label: product.name,
                    value: product.id
                }));
                setProductList(products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const filteredRows = managersList.filter(row =>
        row.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        row.nif.includes(nifFilter) &&
        row.email.toLowerCase().includes(mailFilter.toLowerCase()) &&
        row.products.toLowerCase().includes(productsFilter.toLowerCase())
    );

    const handleShow = (row) => {
        setModalData(row);
        setLgShow(true);
    };

    const handleClose = () => {
        setLgShow(false);
        setModalData(null);
        setSelectedProducts([]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const email = modalData.email;
            const productIds = selectedProducts.map(product => product.value);

            for (let productId of productIds) {
                await axios.post(`http://localhost:8080/userLicenses/create`, {
                    email,
                    productId
                });
            }

            handleClose();
            alert('UserLicense created successfully!');
        } catch (error) {
            console.error('Error creating UserLicense:', error);
            alert('Failed to create UserLicense');
        }
    };

    const handleDelete = async (email) => {
        try {
            await axios.delete(`http://localhost:8080/userLicenses/delete`, {
                data: { email }
            });

            await axios.post(`http://localhost:8080/user/updateBuyerId`, {
                email,
                buyerId: null
            });

            console.log('Request payload:', { email, idBuyer: null });

            alert('User licenses deleted and idBuyer updated successfully!');

            // Refresh the managers list after deletion
            const response = await axios.get(`http://localhost:8080/userLicenses/${idUser}/managers`);
            const managers = response.data.map(manager => {
                return {
                    id: manager.idUser,
                    name: manager.managerName,
                    nif: manager.managerNif.toString(),
                    email: manager.managerEmail,
                    products: manager.managedProducts.map(mp => mp.productName).join(', ')
                };
            });
            setManagersList(managers);
        } catch (error) {
            console.error('Error deleting user licenses or updating idBuyer:', error);
            alert('Failed to delete user licenses or update idBuyer');
        }
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
                                <button onClick={() => handleDelete(row.email)} className='btn btn-outline-danger'>
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
                    <form onSubmit={handleSubmit}>
                        <div className="col">
                            <div className="form-group mb-3">
                                <label htmlFor="manageremailinput">E-mail</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="manageremailinput" 
                                    placeholder="E-mail" 
                                    value={modalData ? modalData.email : ''} 
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

export default ManagersList;
