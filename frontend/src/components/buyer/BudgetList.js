import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

function BudgetList({ numRowsToShow }) {
    const [budgets, setBudgets] = useState([]);
    const [budgetIdFilter, setBudgetIdFilter] = useState('');
    const [dateFilter, setDateFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const url = "http://localhost:8080/budget/user/6"; // Replace with your actual endpoint
                const res = await axios.get(url);
                if (res.status === 200) {
                    const data = res.data;
                    setBudgets(data);
                } else {
                    alert("Error fetching budgets");
                }
            } catch (error) {
                console.error('Error fetching budgets:', error);
            }
        };

        fetchBudgets();
    }, []);

    const filteredBudgets = budgets.filter(budget => {
        const budgetDate = new Date(budget.budgetDate);
        return (
            budget.idBudget.toString().includes(budgetIdFilter) &&
            (!dateFilter || budgetDate >= dateFilter) &&
            budget.budgetStatus.budgetStatus.toLowerCase().includes(statusFilter.toLowerCase())
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBudgets = filteredBudgets.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredBudgets.length / itemsPerPage); i++) {
        pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(i)}>{i}</button>
            </li>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Paid':
                return '#00B69B'; // green
            case 'Rejected':
                return '#EB5757'; // red
            case 'Pending':
                return '#FFD56D'; // yellow
            default:
                return 'inherit';
        }
    };

    return (
        <div className="px-0 roundbg h-100 pb-3 bg-white shadow mx-0 col-12">
            <div className="px-0 roundbg h-100 mx-0 row col-12">
                <table className='table text-start my-0'>
                    <thead className='text-white'>
                        <tr>
                            <th>
                                Budget
                                <input
                                    className="form-control w-75"
                                    type="number"
                                    placeholder="Search"
                                    value={budgetIdFilter}
                                    onChange={(e) => setBudgetIdFilter(e.target.value)}
                                />
                            </th>
                            <th>
                                Date
                                <DatePicker
                                    selected={dateFilter}
                                    onChange={(date) => setDateFilter(date)}
                                    className="form-control w-75"
                                    placeholderText="Select date"
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
                            <th className='text-center align-text-top pt-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBudgets.map((budget, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className='ps-3'>{budget.idBudget}</td>
                                <td>{formatDate(budget.budgetDate)}</td>
                                <td style={{ color: getStatusColor(budget.budgetStatus.budgetStatus) }}>
                                    {budget.budgetStatus.budgetStatus}
                                </td>
                                <td className='text-center'>
                                    <Link to={`/budget/details/${budget.idBudget}`} className='btn btn-outline-warning'>
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

export default BudgetList;
