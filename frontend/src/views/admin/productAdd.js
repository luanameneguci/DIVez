import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';

const ProductAdd = () => {
    const [newProduct, setNewProduct] = useState({
        idCategory: '',
        productName: '',
        productPrice: '',
        productVersion: '',
        productImage: '',
        productDescription: '',
        productInstalls: '',
        productRating: '',
    });
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/productCategory');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                alert('Error fetching categories. Please try again.');
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value,
        });
    };

    const handleSave = async () => {
        const { idCategory, productName, productPrice, productVersion, productImage, productDescription, productInstalls, productRating } = newProduct;
        if (!idCategory || !productName || !productPrice || !productVersion || !productImage || !productDescription || !productInstalls || !productRating) {
            alert('All fields are required!');
            return;
        }
        setIsLoading(true);
        const url = 'http://localhost:8080/product/create';
    
        try {
            const response = await axios.post(url, newProduct);
            console.log('Response from server:', response);
    
            if (response.status === 201 || response.status === 200) {
                setNewProduct({
                    idCategory: '',
                    productName: '',
                    productPrice: '',
                    productVersion: '',
                    productImage: '',
                    productDescription: '',
                    productInstalls: '',
                    productRating: '',
                });
                alert('Product added successfully!');
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error.response ? error.response.data : error.message);
            alert('Error adding product. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="container p-2 bg-light">
            <div className="box-container bg-white roundbg d-flex h-100 p-2 mt-2 shadow mx-5">
                <div className="col-12">
                    <h2 className='text-start p-3'>New Product</h2>
                    <form>
                        <div className="row mx-1">
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="categoryinput">Category</label>
                                    <select
                                        className="form-control"
                                        id="categoryinput"
                                        name="idCategory"
                                        value={newProduct.idCategory}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.idCategory} value={category.idCategory}>
                                                {category.category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="productnameinput">Product Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productnameinput"
                                        name="productName"
                                        placeholder="Name"
                                        value={newProduct.productName}
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
                                        value={newProduct.productPrice}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="descriptioninput">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="descriptioninput"
                                        name="productDescription"
                                        rows="2"
                                        maxLength="300"
                                        value={newProduct.productDescription}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="productversioninput">Product Version</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        id="productversioninput"
                                        name="productVersion"
                                        placeholder="Version"
                                        value={newProduct.productVersion}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="installationsinput">Installations</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="installationsinput"
                                        name="productInstalls"
                                        placeholder="Installations"
                                        value={newProduct.productInstalls}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="imagelinkinput">Image</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imagelinkinput"
                                        name="productImage"
                                        placeholder="Image URL"
                                        value={newProduct.productImage}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="ratinginput">Rating</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        id="ratinginput"
                                        name="productRating"
                                        placeholder="Rating"
                                        value={newProduct.productRating}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="row d-flex flex-row m-3">
                        <div className='col-10'></div>
                        <div className="col-2">
                            <button 
                                type="button" 
                                className="btn btn-outline-success col-12 hover" 
                                onClick={handleSave} 
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductAdd;
