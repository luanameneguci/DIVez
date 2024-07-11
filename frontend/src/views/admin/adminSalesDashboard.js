import React from 'react';
import '../../App.css';
import notificationicon from "../../images/notification.png";
import Box from '../../components/admin/Box';
import SalesGraph from '../../components/admin/SalesGraph';

const AdminSalesDashboard = () => {
    return (
        <div className="bg-light w-100">
            <h4 className="title my-2">Product Name</h4>
            <div className="container text-center">
                <div className="d-flex bg-light justify-content-between">
                    <div className="col mx-1 bg-white roundbg">
                        <Box title="Pending Sales" number="20" image={notificationicon} />
                    </div>
                    <div className="col mx-1 bg-white roundbg">
                        <Box title="Sales this month" number="20" image={notificationicon} />
                    </div>
                    <div className="col mx-1 bg-white roundbg">
                        <Box title="Profit this month" number="20" image={notificationicon} />
                    </div>
                </div>
                <div className="my-4 bg-white roundbg container">
                    <SalesGraph />
                </div>
            </div>
        </div>
    );
};

export default AdminSalesDashboard;
