import React, { useState } from "react";
import LoginNav from "../../Reusable/Navs/Login_Nav/Login_Nav";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import axios from "axios";
import config from "../../../config.json";
import PopUpSuccessAlert from "../../Reusable/PopUpAlert/PopUpAlert";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailResponse, setEmailResponse] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [activationCode, setActivationCode] = useState("");

  const resetAlert = () => {
    setTimeout(() => {
      setAlert(false);
      if (emailResponse === "Email sent successfully") {
        navigate("/resetPassword");
      }
    }, 5000);
  };

  //generateActivationCode
  const generateActivationCode = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 32; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setActivationCode(code);
  };

  useEffect(() => {
    generateActivationCode();
  }, [alert]);

  const resetPassword = async () => {
    try {
      const response = await axios.post(`${config.SERVER_URL}/sendMail`, {
        receiver: email,
        subject: "Klupea - RESET PASSWORD EMAIL",
        text: `${config.CLIENT_URL}/resetPassword/${activationCode}`,
        activationCode: activationCode,
      });
      setEmailResponse(response.data);
      response.data === "Email sent successfully"
        ? setAlertType("success")
        : setAlertType("alert");
      setAlert(true);
      resetAlert();
    } catch (error) {
      setEmailResponse("An Error Occured , please retry .");
      setAlertType("alert");
      setAlert(true);
      resetAlert();
    }
  };

  return (
    <div className="vh-100">
      <LoginNav />
      <div className="d-flex justify-content-center align-items-center vh-60">
        <div className="text-center mx-auto my-2 w-lg-50 border border-rounded">
          <LockResetRoundedIcon style={{ fontSize: "50px" }} className="my-2" />
          <h3 className="my-3 fw-bold">Password Reset</h3>
          <p className="mb-4 fw-bold w-75 mx-auto">
            Enter your email address and we'll send you an email with
            instructions to reset your password.
          </p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control w-75 mx-auto my-4"
            placeholder="Email..."
            required
          />
          <button
            onClick={resetPassword}
            className="btn btn-lg btn-primary w-50 my-2"
          >
            RESET PASSWORD
          </button>
        </div>
      </div>
      <PopUpSuccessAlert
        text={emailResponse}
        showAlertWishSuccess={alert}
        alertType={alertType}
      />
    </div>
  );
}

export default ForgetPassword;
