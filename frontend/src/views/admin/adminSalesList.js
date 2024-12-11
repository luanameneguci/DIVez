import React from 'react';
import '../../App.css';
import 'react-datepicker/dist/react-datepicker.css';
import SalesListBox from '../../components/admin/SalesListBox';


const AdminSalesList = () => {
    return (
        <div className="dashboard-content bg-light w-100">
            <h4 className="title my-2 mx-4">Sales</h4>
            <div className="container">
                <div className="my-4">
                    <SalesListBox />
                </div>
            </div>
        </div>
    );
}
export default AdminSalesList;
