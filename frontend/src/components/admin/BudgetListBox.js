import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

function BudgetsListBox({ numRowsToShow }) {
    const [budgets, setBudgets] = useState([]);
    const [budgetStatuses, setBudgetStatuses] = useState([]);
    const [budgetNumberFilter, setBudgetNumberFilter] = useState('');
    const [clientFilter, setClientFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [descriptionFilter, setDescriptionFilter] = useState(''); 
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        loadBudgets();
        loadBudgetStatuses();
    }, []);

    const loadBudgets = async () => {
        try {
            const response = await axios.get('http://localhost:8080/budget');
            setBudgets(response.data);
        } catch (error) {
            console.error('Error fetching budgets:', error);    
        }
    };

    const loadBudgetStatuses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/budgetstatus');
            setBudgetStatuses(response.data);
        } catch (error) {
            console.error('Error fetching budget statuses:', error);
        }
    };

    const getStatusName = (statusId) => {
        const status = budgetStatuses.find(status => status.idBudgetStatus === statusId);
        return status ? status.budgetStatus : 'Unknown';
    };

    const filteredRows = budgets.filter(row => {
        const rowDate = new Date(row.budgetDate);
        return (
            row.idBudget.toString().includes(budgetNumberFilter) &&
            (row.idUser.toString().includes(clientFilter.toLowerCase()) || clientFilter === '') &&
            (!selectedDate || rowDate >= selectedDate) &&
            getStatusName(row.idBudgetStatus).toLowerCase().includes(statusFilter.toLowerCase()) &&
            row.budgetDescription.toLowerCase().includes(descriptionFilter.toLowerCase()) 
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

    if (numRowsToShow !== 20 && numRowsToShow !== 5) {
        currentItems = filteredRows.slice(0, 6);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredRows.length / itemsPerPage); i++) {
        pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(i)}>{i}</button>
            </li>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 1:
                return '#FFD56D'; // yellow
            case 2:
                return '#2D9CDB'; // blue
            case 3:
                return '#00B69B'; // green
            case 4:
                return '#EB5757'; // red
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
                                            onChange={(e) => setDescriptionFilter(e.target.value)}
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
                                    <td>{row.idUser}</td>
                                ) : null}
                                <td>{format(new Date(row.budgetDate), 'dd/MM/yyyy')}</td>
                                <td>{row.budgetDescription.slice(0, 30)}</td>
                                <td style={{ color: getStatusColor(row.idBudgetStatus) }}>{getStatusName(row.idBudgetStatus)}</td>
                                <td className='text-center'>
                                    <Link to={`/budgetreply/${row.idBudget}`} className='btn btn-outline-warning' onClick={() => console.log(row.idBudget)}>
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
