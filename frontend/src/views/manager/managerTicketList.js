import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'react-datepicker/dist/react-datepicker.css';
import notificationicon from "../../images/notification.png";

// Função auxiliar para formatar a data
const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

// Função para obter a cor do status com base no valor do status
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

const TicketListBox = ({ userId }) => {
    // Estados para controlo de modais e tickets selecionados
    const [lgShow, setLgShow] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Estados para filtros
    const [ticketId, setTicketId] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(null); // Alterado para null para DatePicker
    const [status, setStatus] = useState('');

    // Estado para paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(20);

    // Estado para os tickets
    const [ticketData, setTicketData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/ticket/buyer/${userId}`)
            .then(response => response.json())
            .then(data => setTicketData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleShow = (ticket) => {
        setSelectedTicket(ticket);
        setLgShow(true);
    };

    // Filtragem dos tickets com base nos valores de entrada
    const filteredRows = ticketData.filter(ticket => {
        const rowDate = new Date(ticket.ticketDate);
        return (
            ticket.idTicket.toString().includes(ticketId.toString()) &&
            ticket.ticketName.toLowerCase().includes(title.toLowerCase()) &&
            (!date || rowDate >= date) && // Comparar rowDate com a data selecionada
            ticket.ticketStatus.ticketStatus.toLowerCase().includes(status.toLowerCase())
        );
    });

    // Calcular a paginação
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

    // Alterar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container d-flex px-0 roundbg h-100 pb-3 bg-white shadow">
            <div className="container px-0 roundbg h-100">
                <table className='table text-start my-0'>
                    <thead className='text-white pt-2'>
                        <tr>
                            <th>Ticket</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((ticket, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className='ps-3'>{ticket.idTicket}</td>
                                <td className='ps-3'>{ticket.ticketName}</td>
                                <td className='ps-3'>{formatDateString(ticket.ticketDate)}</td>
                                <td className='ps-3' style={{ color: getStatusColor(ticket.ticketStatus.ticketStatus) }}>
                                    {ticket.ticketStatus.ticketStatus}
                                </td>
                                <td className='text-center'>
                                    <button className='btn btn-outline-warning' onClick={() => handleShow(ticket)}>See more</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Mostrar o seletor de página se filteredRows.length for maior que rowsPerPage */}
                {filteredRows.length > rowsPerPage && (
                    <nav aria-label="..." className='ms-3 mt-4'>
                        <ul className="pagination">
                            {Array(Math.ceil(filteredRows.length / rowsPerPage)).fill().map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <a className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</a>
                                </li>
                            ))}
                            <li className="page-item">
                                <a className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredRows.length / rowsPerPage)}>Próximo</a>
                            </li>
                        </ul>
                    </nav>
                )}

                {/* Modal para exibir os detalhes do ticket selecionado */}
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="ticketedit"
                    style={{ padding: '10px' }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Ticket #{selectedTicket ? selectedTicket.idTicket : ''}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedTicket && (
                            <form>
                                <div className='container'>
                                    <div className="row mb-4">
                                        <div className="col-3 text-body-secondary">Date</div>
                                        <div className="col-9">{formatDateString(selectedTicket.ticketDate)}</div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-3 text-body-secondary">Description</div>
                                        <div className="col-9">
                                            {selectedTicket.ticketDescription}
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-3 text-body-secondary">Attachments</div>
                                        <div className="col-9">
                                            <div className="row">
                                                <div className="col-4 d-flex flex-column text-center fw-medium">
                                                    Print
                                                    <img src={notificationicon} className='ticket-print mx-auto mt-1' alt="Impressões" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-3 text-body-secondary">Status</div>
                                        <div className="col-4" style={{ color: getStatusColor(selectedTicket.ticketStatus.ticketStatus) }}>
                                            {selectedTicket.ticketStatus.ticketStatus}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

// Faz o display da TicketListBox
const ManagerTicketList = ({ userId }) => {
    return (
        <div className="dashboard-content bg-light w-100">
            <h4 className="title my-2 mx-4">Tickets</h4>
            <div className="container">
                <div className="my-4">
                    <TicketListBox userId={userId}/>
                </div>
            </div>
        </div>
    );
};

export default ManagerTicketList;