// components/BoxTable.js
import React from "react";

// Function to get status color based on status value
const getStatusColor = (status) => {
  switch (status) {
    case "New":
      return "#FFD56D"; // yellow
    case "Rejected":
      return "#EB5757"; // red
    case "Paid":
      return "#00B69B"; // green
    case "Waiting":
      return "#2D9CDB"; // blue
    default:
      return "inherit"; // default color
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
              <th className="ps-3 py-2 text-white">Budget title</th>
              <th className="ps-3 py-2 text-white">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white roundbg">
            {rows.map((row, rowIndex) => (
              <tr className="roundbg" key={rowIndex}>
                {row.map((data, colIndex) => {
                  const isLastChild = colIndex === row.length - 1;
                  return (
                    <td
                      className="ps-3 py-1 border-bottom"
                      key={colIndex}
                      style={{
                        height: "40px",
                        ...(isLastChild && { color: getStatusColor(row[2]) }),
                      }}
                    >
                      {data}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BoxTable;
