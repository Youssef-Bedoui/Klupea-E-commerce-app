import React from "react";
import "./SignUp.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../../config.json";
import LoginNav from "./../../Reusable/Navs/Login_Nav/Login_Nav";
import PopUpSuccessAlert from "../../Reusable/PopUpAlert/PopUpAlert";
import CircleSpinner from "./../../spinner/CircleSpinner";

function SignUp() {
  const navigate = useNavigate();

  const [spinner, setSpinner] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [activationCode, setActivationCode] = useState("");
  //SignUp alert
  const [emailResponse, setEmailResponse] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  //formWarning
  const [formAlert, setFormAlert] = useState(false);
  const [formWarning, setFormWarning] = useState(
    "Please Fill all the fields !"
  );

  //generateActivationCode send with email
  const generateEmailCode = () => {
    const chars = "0123456789";
    let code = "";
    for (let i = 0; i < 15; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setActivationCode(code);
  };

  useEffect(() => {
    generateEmailCode();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!userName || !email || !password || !address || !city || !phone) {
      setFormAlert(true);
      setTimeout(() => {
        setFormAlert(false);
      }, 3000);
      return;
    }

    setBtnDisabled(true);
    setSpinner(true);
    try {
      const response = await axios.post(`${config.SERVER_URL}/register`, {
        userName,
        email,
        password,
        address,
        city,
        phone,
        activationCode: activationCode,
      });
      if (!response) {
        console.log("An error occured, please retry!");
        setAlertType("alert");
        setAlert(true);
      }
      if (
        response.data === "A Code has been sent to your email for verification"
      ) {
        setEmailResponse(response.data);
        setAlertType("success");
        setAlert(true);
        localStorage.setItem("email", email);
        setTimeout(() => {
          setAlert(false);
          setBtnDisabled(false);
          navigate("/verifUser");
          setSpinner(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      setEmailResponse("An error occured, please retry!");
      setAlertType("alert");
      setAlert(true);
      setBtnDisabled(false);
      setSpinner(false);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="Register">
      <LoginNav />
      <div className="container_fluid ">
        <PopUpSuccessAlert
          text={formWarning}
          showAlertWishSuccess={formAlert}
          alertType={"alert"}
        />
        <PopUpSuccessAlert
          text={emailResponse}
          showAlertWishSuccess={alert}
          alertType={alertType}
        />
        <div className="row">
          <div
            className="col-sm-8 col-md-6 col-lg-5 col-12 mx-auto card shadow-2-strong card-registration"
            style={{ borderRadius: "15px" }}
          >
            <div className="card-body py-0 px-4">
              <div className="d-flex justify-content-around align-items-center">
                <h3 className="my-4 fw-bold">Welcome to Klupea</h3>
              </div>
              <form>
                <div className="row">
                  <div className=" mx-auto">
                    <div className="form-outline">
                      <input
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                        type="text"
                        placeholder="UserName*(FirstName,lastName)"
                        id="setUserName"
                        className="form-control form-control "
                      />
                    </div>
                  </div>
                  <div className=" mx-auto">
                    <div className="form-outline">
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        placeholder="Email"
                        id="emailAddress"
                        className="form-control form-control "
                      />
                    </div>
                  </div>
                  <div className="mx-auto">
                    <div className="form-outline">
                      <input
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type="password"
                        placeholder="Password"
                        inputMode="umeric"
                        id="password"
                        className="form-control form-control"
                        minLength={6}
                        maxLength={20}
                      />
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-outline">
                      <input
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                        type="text"
                        placeholder="Address"
                        id="address"
                        className="form-control form-control "
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-outline">
                      <input
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                        type="text"
                        placeholder="City"
                        id="city"
                        className="form-control form-control "
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-outline">
                      <input
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        type="text"
                        placeholder="Phone"
                        id="phone"
                        className="form-control form-control "
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <button
                    disabled={btnDisabled}
                    onClick={handleRegister}
                    className="btn btn-block btn-lg w-100"
                  >
                    SUBMIT
                  </button>
                  {spinner && <CircleSpinner />}
                </div>
                <div className="mt-2">
                  <p>
                    Already have account ?{" "}
                    <a className="text-warning" href="/signIn">
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
