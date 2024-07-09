import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../../App.css'; // Import your global CSS file for consistency with other components

const PackageAdd = () => {
    const [productList, setProductList] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [packageName, setPackageName] = useState('');
    const [packagePrice, setPackagePrice] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/product');
                const products = response.data.map(product => ({
                    value: product.idProduct,
                    label: product.productName
                }));
                setProductList(products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleCreatePackage = async () => {
        const packageData = {
            packageName,
            packagePrice,
            products: selectedProducts.map(product => product.value)
        };

        try {
            const response = await axios.post('http://localhost:8080/package/create', packageData);
            alert('Package created:', response.data);
            // Handle success (e.g., redirect or show a message)
        } catch (error) {
            console.error("Error creating package:", error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="container p-2 bg-light">
            <div className="box-container bg-white roundbg d-flex h-100 p-2 mt-4 shadow mx-5">
                <div className="col-12">
                    <h2 className='text-start p-3'>New Package</h2>
                    <form>
                        <div className="row mx-1">
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="productnameinput">Package Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productnameinput"
                                        value={packageName}
                                        onChange={(e) => setPackageName(e.target.value)}
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="productpriceinput">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="productpriceinput"
                                        value={packagePrice}
                                        onChange={(e) => setPackagePrice(e.target.value)}
                                        placeholder="Price"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="packagesinput">Add Products</label>
                                    <Select
                                        id="packagesinput"
                                        options={productList}
                                        isMulti
                                        placeholder="Choose Products..."
                                        className="form-control p-0"
                                        onChange={setSelectedProducts}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="row d-flex flex-row m-3">
                        <div className="col-8"></div>
                        <div className="col-4 d-flex">
                            <div className="col-6 me-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-success col-12 hover"
                                    onClick={handleCreatePackage}
                                >
                                    Create
                                </button>
                            </div>
                            <div className="col-6">
                                <button type="button" className="btn btn-outline-danger col-12">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PackageAdd;
