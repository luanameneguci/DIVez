import React from 'react';

function BoughtList({ rows }) {
    return (
        <div className="container bg-white roundbg shadow h-100 px-0 pb-3">
            <table className='col-12 text-start bg-info roundbg'>
                <thead className='text-white roundbg'>
                    <tr>
                        <th className="ps-3 py-2">ID</th>
                        <th className="ps-3 py-2">Products</th>
                        <th className="ps-3 py-2">Date</th>
                        <th className="ps-3 py-2">Amount of Licenses</th>
                        <th className="ps-3 py-2">Cart Price</th>
                    </tr>
                </thead>
                <tbody className='bg-white roundbg'>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className="ps-3 py-2">{row.idBill}</td>
                            <td className="ps-3 py-2">{row.productList}</td>
                            <td className="ps-3 py-2">{row.billDate}</td>
                            <td className="ps-3 py-2">{row.numberOfLicenses}</td>
                            <td className="ps-3 py-2">{row.cartPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BoughtList;
