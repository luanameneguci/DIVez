import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productFilter, setProductFilter] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/product')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error('Error fetching products', error));
    }, []);

    const handleProductFilterChange = (e) => setProductFilter(e.target.value.toLowerCase());

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(productFilter)
    );

    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
        pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(i)}>{i}</button>
            </li>
        );
    }

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/product/delete/${productId}`);
            setProducts(products.filter(product => product.idProduct !== productId));
            alert('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product. Please try again.');
        }
    };

    return (
        <div className="box-container px-3 roundbg col-auto d-flex">
            <div className="container roundbg bg-white shadow px-0">
                <table className='table roundbg container-fluid roundbg pb-4 border border-light'>
                    <thead className='text-white'>
                        <tr>
                            <th className="py-2 align-text-top pt-2 ps-4">Image</th>
                            <th className="py-2">Product
                                <input
                                    className="form-control w-75"
                                    type="text"
                                    placeholder="Search"
                                    value={productFilter}
                                    onChange={handleProductFilterChange}
                                />
                            </th>
                            <th className="py-2 align-text-top">Version</th>
                            <th className="py-2 align-text-top">Price</th>
                            <th className="py-2 align-text-top">Description</th>
                            <th className="pt-2 align-text-top text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className='border border-product'>
                        {currentProducts.map(product => (
                            <tr key={product.idProduct} className="align-text-top">
                                <td>
                                    <Link to={`/productedit/${product.idProduct}`}>
                                        <img src={product.productImage} alt="product" style={{ width: '70px', height: '70px' }} />
                                    </Link>
                                </td>
                                <td>{product.productName}</td>
                                <td>{product.productVersion}</td>
                                <td>{product.productPrice}</td>
                                <td>{product.productDescription}</td>
                                <td className="d-flex justify-content-center p-4">
                                    <Link to={"/productedit/" + product.idProduct} className='btn btn-outline-info me-2 hover'>Edit</Link>
                                    <button
                                        className='btn btn-outline-danger hover'
                                        onClick={() => handleDelete(product.idProduct)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="...">
                    <ul className="pagination justify-content-center">
                        {pageNumbers}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ProductList;
