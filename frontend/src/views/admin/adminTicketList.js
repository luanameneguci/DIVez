import React from 'react';
import { useState } from 'react';
import '../../App.css';
import notificationicon from "../../images/notification.png";
import Modal from 'react-bootstrap/Modal';

const boxBudgetsContent = [
    1, 'Maquina Pifou', '13/13/13', 'Design', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '2', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '2', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '1', 'New',
    1, 'João Ratão', '13/06/2024', '20000', '2', 'New',
];

// Split the boxBudgetsContent array into rows of 5 items each
const rows = [];
const itemsPerRow = 6;

for (let i = 0; i < boxBudgetsContent.length; i += itemsPerRow) {
    rows.push(boxBudgetsContent.slice(i, i + itemsPerRow));
}

const AdminTicketList = () => {

    return (
        <div className="dashboard-content bg-light w-100">
            <h4 className="title my-2">Tickets</h4>
            <div className="container text-center">
                <div className="row d-flex justify-content-between">
                    <div className="col mx-1 bg-white roundbg">
                        <Box title="Total Tickets" number="20" image={notificationicon} />
                    </div>
                    <div className="col mx-1 bg-white roundbg">
                        <Box title="Tickets Solved" number="20" image={notificationicon} />
                    </div>
                    <div className="col mx-1 bg-white roundbg">
                        <Box title="To Solve" number="20" image={notificationicon} />
                    </div>
                </div>
                <div className="row my-4 rounded">
                    <TicketListBox />
                </div>
            </div>
        </div>
    );
}


function TicketListBox(props) {
    const [show, setShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className="box-container d-flex h-100">
            <div className="container bg-white px-0 roundbg">
                <table className='table text-start'>
                    <thead className='text-white'>
                        <tr>
                            <th className="text-end pt-3">Ticket Nº
                                <input className="form-control w-75 ms-auto text-end" id="ticketfilter" type="number"></input>
                            </th>
                            <th>Title
                                <input className="form-control w-75" id="titlefilter" type="text" placeholder="Search"></input>
                            </th>
                            <th>Date
                                <input className="form-control w-75" id="datefilter" type="text" placeholder="Search"></input>
                            </th>
                            <th>Department
                                <input className="form-control w-75" id="depfilter" type="text" placeholder="Search"></input>
                            </th>
                            <th className='w-10'>Priority
                                <input className="form-control w-75" id="priofilter" type="number" ></input>
                            </th>
                            <th className='w-10'>Status
                                <input className="form-control w-75" id="statusfilter" type="text" placeholder="Search"></input>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-start'>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex} style={{ borderRadius: rowIndex === rows.length - 1 ? '0 0 15px 15px' : '0' }}>
                                {row.map((data, colIndex) => {
                                    let color = 'inherit';
                                    if (colIndex === 5) {
                                        if (data === 'New') color = '#FFD56D'; //amarelo
                                        else if (data === 'Rejected') color = '#EB5757'; // vermelho
                                        else if (data === 'Paid') color = '#00B69B'; // verde
                                        else if (data === 'Waiting') color = '#2D9CDB'; //azul
                                        return (
                                            <td key={colIndex} className={colIndex === 0 ? 'text-end' : 'ps-4'} style={{ color: colIndex === 5 ? color : 'inherit' }}>
                                                {data} <button className='removebtstyle' onClick={() => setLgShow(true)} >...</button>
                                            </td>
                                        )
                                    }
                                    return (
                                        <td key={colIndex} className={colIndex === 0 ? 'text-end' : 'ps-3'} style={{ color: colIndex === 5 ? color : 'inherit' }}>
                                            {data}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/*NOTA: Fazer com que toda a info venha do ticket ofc*/}
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="ticketedit"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Ticket #number
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className='container'>
                                <div className="row mb-5">
                                    <div className="col-3 text-body-secondary">
                                        DATE
                                    </div>
                                    <div className="col-9">
                                        19/5/2024
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-3 text-body-secondary">
                                        CATEGORY
                                    </div>
                                    <div className="col-9">
                                        Chatbot
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-3 text-body-secondary">
                                        DESCRIPTION
                                    </div>
                                    <div className="col-9 ">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-3 text-body-secondary">
                                        ATTACHMENTS
                                    </div>
                                    <div className="col-9">
                                        <div className="row ">
                                            <div className="col-4 d-flex flex-column text-center fw-medium">
                                                Prints
                                                <img src={notificationicon} className='ticket-print mx-auto mt-1'></img>
                                            </div>
                                            <div className="col-4 d-flex flex-column text-center fw-medium">
                                                Prints
                                                <img src={notificationicon} className='ticket-print mx-auto mt-1'></img>
                                            </div>
                                            <div className="col-4 d-flex flex-column text-center fw-medium">
                                                Prints
                                                <img src={notificationicon} className='ticket-print mx-auto mt-1'></img>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/*NOTA: fazer com que ele troque de cores dependendo do texto (ainda não consigo fazer)*/}
                                <div className="row mb-5">
                                    <div className="col-3 text-body-secondary">
                                        STATUS
                                    </div>
                                    <div className="col-9">
                                        Waiting
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-3 text-body-secondary">
                                        DEPARTMENT
                                    </div>
                                    <div className="col-9">
                                        Programming
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3 text-body-secondary">
                                        CLIENT INFO
                                    </div>
                                    <div className="col-9">
                                        Client Name
                                        Client ID
                                    </div>
                                </div>
                            </div>
                        </form>


                    </Modal.Body>
                </Modal>
                <nav aria-label="..." className='ms-3'>
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item active">
                            <a className="page-link" href="#">2</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    );

}

function Box(props) {
    return (
        <div className="box-container bg-white col-auto rounded d-flex px-4 py-4 shadow">
            <div className="col-10">
                <span className="box-title d-flex justify-content-start">
                    <strong>
                        <h6>{props.title}</h6>
                    </strong>
                </span>
                <span className="box-number d-flex justify-content-start pt-2">
                    <strong>
                        <h2>{props.number}</h2>
                    </strong>
                </span>
            </div>
            <div>
                <img src={props.image} alt="" className="box-image ms-3" />
            </div>
        </div>
    );
}

export default AdminTicketList;
