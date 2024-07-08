function BoughtList({rows}) {
    return <div className="container bg-white roundbg shadow h-100 px-0 pb-3">
        <table className='col-12 text-start bg-info roundbg'>
            <thead className='text-white roundbg'>
                <th className="ps-3 py-2">ID</th>
                <th className="ps-3 py-2">Products</th>
                <th className="ps-3 py-2">Date</th>
                <th className="ps-3 py-2">Amount</th>
                <th className="ps-3 py-2">Price</th>
            </thead>
            <tbody className='bg-white roundbg'>
            {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((data, colIndex) => (
                           <td
                           key={colIndex}
                           style={{ 
                               color: colIndex === 5 ? '#FFD56D' : 'inherit',
                               padding: '10px 0 10px 1%' 
                           }}
                       >
                            {data}
                          </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default BoughtList;