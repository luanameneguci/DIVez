import React, { useState, useEffect } from 'react';
import '../../App.css';
import BudgetList from '../../components/buyer/BudgetList';
import axios from 'axios';

const numRowsToShow = 20;

const BuyerBudgetList = ({ userId }) => {
    const [idUser, setIdUser] = useState(userId);

    // Function to handle new budget creation
    const handleNewBudget = async () => {
        try {
            if (!idUser) {
                console.error('idUser is not defined.');
                return;
            }

            // Make POST request to create new budget
            const response = await axios.post(`http://localhost:8080/budget/create/${idUser}`);
            console.log('New budget created:', response.data);

            // Optionally handle success (e.g., show a success message, update UI)
            alert("New budget created successfully!");

            window.location.reload();
        } catch (error) {
            console.error('Error creating new budget:', error);
            // Handle error (e.g., show error message)
            alert("Failed to create new budget.");
        }
    };

    return (
        <div className="dashboard-content bg-light w-100">
            <h3 className="title my-2 mx-4">Budgets</h3>
            <div className='d-flex justify-content-between p-2 mx-4'>
                <h4 className="title my-2 mx-3"></h4>
                <button
                    className="btn btn-block btn-lg text-info hover1 mx-3"
                    style={{ backgroundColor: "#C8F2FE" }}
                    onClick={handleNewBudget} // Attach click handler
                >
                    <strong>New Budget</strong>
                </button>
            </div>
            <div className="container text-center">
                <div className="mx-2 mt-4">
                    <div className="col-12">
                        <BudgetList numRowsToShow={numRowsToShow} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerBudgetList;
