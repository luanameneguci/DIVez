import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';

const ProgressBox = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const departmentResponse = await axios.get('http://localhost:8080/ticketdepartment');
                const ticketResponse = await axios.get('http://localhost:8080/ticket/dpending');

                const departments = departmentResponse.data;
                const ticketData = ticketResponse.data;

                // Process the data to calculate percentages
                const processedData = departments.map(department => {
                    const total = ticketData.find(ticket => ticket.idTicketDepartment === department.idTicketDepartment)?.total || 0;
                    const pending = ticketData.find(ticket => ticket.idTicketDepartment === department.idTicketDepartment)?.pending || 0;
                    const percentage = (pending / total) * 100 || 0;

                    return {
                        nome: department.ticketDepartment,
                        numeroTotal: total,
                        numeroPendentes: pending,
                        percentage: percentage.toFixed(0)
                    };
                });

                // Sort processedData by percentage descending
                processedData.sort((a, b) => b.percentage - a.percentage);

                // Take only the top 4 departments
                const top4 = processedData.slice(0, 4);

                setData(top4);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const ProgressDiv = ({ nome, numeroPendentes, numeroTotal, percentage }) => (
        <div className="mb-3">
            <div className="d-flex justify-content-between">
                <p><strong>{nome}</strong></p>
                <div className="d-flex">
                    <p>{numeroPendentes} of {numeroTotal}</p>
                </div>
            </div>
            <div className="progress">
                <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: `${percentage}%` }}
                    aria-valuenow={percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {percentage}%
                </div>
            </div>
        </div>
    );

    return (
        <div className="box-container bg-white col-auto roundbg d-flex shadow pb-3 shadow h-100">
            <div className="col-12">
                <span className="box-title d-flex justify-content-start pt-3 ps-3 pb-3">
                    <strong><h4>Pending Tickets</h4></strong>
                </span>
                <div className="px-3">
                    {data.map((item, index) => (
                        <ProgressDiv
                            key={index}
                            nome={item.nome}
                            numeroPendentes={item.numeroPendentes}
                            numeroTotal={item.numeroTotal}
                            percentage={item.percentage}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgressBox;
