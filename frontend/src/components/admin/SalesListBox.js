import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../App.css';

const SalesListBox = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState(null);
    const [saleId, setSaleId] = useState('');
    const [client, setClient] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [bills, setBills] = useState([]);
    const [users, setUsers] = useState([]);
    const [carts, setCarts] = useState([]);
    const [products, setProducts] = useState([]);
    const [productCarts, setProductCarts] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const billResponse = await axios.get('http://localhost:8080/billing');
                setBills(billResponse.data);

                const cartResponse = await axios.get('http://localhost:8080/cart');
                setCarts(cartResponse.data);

                const userResponse = await axios.get('http://localhost:8080/user');
                setUsers(userResponse.data);

                const productResponse = await axios.get('http://localhost:8080/product');
                setProducts(productResponse.data);

                const productCartResponse = await axios.get('http://localhost:8080/productcart');
                setProductCarts(productCartResponse.data);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        loadData();
    }, []);

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleSaleIdChange = (e) => {
        setSaleId(e.target.value);
    };

    const handleClientChange = (e) => {
        setClient(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const filteredRows = bills.filter((bill) => {
        const cart = carts.find(cart => cart.idCart === bill.idCart);
        const user = users.find(user => user.idUser === cart.idUser);

        const cartProductIds = productCarts
            .filter(pc => pc.idCart === bill.idCart)
            .map(pc => pc.idProduct);

        const cartProducts = products.filter(product => cartProductIds.includes(product.idProduct));

        const rowDate = new Date(bill.billDate);

        return (
            (!startDate || rowDate >= startDate) &&
            (!saleId || bill.idBill.toString().includes(saleId)) &&
            (!client || (user && user.userName.toLowerCase().includes(client.toLowerCase()))) &&
            (!amount || cartProducts.length.toString().toLowerCase().includes(amount.toLowerCase())) &&
            (!price || cartProducts.some(product => product.productPrice.toString().includes(price)))
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredRows.length / itemsPerPage); i++) {
        pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(i)}>{i}</button>
            </li>
        );
    }

    return (
        <div className="box-container px-0 h-100 shadow roundbg">
            <div className="container bg-white px-0 roundbg">
                <table id="datatable" className='table text-start'>
                    <thead className='text-white'>
                        <tr>
                            <th className="pt-3">Sale ID
                                <input
                                    className="form-control w-75"
                                    id="ticketfilter"
                                    placeholder="Search"
                                    type="number"
                                    value={saleId}
                                    onChange={handleSaleIdChange}
                                />
                            </th>
                            <th>Client
                                <input
                                    className="form-control w-75"
                                    id="titlefilter"
                                    type="text"
                                    placeholder="Search"
                                    value={client}
                                    onChange={handleClientChange}
                                />
                            </th>
                            <th>Date
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select Date"
                                    className="form-control w-75"
                                />
                            </th>
                            <th>Products
                                <input
                                    className="form-control w-75"
                                    id="depfilter"
                                    type="text"
                                    placeholder="Search"
                                    value={amount}
                                    onChange={handleAmountChange}
                                />
                            </th>
                            <th>Cost
                                <input
                                    className="form-control w-75"
                                    id="priofilter"
                                    type="number"
                                    placeholder="Search"
                                    value={price}
                                    onChange={handlePriceChange}
                                />
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='text-start'>
                        {currentItems.map((bill, rowIndex) => {
                            const cart = carts.find(cart => cart.idCart === bill.idCart);
                            const user = users.find(user => user.idUser === cart.idUser);

                            const cartProductIds = productCarts
                                .filter(pc => pc.idCart === bill.idCart)
                                .map(pc => pc.idProduct);

                            const cartProducts = products.filter(product => cartProductIds.includes(product.idProduct));

                            return (
                                <tr key={rowIndex} style={{ borderRadius: rowIndex === currentItems.length - 1 ? '0 0 15px 15px' : '0' }}>
                                    <td>{bill.idBill}</td>
                                    <td>{user ? user.userName : '-'}</td>
                                    <td>{new Date(bill.billDate).toLocaleDateString('en-GB')}</td>
                                    <td>{cartProducts.map(product => product.productName).join(', ')}</td>
                                    <td>{cartProducts.map(product => product.productPrice).reduce((acc, price) => acc + price, 0).toFixed(2)}</td>
                                    <td>{/* Additional actions or details */}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Pagination */}
                <nav aria-label="...">
                    <ul className="pagination pb-2 justify-content-center">
                        {pageNumbers}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SalesListBox;
