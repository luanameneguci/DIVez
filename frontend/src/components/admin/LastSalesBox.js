import React from 'react';
import '../../App.css';
import notificationicon from "../../images/notification.png";

// Conteúdo dos produtos
const boxProductsContent = [
    notificationicon, 'Adobe Photoshop', '69', '20/10/2024', '1000', 'Updated',
    notificationicon, 'Adobe Photoshop', '69', '20/10/2024', '1000', 'Outdated',
    notificationicon, 'Adobe Photoshop', '69', '20/10/2024', '1000', 'Updated',
    notificationicon, 'Adobe Photoshop', '69', '20/10/2024', '1000', 'Outdated',
    notificationicon, 'Adobe Photoshop', '69', '20/10/2024', '1000', 'Updated',
];

// Divide o array boxProductsContent em linhas de 6 itens cada
const rows3 = [];
const itemsPerRow = 6;

for (let i = 0; i < boxProductsContent.length; i += itemsPerRow) {
    rows3.push(boxProductsContent.slice(i, i + itemsPerRow));
}

// Retorna uma tabela com os dados dos produtos
function LastSalesBox() {
    return (
        <div className="box-container d-flex">
            <div className="container bg-white px-0 roundbg">
                <table className='table text-start'>
                    <thead className='text-white pt-2'>
                        <tr>
                            <th>Product</th>
                            <th>Product Name</th>
                            <th>Client ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows3.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((data, colIndex) => {
                                    let spanStyle = {};
                                    if (colIndex === row.length - 1) { // Verifica se é a última coluna
                                        spanStyle.textAlign = 'center';
                                        if (data === 'Updated') {
                                            spanStyle.backgroundColor = '#00B69B';
                                            spanStyle.color = '#fff';
                                            spanStyle.borderRadius = '20px';
                                            spanStyle.fontWeight = '500';
                                        } else if (data === 'Outdated') {
                                            spanStyle.textAlign = 'center';
                                            spanStyle.backgroundColor = '#FD5454';
                                            spanStyle.color = '#fff';
                                            spanStyle.borderRadius = '20px';
                                            spanStyle.fontWeight = '500';
                                        }
                                    }
                                    if (colIndex === 0) { // Verifica se é a primeira coluna (imagem)
                                        return (
                                            <td key={colIndex} className='listimage py-3 ps-3'>
                                                <img src={notificationicon} alt="alt" />
                                            </td>
                                        )
                                    } else {
                                        return (
                                            <td
                                                key={colIndex}
                                                className='align-middle'
                                                colSpan={(colIndex === 0) ? 1 : 0}
                                                style={{
                                                    padding: '10px',
                                                }}
                                            >
                                                <span style={{ ...spanStyle, padding: '4px 15px', display: 'inline-block' }}>
                                                    {data}
                                                </span>
                                            </td>
                                        );
                                    }
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="my-2">
                    <button className="btn btn-info text-white hover"><strong>See more</strong></button>
                </div>
            </div>
        </div>
    );
}

export default LastSalesBox;
