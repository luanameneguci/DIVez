import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ClientListBox({ clientList }) {
    const [nameFilter, setNameFilter] = useState('');
    const [nifFilter, setNifFilter] = useState('');
    const [mailFilter, setMailFilter] = useState('');
    const [accountTypeFilter, setAccountTypeFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        setClients(clientList);
    }, [clientList]);

    const filteredRows = clients.filter(row =>
        row[0].toLowerCase().includes(nameFilter.toLowerCase()) &&
        (!row[1] || row[1].toString().includes(nifFilter)) &&
        row[2].toLowerCase().includes(mailFilter.toLowerCase()) &&
        row[3].toLowerCase().includes(accountTypeFilter.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredRows.length / itemsPerPage); i++) {
        pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <button onClick={() => paginate(i)} className="page-link">{i}</button>
            </li>
        );
    }

    const handleDelete = async (clientId) => {
        try {
            await axios.delete(`http://localhost:8080/user/delete/${clientId}`);
            setClients(clients.filter(client => client[4] !== clientId));
            alert('Client deleted successfully!');
        } catch (error) {
            console.error('Error deleting client:', error);
            alert('Failed to delete client. Please try again.');
        }
    };

    return (
        <div className="container bg-white px-0 roundbg shadow h-100">
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
                        <th className="ps-3 py-2">Account Type
                            <input
                                className="form-control w-75"
                                type="text"
                                placeholder="Search"
                                value={accountTypeFilter}
                                onChange={(e) => setAccountTypeFilter(e.target.value)}
                            />
                        </th>
                        <th className="py-2 align-text-top text-center pt-2">Action</th>
                    </tr>
                </thead>
                <tbody className='text-start'>
                    {currentItems.map((row, index) => (
                        <tr key={index}>
                            <td style={{ padding: '15px 0 15px 2%' }}>{row[0]}</td>
                            <td style={{ padding: '15px 0 15px 2%' }}>{row[1]}</td>
                            <td style={{ padding: '15px 0 15px 2%' }}>{row[2]}</td>
                            <td style={{ padding: '15px 0 15px 2%' }}>{row[3]}</td>
                            <td className="d-flex justify-content-center">
                                <Link
                                    to={`/client/${row[4]}`}
                                    className="btn btn-outline-info me-2"
                                >
                                    See more
                                </Link>

                                <button
                                    className='btn btn-outline-danger'
                                    onClick={() => handleDelete(row[4])}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="...">
                <ul className="pagination pb-2 justify-content-center">
                    {pageNumbers}
                </ul>
            </nav>
        </div>
    );
}

export default ClientListBox;
