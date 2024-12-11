import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import ClientListBox from '../../components/admin/ClientListBox';

const AdminClientList = () => {
    const [clientList, setClientList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:8080/user');
                const users = userResponse.data;

                // Filter out admins and map users to the desired structure
                const filteredUsers = users
                    .filter(user => user.idAccountType === 2 || user.idAccountType === 3)
                    .map(user => {
                        let userType;
                        if (user.idAccountType === 2) {
                            userType = 'Buyer';
                        } else if (user.idAccountType === 3) {
                            userType = 'Manager';
                        }
                        return [
                            user.userName,
                            user.userNif,
                            user.userEmail,
                            userType,
                            user.idUser
                        ];
                    });

                setClientList(filteredUsers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-content bg-light w-100">
            <h4 className="title my-2 mx-4">Clients</h4>
            <div className="container">
                <div className="my-4">
                    <ClientListBox clientList={clientList} />
                </div>
            </div>
        </div>
    );
}

export default AdminClientList;
