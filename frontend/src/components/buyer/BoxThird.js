// BoxThird.js

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming axios is installed for making HTTP requests

const BoxThird = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        // Assuming the API endpoint returns the JSON data you provided
        axios.get('http://localhost:8080/ticket/buyer/6')
            .then(response => {
                setTickets(response.data); // Assuming response.data contains the array of tickets
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []); // Empty dependency array means this effect runs only once after the component mounts

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Format to dd/mm/yyyy
        return formattedDate;
    };

    return (
        <div className="container d-flex px-0 roundbg h-100 pb-3 bg-white shadow">
            <div className="container px-0 roundbg h-100">
                <table className='table text-start my-0'>
                    <thead className='text-white pt-2'>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.idTicket}>
                            <td>{ticket.idTicket}</td>
                            <td>{ticket.ticketName}</td>
                            <td>{ticket.ticketDescription}</td>
                            <td>{ticket.idTicketPriority}</td>
                            <td>{ticket.ticketDepartment.ticketDepartment}</td>
                            <td style={{ color: getStatusColor(ticket.ticketStatus.ticketStatus) }}>{ticket.ticketStatus.ticketStatus}</td>
                            <td>{formatDate(ticket.ticketDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default BoxThird;
