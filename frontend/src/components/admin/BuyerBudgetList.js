import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const BudgetsListBox = ({ numRowsToShow, clientId }) => {
  const [budgets, setBudgets] = useState([]);
  const [budgetNumberFilter, setBudgetNumberFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadBudgets();
  }, [clientId]);

  const loadBudgets = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/budget/user/${clientId}`);
      setBudgets(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#2D9CDB';
      case 'Approved':
        return '#00B69B';
      case 'Rejected':
        return '#EB5757';
      case 'Completed':
        return '#6B7280';
      default:
        return 'inherit';
    }
  };

  const filteredBudgets = budgets.filter(budget => {
    if (budgetNumberFilter && !budget.idBudget.toString().includes(budgetNumberFilter)) {
      return false;
    }
    if (clientFilter && !budget.idUser.toString().includes(clientFilter)) {
      return false;
    }
    if (selectedDate && !format(new Date(budget.budgetDate), 'dd/MM/yyyy').includes(format(selectedDate, 'dd/MM/yyyy'))) {
      return false;
    }
    if (descriptionFilter && !budget.budgetDescription.toLowerCase().includes(descriptionFilter.toLowerCase())) {
      return false;
    }
    if (statusFilter && !budget.idBudgetStatus.toString().includes(statusFilter.toString())) {
      return false;
    }
    return true;
  });

  const currentItems = filteredBudgets.slice(0, numRowsToShow);

  return (
    <div className="container d-flex px-0 roundbg h-100 pb-3 bg-white shadow">
      <div className="container px-0 roundbg h-100">
        <table className='table text-start my-0'>
          <thead className='text-white pt-2'>
            <tr>
              {numRowsToShow === 5 ? (
                <>
                  <th style={{ width: '10%' }}>Budget</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th className='text-center'>Action</th>
                </>
              ) : numRowsToShow === 6 ? (
                <>
                  <th style={{ width: '10%' }}>Budget</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th className='text-center'>Action</th>
                </>
              ) : (
                <>
                  <th>
                    Budget
                    <input
                      className="form-control w-75"
                      type="text"
                      placeholder="Search"
                      value={budgetNumberFilter}
                      onChange={(e) => setBudgetNumberFilter(e.target.value)}
                    />
                  </th>
                  <th>
                    Client
                    <input
                      className="form-control w-75"
                      type="text"
                      placeholder="Search"
                      value={clientFilter}
                      onChange={(e) => setClientFilter(e.target.value)}
                    />
                  </th>
                  <th>
                    Date
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      className="form-control w-75"
                      placeholderText="Select date"
                    />
                  </th>
                  <th>
                    Description
                    <input
                      className="form-control w-75"
                      type="text"
                      placeholder="Search"
                      value={descriptionFilter}
                      onChange={(e) => setDescriptionFilter(e.target.value)}
                    />
                  </th>
                  <th>
                    Status
                    <input
                      className="form-control w-75"
                      type="text"
                      placeholder="Search"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    />
                  </th>
                  <th className='text-center'>Action</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className='ps-3' style={{ width: '10%' }}>{row.idBudget}</td>
                {numRowsToShow === 20 || numRowsToShow === 6 ? (
                  <td>{row.idUser}</td>
                ) : null}
                <td>{format(new Date(row.budgetDate), 'dd/MM/yyyy')}</td>
                <td>{row.budgetDescription.slice(0, 30)}</td>
                <td style={{ color: getStatusColor(row.idBudgetStatus) }}>{row.idBudgetStatus}</td>
                <td className='text-center'>
                  <Link to={"/budgetreply/" + row.idBudget} className='btn btn-outline-warning' onClick={() => console.log(row.idBudget)}>
                    See more
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BudgetsListBox;
