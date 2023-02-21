import React, { useContext, useState } from 'react';
import "./Subscribe.css";
import config from "../../config.json";
import { AuthContext } from "../context/AuthProvider.js";
import axios from "axios";
import ReactJsAlert from "reactjs-alert";
function Subscribe() {

  const [email, setEmail] = useState("");
  const [isAlertActive, setIsAlertActive] = useState(false);

  const { theme } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${config.SERVER_URL}/newsletter`, { email }).then((result) => {
      setIsAlertActive(true);
      setEmail("");
    })
  }

  return (
    <div className={`subscribe ${theme} py-md-4 py-2 text-center text-md-start`}>
      <ReactJsAlert
        status={isAlertActive}   // true or false
        type="success"   // success, warning, error, info
        color="#0B62E0"
        title="Welcome! You are subscribed in Klupea Newsletter !"   // title you want to display
        Close={() => setIsAlertActive(false)}   // callback method for hide
        autoCloseIn="4000"
      />
      <div className='container'>
        <form className='row d-flex align-items-center '>
          <div className='col-sm-12 col-md-6 col-lg-3 mb-2 mb-md-0'>
            <div className=' fw-bold fs-6'>Subscribe to our Newsletter :</div>
          </div>
          <div className='col-sm-12 col-md-6 col-lg-5'>
            <input onChange={(e) => { setEmail(e.target.value) }} className='p-2 bg-light email_input' type="email" placeholder='Enter Email Address' />
          </div>
          <div className='col-4 col-lg-2 mx-auto mt-2 mt-md-0'>
            <button onClick={handleSubmit} className="btn border-rounded w-100 subscribe_btn">Subscribe</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Subscribe
