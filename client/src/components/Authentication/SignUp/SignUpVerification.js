import React, { useState, useEffect } from "react";
import LoginNav from "./../../Reusable/Navs/Login_Nav/Login_Nav";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PopUpSuccessAlert from "../../Reusable/PopUpAlert/PopUpAlert";
import CircleSpinner from "../../spinner/CircleSpinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const config = require("../../../config.json");

function SignUpVerification() {
  const navigate = useNavigate();

  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertText, setAlertText] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const verifyUser = async () => {
    setLoading(true);
    const email = localStorage.getItem("email");
    try {
      const response = await axios.post(
        `${config.SERVER_URL}/register/checkUser`,
        { email: email }
      );
      if (response.data[0].activationCode === verificationCode) {
        setAlertType("success");
        setAlertText(`Welcome to Klupea ${response.data[0].firstName}`);
        setLoading(false);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          navigate("/signIn");
        }, 3000);
      }
      if (response.data[0].activationCode !== verificationCode) {
        setAlertType("alert");
        setAlertText("Wrong Code !");
        setAlert(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setAlertType("alert");
      setAlertText("An Error Occured! Please retry.");
      setAlert(true);
    }
  };

  return (
    <div className="vh-100">
      <LoginNav />
      <div className="d-flex justify-content-center align-items-center">
        <div className="text-center mx-auto my-2 w-50 border border-rounded">
          <VpnKeyIcon style={{ fontSize: "50px" }} className="my-2" />
          <h3 className="my-3 fw-bold">Email Verification</h3>
          <p className="mb-4 fw-bold w-75 mx-auto">
            Enter Verification code sent by email.
          </p>
          <input
            onChange={(e) => {
              setVerificationCode(e.target.value);
              setBtnDisabled(e.target.value.length !== 15);
            }}
            type="text"
            className="form-control w-50 mx-auto my-4"
            placeholder="Verification code..."
            width={15}
          />
          <button
            onClick={verifyUser}
            disabled={btnDisabled}
            className="btn btn-lg btn-primary w-50 my-2"
          >
            RESET PASSWORD
          </button>
        </div>
      </div>
      <PopUpSuccessAlert
        text={alertText}
        showAlertWishSuccess={alert}
        alertType={alertType}
      />
      {loading && <CircleSpinner />}
    </div>
  );
}

export default SignUpVerification;
