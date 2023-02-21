import React from 'react';
import "./NotConnectedPop.css";
import PersonOffIcon from '@mui/icons-material/PersonOff';


function NotConnectedPop(props) {

    const { theme, showAlert, navigate } = props;
    return (
        <div className="notSignedModal_container">
            <div open={showAlert} position="right center" className={theme === "dark" ? "notSignedModal_content bg-dark" : "notSignedModal_content bg-light"}>
                <div className="d-flex flex-column justify-content-center align-items-center text-center">
                    <div className="fw-bold mb-2"></div>
                    <span><PersonOffIcon className="fs-1" /></span>
                    <h5>You are not connected !</h5>
                    <button onClick={() => { navigate("/signIn") }} className="btn btn-success w-100 my-4">LOGIN</button>
                    <p className="text-left">You don't have account ? <a href="/signUp" className="fw-bold">Register</a></p>
                </div>
            </div>
        </div>
    )
}

export default NotConnectedPop