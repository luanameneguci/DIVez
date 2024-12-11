import React, { useState, useEffect } from 'react';
import '../../App.css';
import BoughtList from "../../components/buyer/BoughtList";

const BuyerPurchasesList = ({ userId }) => {
    const [purchases, setPurchases] = useState([]);
    const idUser = 6;

    useEffect(() => {
        // Fetch data from your API endpoint
        fetch(`http://localhost:8080/cart/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                // Process the received data into the format needed for the list
                const formattedList = data.map(cart => ({
                    idBill: cart.bills.length > 0 ? cart.bills[0].idBill : '', 
                    productList: cart.products.map(product => product.productName).join(', '), // Concatenate product names
                    billDate: cart.bills.length > 0 ? new Date(cart.bills[0].billDate).toLocaleDateString() : '',
                    numberOfLicenses: cart.licensesCount,
                    cartPrice: cart.cartPrice
                })).filter(cart => cart.idBill !== ''); // Filter out entries with empty idBill

                setPurchases(formattedList);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [idUser]); // Add idUser to dependency array to re-fetch when idUser changes

    return (
        <div className="dashboard-content bg-light w-100 h-100">
            <div className='d-flex justify-content-between p-2 mx-3'>
                <h4 className="title my-2">Purchases</h4>
            </div>
            <div className="p-3">
                <BoughtList rows={purchases} />
            </div>
        </div>
    );
}

export default BuyerPurchasesList;
