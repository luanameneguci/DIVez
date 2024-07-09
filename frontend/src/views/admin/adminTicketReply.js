import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const AdminTicketReply = () => {
    const { idTicket } = useParams();
    const [ticket, setTicket] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [priorityOptions, setPriorityOptions] = useState([]);
    const [department, setDepartment] = useState();
    const [priority, setPriority] = useState();
    const [status, setStatus] = useState();
    const [reply, setReply] = useState('');

    useEffect(() => {
        const loadTicketData = async () => {
            try {
                setIsLoading(true);
                // Fetch ticket details
                const ticketResponse = await axios.get(`http://localhost:8080/ticket/${idTicket}`);
                setTicket(ticketResponse.data);

                // Fetch department options
                const departmentResponse = await axios.get('http://localhost:8080/ticketdepartment');
                setDepartmentOptions(departmentResponse.data);

                // Fetch status options
                const statusResponse = await axios.get('http://localhost:8080/ticketstatus');
                setStatusOptions(statusResponse.data);

                // Fetch priority options
                const priorityResponse = await axios.get('http://localhost:8080/ticketpriority');
                setPriorityOptions(priorityResponse.data);

                // Set initial values based on fetched data
                setDepartment(ticketResponse.data.idTicketDepartment);
                setPriority(ticketResponse.data.idTicketPriority);
                setStatus(ticketResponse.data.idTicketStatus);

                setIsLoading(false);
            } catch (error) {
                console.error('Error loading ticket:', error);
                setIsLoading(false);
            }
        };

        if (idTicket) {
            loadTicketData();
        }
    }, [idTicket]);

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/ticket/update/${idTicket}`, {
                ticketName: ticket.ticketName,
                ticketDescript: ticket.ticketDescription,
                ticketDate: ticket.ticketDate,
                ticketPriority: priority,
                idTicketStatus: status,
                idTicketDepartment: department,
            });
            alert('Ticket updated:', response.data);
            console.log('Ticket updated:', response.data);
        } catch (error) {
            alert('Error saving ticket:', error);
            console.error('Error saving ticket:', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/ticket/update/${idTicket}`, {
                idTicketStatus: 4, // id of rejected status
            });
            alert('Ticket rejected!');
        } catch (error) {
            alert('Error rejecting ticket:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!ticket) {
        return <div>No ticket found</div>;
    }

    return (
        <div className="container bg-light w-100 p-2x">
            <div className="container">
                <div className="box-container bg-white roundbg h-100 p-4 shadow">
                    <div className="row border-bottom">
                        <h4 className='text-start'>Ticket #{ticket.idTicket}</h4>
                        <p className='text-start mt-1'>{formatDate(ticket.ticketDate)}</p>
                    </div>
                    <div className="row m-2 border-bottom">
                        {ticket.ticketPrint ? (
                            <img
                                src={ticket.ticketPrint}
                                alt="Client"
                                style={{ width: '200px', height: '200px' }}
                            />
                        ) : (
                            <p>User did not upload images</p>
                        )}
                    </div>
                    <div className='row mt-3'>
                        <h6 className='text-start'>Description</h6>
                        <div className='row'>
                            <span>{ticket.ticketDescription}</span>
                        </div>
                    </div>
                    <form className='row d-flex mt-4'>
                        <div className="row d-flex justify-content-between">
                            <div className='col-4'>
                                <label htmlFor="departmentSelect">Department</label>
                                <select
                                    id="departmentSelect"
                                    className="form-select"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    {departmentOptions.map(dep => (
                                        <option key={dep.idTicketDepartment} value={dep.idTicketDepartment.toString()}>{dep.ticketDepartment}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-4'>
                                <label htmlFor="prioritySelect">Priority</label>
                                <select
                                    id="prioritySelect"
                                    className="form-select"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value="">Select Priority</option>
                                    {priorityOptions.map(prio => (
                                        <option key={prio.idTicketPriority} value={prio.idTicketPriority.toString()}>{prio.ticketPriority}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-4'>
                                <label htmlFor="statusSelect">Status</label>
                                <select
                                    id="statusSelect"
                                    className="form-select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    {statusOptions.map(stat => (
                                        <option key={stat.idTicketStatus} value={stat.idTicketStatus.toString()}>{stat.ticketStatus}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 col-8 mt-2">
                            <label htmlFor="descriptioninput">Reply</label>
                            <textarea
                                className="form-control"
                                id="descriptioninput"
                                rows="3"
                                maxLength="250"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3 col">
                            <div className="row d-flex mt-3 justify-content-end">
                                <div className="col-4">
                                    <button type="button" className="btn btn-success hover shadow col-12" onClick={handleSave}>Save</button>
                                </div>
                                <div className="col-4">
                                    <button type="button" className="btn btn-info text-white hover shadow col-12">Send Reply</button>
                                </div>
                                <div className="col-4">
                                    <button type="button" className="btn btn-danger hover shadow col-12" onClick={handleReject}>Reject</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminTicketReply;
