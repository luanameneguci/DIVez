import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const BuyerBudgetDetail = () => {
    const { idBudget } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [budget, setBudget] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [statusOptions, setStatusOptions] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [reply, setReply] = useState('');

    useEffect(() => {
        const loadBudgetData = async () => {
            try {
                setIsLoading(true);
                // Fetch budget details
                const budgetResponse = await axios.get(`http://localhost:8080/budget/products/${idBudget}`);
                const budgetData = budgetResponse.data;
                setBudget(budgetData);

                // Fetch status options
                const statusResponse = await axios.get('http://localhost:8080/budgetstatus');
                setStatusOptions(statusResponse.data);

                // Set initial values based on fetched data
                setSelectedStatus(budgetData.idBudgetStatus);
                setReply(budgetData.budgetDescription || '');
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading budget:', error);
                setIsLoading(false);
            }
        };

        if (idBudget) {
            loadBudgetData();
        }
    }, [idBudget]);

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/budget/update/${idBudget}`, {
                budgetDescription: reply,
                budgetDate: budget.budgetDate,
                idBudgetStatus: 2,
                idUser: budget.idUser,
            });
            alert('Budget sended');
        } catch (error) {
            alert('Error saving budget:', error);
            console.error('Error saving budget:', error);
        }
    };

    const handleReject = async () => {
        try {
            await axios.delete(`http://localhost:8080/budget/delete/${idBudget}`);
            alert('Budget deleted!');
            navigate('/budgets'); // Navigate back to the budgets page
        } catch (error) {
            alert('Error rejecting budget:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!budget) {
        return <div>No budget found</div>;
    }

    return (
        <div className="container bg-light w-100 p-2x">
            <div className="container">
                <div className="box-container bg-white roundbg h-100 p-4 shadow">
                    <div className="row border-bottom">
                        <h4 className='text-start'>Budget #{budget.idBudget}</h4>
                    </div>
                    <div>
                        <ProductList items={budget.budgetProducts} />
                    </div>
                    <form className='row d-flex mt-4'>
                        <div className="mb-3 col-8">
                            <label htmlFor="descriptioninput">Description</label>
                            <textarea
                                className="form-control"
                                id="descriptioninput"
                                rows="3"
                                maxLength="250"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                            ></textarea>
                        </div>
                        {budget.idBudgetStatus === 1 && (
                            <div className="mb-3 col">
                                <div className="row d-flex mt-3 justify-content-end">
                                    <div className="col-4">
                                        <button type="button" className="btn btn-info text-white hover shadow col-12" onClick={handleSave}>Send Budget</button>
                                    </div>
                                    <div className="col-4">
                                        <button type="button" className="btn btn-danger hover shadow col-12" onClick={handleReject}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

const ProductList = ({ items }) => {
    return (
        <div>
            {items.map(({ product }) => (
                <div className="card-body py-3" key={product.idProduct}>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center col-10">
                            <div className='col-4'>
                                <img
                                    src={product.productImage}
                                    className="img-fluid roundbg"
                                    alt="Shopping item"
                                    style={{ width: "65px" }}
                                />
                            </div>
                            <div className="ms-3 col-8">
                                <h5>{product.productName}</h5>
                            </div>
                        </div>
                        <div className="col-2 my-auto">
                            <button
                                type="button"
                                className="btn btn-danger hover shadow col-12 roundbg"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BuyerBudgetDetail;
