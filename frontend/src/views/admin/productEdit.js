import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
    const { idProduct } = useParams();
    const [product, setProduct] = useState({
        productName: '',
        productPrice: '',
        productDescript: '',
        image: '',
    });
    const [editedProduct, setEditedProduct] = useState({
        productName: '',
        productPrice: '',
        productDescript: '',
        image: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/product/${idProduct}`);
                const data = response.data;
                setProduct(data);
                setEditedProduct(data); // Set initial editedProduct state
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError(error);
                setIsLoading(false);
            }
        };

        loadProduct();
    }, [idProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({
            ...editedProduct,
            [name]: value,
        });
    };

    const handleSave = async () => {
        const url = `http://localhost:8080/product/update/${idProduct}`;

        try {
            const response = await axios.put(url, editedProduct);
            console.log('Response from server:', response.data);

            if (response.data && response.data.product) {
                setProduct(response.data.product); // Update local state with updated data
                alert('Product updated successfully!');
            } else {
                alert('Failed to update product.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching product details: {error.message}</div>;
    }

    return (
        <div className="dashboard-content bg-light w-100 p-2 mt-4">
            <div className="container">
                <div className="box-container bg-white roundbg d-flex h-100 p-2 shadow">
                    <div className="col-12">
                        <h2 className='text-start p-3'>{product.productName}</h2>
                        <form>
                            <div className="row mx-1">
                                <div className="col-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="productnameinput">Product Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="productnameinput"
                                            name="productName"
                                            placeholder="Name"
                                            value={editedProduct.productName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="productpriceinput">Unit Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="productpriceinput"
                                            name="productPrice"
                                            placeholder="Unit Price"
                                            value={editedProduct.productPrice}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="descriptioninput">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="descriptioninput"
                                            name="productDescript"
                                            rows="2"
                                            maxLength="300" // Adjusted to match backend max length
                                            value={editedProduct.productDescript}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="imagelinkinput">Image</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="imagelinkinput"
                                            name="image"
                                            placeholder="Image URL"
                                            value={editedProduct.image}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="row d-flex flex-row m-3">
                            <div className='col-10'></div>
                            <div className="col-2">
                                <button type="button" className="btn btn-outline-success col-12 hover" onClick={handleSave}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
