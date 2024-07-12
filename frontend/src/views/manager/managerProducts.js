import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManagerProductList = ({ userId }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [idBuyer, setIdBuyer] = useState(null);
    const [managedProducts, setManagedProducts] = useState([]);

    useEffect(() => {
        const fetchBuyerId = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/checkIdBuyer/${userId}`);
                setIdBuyer(response.data.idBuyer);
            } catch (error) {
                console.error('Error fetching idBuyer:', error);
            }
        };

        fetchBuyerId();
    }, [userId]);

    useEffect(() => {
        const fetchManagedProducts = async () => {
            try {
                if (!idBuyer) return;

                const response = await axios.get(`http://localhost:8080/userLicenses/${idBuyer}/managers`);
                const managers = response.data;

                const allManagedProducts = managers.reduce((acc, manager) => {
                    return [...acc, ...manager.managedProducts];
                }, []);

                const uniqueProducts = [];
                const productIdSet = new Set();

                allManagedProducts.forEach(product => {
                    if (!productIdSet.has(product.productId)) {
                        productIdSet.add(product.productId);
                        uniqueProducts.push(product);
                    }
                });

                setManagedProducts(uniqueProducts);
            } catch (error) {
                console.error('Error fetching managed products:', error);
            }
        };

        fetchManagedProducts();
    }, [idBuyer]);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = managedProducts.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleUpdate = (productName) => {
        alert(`${productName} updated successfully`);
    };

    return (
        <div className="dashboard-content bg-light w-100 h-100">
            <div className="d-flex justify-content-between p-2 mx-3">
                <h2 className="title my-2">Managed Products</h2>
            </div>

            <div className="col-12 bg-white roundbg">
                <div className="w-100 d-flex p-3 border-bottom">
                    <div className="col-3 mx-2">
                        <h5>Name</h5>
                    </div>
                    <div className="col-6 mx-2">
                        <h5>Active Licenses</h5>
                    </div>
                    <div className="col-3 mx-2"></div>
                </div>

                {currentRows.map((item, index) => (
                    <div className="d-flex col-12 p-3 border-bottom" key={index}>
                        <div className="col-3 mx-2 d-flex">
                            <h5 className="my-auto">{item.productName}</h5>
                        </div>

                        <div className="col-4 mx-2 d-flex">
                            {/* Pass idBuyer and idProduct to ProgressBox */}
                            <ProgressBox idBuyer={idBuyer} idProduct={item.productId} />
                        </div>

                        <div className="col-4 ms-auto text-end">
                            {item.status === "Outdated" && (
                                <button
                                    className="col btn btn-outline-warning hover m-2"
                                    onClick={() => handleUpdate(item.productName)}
                                >
                                    Update
                                </button>
                            )}

                            <Link
                                to={`/product/${item.productId}`}
                                className="col btn btn-outline-success hover m-2"
                            >
                                See more
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {managedProducts.length > rowsPerPage && (
                <nav aria-label="...">
                    <ul className="pagination justify-content-end mt-3">
                        {Array(Math.ceil(managedProducts.length / rowsPerPage)).fill().map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
};


const ProgressBox = ({ idBuyer, idProduct }) => {
    const [licenses, setLicenses] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchLicenses = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/licenses/user/${idBuyer}`);
                setLicenses(response.data);
            } catch (error) {
                console.error('Error fetching licenses:', error);
            }
        };

        fetchLicenses();
    }, [idBuyer]);

    useEffect(() => {
        if (licenses.length > 0) {
            const filteredLicenses = licenses.filter(license => license.idProduct === idProduct);

            if (filteredLicenses.length > 0) {
                const product = filteredLicenses[0].product;
                const totalLicenses = filteredLicenses.length;
                const activeLicenses = filteredLicenses.filter(license => license.idLicenseStatus === 1).length;
                const percentage = ((activeLicenses / totalLicenses) * 100).toFixed(0);

                setData([{
                    nome: product.productName,
                    numeroAtivos: activeLicenses,
                    numeroTotal: totalLicenses,
                    percentage: percentage
                }]);
            } else {
                setData([]);
            }
        }
    }, [licenses, idProduct]);

    const ProgressDiv = ({ nome, numeroAtivos, numeroTotal, percentage }) => (
        <div className="mb-3">
            <div className="d-flex justify-content-between">
                <p><strong>{nome}</strong></p>
                <div className="d-flex">
                    <p>{numeroAtivos} of {numeroTotal}</p>
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

    return (
        <div className="box-container bg-white col-auto roundbg d-flex shadow pb-3 shadow h-100 col-12">
            <div className="col-12">
                <span className="box-title d-flex justify-content-start pt-3 ps-3 pb-3">
                </span>
                <div className="px-3 col-12">
                    {data.map((item, index) => (
                        <ProgressDiv
                            key={index}
                            nome={item.nome}
                            numeroAtivos={item.numeroAtivos}
                            numeroTotal={item.numeroTotal}
                            percentage={item.percentage}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};



export default ManagerProductList;
