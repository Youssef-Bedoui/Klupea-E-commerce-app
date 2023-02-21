import React from 'react';
import "./Bag.css";
import { useNavigate } from "react-router-dom";

function PaymentFinish() {

    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 mx-auto d-flex flex-column justify-content-center align-items-center my-5 border rounded">
                    <i class="fa-solid fa-circle-check fs-1 my-3 text-success"></i>
                    <div className="my-3 d-flex flex-column justify-content-center text-center">
                        <h3 className="fw-bold">Payment Finished !</h3>
                        <h5>Thank you for visiting our site</h5>
                        <button className="btn btn-secondary mt-5" onClick={() => { navigate("/") }}>Go to Home <i class="fa-solid fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PaymentFinish;