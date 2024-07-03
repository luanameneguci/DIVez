import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

function BudgetsListBox({ numRowsToShow }) {
    // State variables using useState hook
    const [budgets, setBudgets] = useState([]);
    const [budgetNumberFilter, setBudgetNumberFilter] = useState('');
    const [clientFilter, setClientFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [descriptionFilter, setDescriptionFilter] = useState(''); 
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // useEffect hook to load budgets from server on component mount
    useEffect(() => {
        loadBudgets();
    }, []);

    // Function to fetch budgets from server using axios
    const loadBudgets = async () => {
        try {
            const response = await axios.get('http://localhost:8080/budget');
            setBudgets(response.data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    // Filtering rows based on user input and state
    const filteredRows = budgets.filter(row => {
        const rowDate = new Date(row.date);
        return (
            row.idBudget.toString().includes(budgetNumberFilter) &&
            (row.cart.buyer?.buyerName.toLowerCase().includes(clientFilter.toLowerCase()) || clientFilter === '') &&
            (!selectedDate || rowDate >= selectedDate) &&
            row.budgetStatus.budgetStatusDescript.toLowerCase().includes(statusFilter.toLowerCase()) &&
            row.budgetDescript.toLowerCase().includes(descriptionFilter.toLowerCase()) // Added description filter
        );
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generating pagination buttons
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredRows.length / itemsPerPage); i++) {
        pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(i)}>{i}</button>
            </li>
        );
    }

    // Function to get status color based on budget status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return '#2D9CDB'; // blue
            case 'Approved':
                return '#00B69B'; // green
            case 'Rejected':
                return '#EB5757'; // red
            case 'Completed':
                return '#6B7280'; // gray
            default:
                return 'inherit';
        }
    };

    return (
        <div className="container d-flex px-0 roundbg h-100 pb-3 bg-white shadow">
            <div className="container px-0 roundbg h-100">
                <table className='table text-start my-0'>
                    <thead className='text-white pt-2'>
                        <tr>
                            {numRowsToShow === 5 ? (
                                <>
                                    <th style={{ width: '10%' }}>Budget</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th className='text-center'>Action</th>
                                </>
                            ) : numRowsToShow === 6 ? (
                                <>
                                    <th style={{ width: '10%' }}>Budget</th>
                                    <th>Client</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th className='text-center'>Action</th>
                                </>
                            ) : (
                                <>
                                    <th>
                                        Budget
                                        <input
                                            className="form-control w-75"
                                            type="text"
                                            placeholder="Search"
                                            value={budgetNumberFilter}
                                            onChange={(e) => setBudgetNumberFilter(e.target.value)}
                                        />
                                    </th>
                                    <th>
                                        Client
                                        <input
                                            className="form-control w-75"
                                            type="text"
                                            placeholder="Search"
                                            value={clientFilter}
                                            onChange={(e) => setClientFilter(e.target.value)}
                                        />
                                    </th>
                                    <th>
                                        Date
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(date) => setSelectedDate(date)}
                                            className="form-control w-75"
                                            placeholderText="Select date"
                                        />
                                    </th>
                                    <th>
                                        Description
                                        <input
                                            className="form-control w-75"
                                            type="text"
                                            placeholder="Search"
                                            value={descriptionFilter}
                                            onChange={(e) => setDescriptionFilter(e.target.value)} // Handle description filter
                                        />
                                    </th>
                                    <th>
                                        Status
                                        <input
                                            className="form-control w-75"
                                            type="text"
                                            placeholder="Search"
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                        />
                                    </th>
                                    <th className='text-center'>Action</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className='ps-3' style={{ width: '10%' }}>{row.idBudget}</td>
                                {numRowsToShow === 20 || numRowsToShow === 6 ? (
                                    <td>{row.cart.buyer.buyerName}</td>
                                ) : null}
                                <td>{format(new Date(row.date), 'dd/MM/yyyy')}</td>
                                <td>{row.budgetDescript.slice(0, 30)}</td>
                                <td style={{ color: getStatusColor(row.budgetStatus.budgetStatusDescript) }}>{row.budgetStatus.budgetStatusDescript}</td>
                                <td className='text-center'>
                                    <Link to={"/budgetreply/" + row.idBudget} className='btn btn-outline-warning' onClick={() => console.log(row.idBudget)}>
                                        See more
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {numRowsToShow === 20 && (
                    <nav aria-label="..." className='mt-3 mb-0 d-flex justify-content-center'>
                        <ul className="pagination">
                            {pageNumbers}
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}

export default BudgetsListBox;