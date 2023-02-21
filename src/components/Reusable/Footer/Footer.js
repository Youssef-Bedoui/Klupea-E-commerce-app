import React,{useContext} from 'react';
import "./Footer.css";
import logo from "../../../images/Brand_logo.png";
import { AuthContext } from "../../context/AuthProvider.js";

function Footer() {
    const { theme } = useContext(AuthContext);
    return (
        <div className={`footer ${theme} text-black-50 text-center text-md-start`}>
            <div className="container">
                <div className="row">
                    <div className='col-md-4 col-12 d-flex flex-column justify-content-center align-items-center my-3 text-center'>
                        <img src={logo} className="img img-fluid" alt="Klupea_logo" />
                        <div className="text-light text-center">All rights reserved &copy; - 2022 <span>Klupea</span></div>
                        <div>Created & designed by Youssef Bedoui</div>
                    </div>
                    <div className='col-md-2 col-6 mt-md-5 mt-4'>
                        <div className='links'>
                            <h6>Links</h6>
                            <ul className='list-unstyled'>
                                <li>Home</li>
                                <li>Support</li>
                                <li>Terms and Conditions</li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-md-2 col-6 mt-md-5 mt-3'>
                        <div className='links'>
                            <h6>About Us</h6>
                            <ul className='list-unstyled'>
                                <li>Sign In</li>
                                <li>Register</li>
                            </ul>
                        </div>
                    </div>
                    <div className='contact col-md-4 col-12 mt-md-4'>
                        <h6 className='text-light text-center'>Contact Us</h6>
                        <p className='mt-3 mb-2 text-center'>Get in touch with us via our Email. </p>
                        <p className='btn rounded main-btn w-100 fw-bold border-light text-white' href='#'>Klupea_Team@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
