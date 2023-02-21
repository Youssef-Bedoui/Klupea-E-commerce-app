import React, { useEffect, useState } from "react";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import axios from "axios";
import config from "../../../config.json";
import { useNavigate, useParams } from "react-router-dom";
import LoginNav from "./../../Reusable/Navs/Login_Nav/Login_Nav";
import PopUpSuccessAlert from "../../Reusable/PopUpAlert/PopUpAlert";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [resetResponse, setResetResponse] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");

  const { activationCode } = useParams();
  console.log(activationCode);
  const resetPassword = async () => {
    const response = await axios.post(
      `${config.SERVER_URL}/signIn/restPassword/${activationCode}`,
      { password: password, confirmPass: confirmPass }
    );
    if (response.data === "Password Updated Successfully !") {
      setAlert(true);
      setAlertType("success");
      setResetResponse(response.data);
      setTimeout(() => {
        setAlert(false);
        navigate("/signIn");
      }, 2000);
    } else {
      setAlert(true);
      setAlertType("alert");
      setResetResponse(response.data);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  return (
    <>
      <LoginNav />
      <PopUpSuccessAlert
        text={resetResponse}
        showAlertWishSuccess={alert}
        alertType={alertType}
      />
      <div className="container vh-100">
        <div className="d-flex justify-content-center align-items-center w-100 w-lg-50 mx-auto py-2">
          <div className="d-flex flex-column justify-content-center p-5 border">
            <PasswordRoundedIcon
              style={{ fontSize: "50px" }}
              className="my-2 mx-auto"
            />
            <h3 className="text-center fw-bold my-4">Change your Password</h3>
            <label htmlFor="new-password">New Password:</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="new-password"
              minLength={6}
              maxLength={25}
              className="input my-2 p-1"
              aria-label="New password"
              required
            />
            <label htmlFor="repeat-password">Repeat Password:</label>
            <input
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
              type="password"
              id="repeat-password"
              minLength={6}
              maxLength={25}
              className="input my-2 p-1"
              aria-label="Repeat password"
              required
            />
            <button
              onClick={resetPassword}
              className="btn btn-success d-flex justify-content-center align-items-center mt-2"
            >
              CHANGE PASSWORD
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
