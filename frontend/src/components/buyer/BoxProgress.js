import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';

const ProgressBox = ({ idUser }) => { // Accept idUser as a prop
    const [data, setData] = useState([]);
    const [licenses, setLicenses] = useState([]);

    useEffect(() => {
        const fetchLicenses = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/licenses/user/${idUser}`);
                setLicenses(response.data);
            } catch (error) {
                console.error('Error fetching licenses:', error);
            }
        };

        fetchLicenses();
    }, [idUser]);

    useEffect(() => {
        if (licenses.length > 0) {
            // Filter licenses by idUser
            const userLicenses = licenses.filter(license => license.idUser === idUser);

            // Create a map to count licenses and active licenses for each product
            const productMap = userLicenses.reduce((acc, license) => {
                const productId = license.idProduct;
                if (!acc[productId]) {
                    acc[productId] = {
                        nome: license.product.productName,
                        numeroTotal: 0,
                        numeroAtivos: 0
                    };
                }
                acc[productId].numeroTotal++;
                if (license.idLicenseStatus === 1) {
                    acc[productId].numeroAtivos++;
                }
                return acc;
            }, {});

            // Convert the map to an array and calculate the percentage
            const processedData = Object.values(productMap).map(product => ({
                ...product,
                percentage: ((product.numeroAtivos / product.numeroTotal) * 100).toFixed(0)
            }));

            // Sort processedData by percentage descending
            processedData.sort((a, b) => b.percentage - a.percentage);

            // Take only the top 4 products
            const top4 = processedData.slice(0, 4);

            setData(top4);
        }
    }, [licenses, idUser]);

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
