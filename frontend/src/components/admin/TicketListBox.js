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

function TicketListBox({ numRowsToShow }) {
    const [tickets, setTickets] = useState([]);
    const [ticketIdFilter, setTicketIdFilter] = useState('');
    const [titleFilter, setTitleFilter] = useState('');
    const [dateFilter, setDateFilter] = useState(null);
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const response = await axios.get('http://localhost:8080/ticket');
            setTickets(response.data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    const filteredTickets = tickets.filter(ticket => {
        const ticketDate = new Date(ticket.ticketDate);
        return (
            ticket.idTicket.toString().includes(ticketIdFilter) &&
            ticket.ticketName.toLowerCase().includes(titleFilter.toLowerCase()) &&
            (!dateFilter || ticketDate >= dateFilter) &&
            ticket.ticketDepartment.ticketDepartment.toLowerCase().includes(departmentFilter.toLowerCase()) &&
            ticket.ticketPriority.ticketPriority.toString().includes(priorityFilter.toString()) &&
            ticket.ticketStatus.ticketStatus.toLowerCase().includes(statusFilter.toLowerCase())
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

    if (numRowsToShow !== 20) {
        currentTickets = filteredTickets.slice(0, 6);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredTickets.length / itemsPerPage); i++) {
        pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(i)}>{i}</button>
            </li>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'New':
                return '#FFD56D'; // yellow
            case 'Rejected':
                return '#EB5757'; // red
            case 'Solved':
                return '#00B69B'; // green
            case 'Pending':
                return '#2D9CDB'; // blue
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
                            {numRowsToShow < 20 ? (
                                <>
                                    <th style={{ width: '10%' }}>Ticket</th>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Department</th>
                                    <th className='w-10'>Priority</th>
                                    <th className='w-10'>Status</th>
                                    <th>Action</th>
                                </>
                            ) : (
                                <>
                                    <th>
                                        Ticket
                                        <input
                                            className="form-control w-75"
                                            type="number"
                                            placeholder="Search"
                                            value={ticketIdFilter}
                                            onChange={(e) => setTicketIdFilter(e.target.value)}
                                        />
                                    </th>
                                    <th>
                                        Title
                                        <input
                                            className="form-control w-75"
                                            type="text"
                                            placeholder="Search"
                                            value={titleFilter}
                                            onChange={(e) => setTitleFilter(e.target.value)}
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
                                        Department
                                        <input
                                            className="form-control w-75"
                                            type="text"
                                            placeholder="Search"
                                            value={departmentFilter}
                                            onChange={(e) => setDepartmentFilter(e.target.value)}
                                        />
                                    </th>
                                    <th className='w-10'>
                                        Priority
                                        <input
                                            className="form-control w-100"
                                            type="number"
                                            placeholder="Search"
                                            value={priorityFilter}
                                            onChange={(e) => setPriorityFilter(e.target.value)}
                                        />
                                    </th>
                                    <th className='w-10'>
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
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentTickets.map((ticket, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className='ps-3' style={{ width: '10%' }}>{ticket.idTicket}</td>
                                <td>{ticket.ticketName}</td>
                                <td>{formatDate(ticket.ticketDate)}</td>
                                <td>{ticket.ticketDepartment.ticketDepartment}</td>
                                <td>{ticket.ticketPriority.ticketPriority}</td>
                                <td style={{ color: getStatusColor(ticket.ticketStatus.ticketStatus) }}>{ticket.ticketStatus.ticketStatus}</td>
                                <td className='text-center'>
                                    <Link to={`/ticketreply/${ticket.idTicket}`} className='btn btn-outline-warning' onClick={() => console.log(ticket.idTicket)}>
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

export default TicketListBox;
