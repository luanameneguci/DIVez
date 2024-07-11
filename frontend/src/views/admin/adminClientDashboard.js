import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import ManagerTicketList from '../../components/admin/ManagerTicketList';
import BuyerBudgetList from '../../components/admin/BuyerBudgetList';
import axios from 'axios';

const numRowsToShow = 5;

const AdminClientDashboard = () => {
  const { idUser } = useParams();
  const [accountType, setAccountType] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${idUser}`);
        const user = response.data;
        const accountTypeResponse = await axios.get(`http://localhost:8080/accounttype/${user.idAccountType}`);
        setAccountType(accountTypeResponse.data.accountType);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [idUser]);

  return (
    <div className="container bg-light w-100">
      <h2 className="title m-3">Client ID: {idUser} - {accountType}</h2>
      <div className="text-center">
        {/*<div className="d-flex justify-content-between">
          <div className="col mx-3 bg-white roundbg">
            <Box title="Pending tickets" number="20" image={notificationicon} />
          </div>
          <div className="col mx-3 bg-white roundbg">
            <Box title="Pending Sales" number="20" image={notificationicon} />
          </div>
          <div className="col mx-3 bg-white roundbg">
            <Box title="Inactive Licences" number="20" image={notificationicon} />
          </div>
          <div className="col mx-3 bg-white roundbg">
            <Box title="Active Licences" number="20" image={notificationicon} />
          </div>
        </div>*/}
        <div className="col-12 d-flex my-4">
          {/*<div className="col mx-3">
            <div className="col-12">
              <h3 className='text-start p-3'>Products</h3>
              <ProductsListBox />
            </div>
          </div>*/}
          <div className="col mx-3">
            <div className="col-12">
              {accountType === 'Manager' ? (
                <>
                  <h3 className='text-start p-3'>Tickets</h3>
                  <ManagerTicketList numRowsToShow={numRowsToShow} clientId={idUser} />
                </>
              ) : (
                <>
                  <h3 className='text-start p-3'>Budgets</h3>
                  <BuyerBudgetList numRowsToShow={numRowsToShow} clientId={idUser} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClientDashboard;
