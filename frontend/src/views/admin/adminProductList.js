import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';
import ProductList from '../../components/admin/ProductList';

const AdminProductList = () => {
    return (
        <div className="dashboard-content bg-light w-100">
            <div className='d-flex justify-content-between'>
                <h4 className="title my-2 mx-4">Products</h4>
                <div className="my-3 col-5 d-flex justify-content-end">
                <div className="col-auto">
                        <Link to='/product' className="btn btn-block text-info hover1 mx-3"
                            style={{ backgroundColor: "#C8F2FE" }}><strong>Add Product</strong></Link>
                    </div>
                    <div className="col-auto">
                        <Link to='/package' className="btn btn-block text-info hover1 mx-3"
                            style={{ backgroundColor: "#C8F2FE" }}><strong>Add Package</strong></Link>
                    </div>
                </div>
            </div>
            <ProductList />
        </div >
    );
}

export default AdminProductList;
