import React, { useState } from 'react';
import '../../App.css';

/* não tenho a certeza como fazer isto com a base de dados, não sei pq mas não estava a conseguir juntar
mas provavelmente era burrice*/
const budgetProducts = [
    {
        nome: "Adobe Animate",
        img: "https://img.icons8.com/?size=100&id=FK8AfMKCrwOU&format=png&color=000000",
        amount: 10,
    },
    {
        nome: "Adobe Photoshop",
        img: "https://img.icons8.com/?size=100&id=13677&format=png&color=000000",
        amount: 10,
    },
    {
        nome: "Adobe Illustrator",
        img: "https://img.icons8.com/?size=100&id=13631&format=png&color=000000",
        amount: 10,
    },
];


const BuyerBudgetReply = ({ userId }) => {
    return (
        <div className="container bg-light w-100 p-2x">
            <div className="container">
                <div className="box-container bg-white roundbg h-100 p-4 shadow">
                    <div className="row border-bottom">
                        <h4 className='text-start'>Budget Nº 123</h4>
                        <p className='text-start'>Items on this budget: 3</p>
                    </div>
                    <div className="row m-2 border-bottom">
                        <div className='col-5'>
                            <p><strong>Product</strong></p>
                        </div>
                        <div className='col-3'>
                        <p><strong>Ammout</strong></p>
                        </div>
                    </div>
                    <div className="col-12">
                        {budgetProducts.map((product, index) => (
                            <div className="row border-bottom m-2">
                                <div key={index} className="d-flex align-items-center">
                                    <img src={product.img} alt={product.nome} className="me-3 col-1" style={{ width: '70px', height: '70px' }} />
                                    <span className='fw-semibold col-4'>{product.nome}</span>
                                    <span className='col-5 ms-4'><strong>{product.amount}</strong></span>
                                    <button className="btn btn-danger col-2">Remove product</button>
                                </div>
                            </div>
                        ))}
                        <button className='bg-info hover roundbg py-3 px-4 border-0 m-4 shadow col-3 text-center text-white'><strong>Add more products</strong></button>
                    </div>
                    <form action="" className='row d-flex mt-4'>
                        <div className=" mb-3 col-8">
                            <label htmlFor="descriptioninput">Description</label>
                            <textarea className="form-control" id="descriptioninput" rows="3" maxLength="250"></textarea>
                        </div>
                        <div className=" mb-3 col">
                            <label htmlFor="productpriceinput">Asking price</label>
                            <input type="number" className="form-control" id="productpriceinput" placeholder="Asking price" />
                            <div className="row d-flex mt-3 justify-content-end">
                                <div className="col-6">
                                    <button type="button" className="btn btn-info text-white hover shadow col-12">Send</button>
                                </div>
                                <div className="col-6">
                                    <button type="button" className="btn btn-danger hover shadow col-12">Delete</button>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default BuyerBudgetReply;
