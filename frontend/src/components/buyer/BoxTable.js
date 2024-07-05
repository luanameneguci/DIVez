// components/BoxTable.js
import React from "react";

// Função para obter a cor do status com base no valor do status
const getStatusColor = (status) => {
  switch (status) {
    case "New":
      return "#FFD56D"; // amarelo
    case "Rejected":
      return "#EB5757"; // vermelho
    case "Paid":
      return "#00B69B"; // verde
    case "Waiting":
      return "#2D9CDB"; // azul
    default:
      return "inherit"; // cor padrão
  }
};

function BoxTable({ title, rows }) {
  return (
    <div className="box-container bg-white col-auto roundbg d-flex shadow" style={{ height: 360 + "px" }}>
      <div className="col-12">
        <span className="box-title d-flex justify-content-start pt-3 ps-3 pb-3">
          <strong>
            <h4>{title}</h4>
          </strong>
        </span>
        <table className="container-fluid text-start bg-info py-4 roundbg col-12">
          <thead>
            <tr>
              <th className="ps-3 py-2 text-white">Budget Nº</th>
              <th className="ps-3 py-2 text-white">Budget description</th>
              <th className="ps-3 py-2 text-white">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white roundbg">
            {rows.map((row, rowIndex) => (
              <tr className="roundbg" key={rowIndex}>

                {row.map((data, colIndex) => (
                  <React.Fragment key={colIndex}>
                  <td className="ps-3 py-1 border-bottom" key={colIndex} style={{ height: 40 + "px" }}>
                    {data.idBudget}
                  </td>    
                  <td className="ps-3 py-1 border-bottom text-truncate" key={colIndex} style={{ height: 40 + "px" }}>
                    {data.budgetDescription}
                  </td>    
                  <td className="ps-3 py-1 border-bottom" key={colIndex} style={{ height: 40 + "px" }}>
                    {data.budgetStatus ? data.budgetStatus.budgetStatus : 'Unknown'}
                  </td>     
                  </React.Fragment>             
                ))}                


              </tr>
            ))}
          
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BoxTable;
