import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';

const ProgressBox = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [licensesResponse, productsResponse] = await Promise.all([
                    axios.get('http://localhost:8080/license'),
                    axios.get('http://localhost:8080/product')
                ]);

                const licenses = licensesResponse.data;
                const products = productsResponse.data;

                // Process the data to calculate percentages
                const processedData = products.map(product => {
                    const total = licenses.filter(license => license.idProduct === product.idProduct).length;
                    const active = licenses.filter(license => license.idProduct === product.idProduct && license.idLicenseStatus === 2).length;
                    const percentage = (active / total) * 100 || 0; // handle division by zero

                    return {
                        nome: product.productName,
                        numeroTotal: total,
                        numeroAtivos: active,
                        percentage: percentage.toFixed(0)
                    };
                });

                // Sort processedData by percentage descending
                processedData.sort((a, b) => b.percentage - a.percentage);

                // Take only the top 4 products
                const top4 = processedData.slice(0, 4);

                setData(top4);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const ProgressDiv = ({ nome, numeroAtivos, numeroTotal, percentage }) => (
        <div className="mb-3">
            <div className="d-flex justify-content-between">
                <p><strong>{nome}</strong></p>
                <div className="d-flex">
                    <p>{numeroAtivos} of {numeroTotal}</p>
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
                    <strong><h4>Your most used product</h4></strong>
                </span>
                <div className="px-3">
                    {data.map((item, index) => (
                        <ProgressDiv
                            key={index}
                            nome={item.nome}
                            numeroAtivos={item.numeroAtivos}
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
