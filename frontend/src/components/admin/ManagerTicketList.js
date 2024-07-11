import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const ManagerTicketList = ({ numRowsToShow, clientId }) => {
  const [tickets, setTickets] = useState([]);
  const [ticketNumberFilter, setTicketNumberFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    loadTickets();
    loadStatuses();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/ticket/buyer/${clientId}`);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const loadStatuses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/ticketstatus');
      setStatuses(response.data);
    } catch (error) {
      console.error('Error fetching statuses:', error);
    }
  };

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

  const getStatusName = (id) => {
    const status = statuses.find(status => status.idTicketStatus === id);
    return status ? status.ticketStatus : id;
  };

  const filteredTickets = tickets.filter(ticket => {
    if (ticketNumberFilter && !ticket.idTicket.toString().includes(ticketNumberFilter)) {
      return false;
    }
    if (clientFilter && !ticket.idUser.toString().includes(clientFilter)) {
      return false;
    }
    if (selectedDate && !format(new Date(ticket.ticketDate), 'dd/MM/yyyy').includes(format(selectedDate, 'dd/MM/yyyy'))) {
      return false;
    }
    if (descriptionFilter && !ticket.ticketDescription.toLowerCase().includes(descriptionFilter.toLowerCase())) {
      return false;
    }
    if (statusFilter && !getStatusName(ticket.idTicketStatus).toLowerCase().includes(statusFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  const currentItems = filteredTickets.slice(0, numRowsToShow);

  return (
    <div className="container d-flex px-0 roundbg h-100 pb-3 bg-white shadow">
      <div className="container px-0 roundbg h-100">
        <table className='table text-start my-0'>
          <thead className='text-white pt-2'>
            <tr>
              {numRowsToShow === 5 ? (  
                <>
                  <th style={{ width: '10%' }}>Ticket</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th className='text-center'>Action</th>
                </>
              ) : numRowsToShow === 6 ? (
                <>
                  <th style={{ width: '10%' }}>Ticket</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th className='text-center'>Action</th>
                </>
              ) : (
                <>
                  <th>
                    Ticket
                    <input
                      className="form-control w-75"
                      type="text"
                      placeholder="Search"
                      value={ticketNumberFilter}
                      onChange={(e) => setTicketNumberFilter(e.target.value)}
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
                <td className='ps-3' style={{ width: '10%' }}>{row.idTicket}</td>
                {numRowsToShow === 20 || numRowsToShow === 6 ? (
                  <td>{row.idUser}</td>
                ) : null}
                <td>{format(new Date(row.ticketDate), 'dd/MM/yyyy')}</td>
                <td>{row.ticketDescription.slice(0, 30)}</td>
                <td style={{ color: getStatusColor(getStatusName(row.idTicketStatus)) }}>{getStatusName(row.idTicketStatus)}</td>
                <td className='text-center'>
                  <Link to={"/ticketreply/" + row.idTicket} className='btn btn-outline-warning' onClick={() => console.log(row.idTicket)}>
                    See more
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagerTicketList;
