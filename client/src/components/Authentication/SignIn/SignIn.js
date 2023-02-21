/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./SignIn.css";
import { useContext, useState } from "react";
import axios from "axios";
import config from "../../../config.json";
import { useNavigate } from "react-router-dom";
import LoginNav from "../../Reusable/Navs/Login_Nav/Login_Nav";
import { AuthContext } from "../../context/AuthProvider.js";
import PopUpSuccessAlert from "../../Reusable/PopUpAlert/PopUpAlert.js";

function SignIn() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [inputType, setInputType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  //formWarning
  const [formAlert, setFormAlert] = useState(false);
  const [formWarning, setFormWarning] = useState(
    "Please Fill all the fields !"
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setFormAlert(true);
      setTimeout(() => {
        setFormAlert(false);
      }, 3000);
      return;
    }
    try {
      const response = await axios.post(`${config.SERVER_URL}/signIn`, {
        email,
        password,
      });
      if (!response.data.auth) {
        setLoginMessage(response.data.msg);
      } else {
        localStorage.setItem("theme", "light");
        login(response.data.result);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setLoginMessage("An error occured, please try again later.");
    }
  };

  return (
    <div className="signIn">
      <LoginNav />
      <div className="container-fluid">
        <div className="row mx-auto">
          <PopUpSuccessAlert
            text={formWarning}
            showAlertWishSuccess={formAlert}
            alertType={"alert"}
          />
          <div className="wrapper col-sm-8 col-md-6 col-lg-5 col-12 mx-auto py-5">
            <div className="h4 fw-bold mt-1 mb-5 ">Welcome Back</div>
            <form>
              <div className="form-group pb-4">
                <div className="input-field">
                  {" "}
                  <span className="far fa-user p-2"></span>{" "}
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    placeholder="email or Email Address"
                    required
                  />{" "}
                </div>
              </div>
              <div className="form-group py-1 pb-2">
                <div className="input-field">
                  {" "}
                  <span className="fas fa-lock p-2"></span>{" "}
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type={inputType}
                    placeholder="Enter your Password"
                    required
                  />{" "}
                  <button
                    onClick={(e) => {
                      inputType === "password"
                        ? setInputType("text")
                        : setInputType("password");
                      e.preventDefault();
                    }}
                    className="btn bg-white text-muted"
                  >
                    {" "}
                    <span className="far fa-eye-slash"></span>{" "}
                  </button>{" "}
                </div>
              </div>
              <div className="d-flex align-items-start">
                <div className="ml-auto">
                  <a className="forget_btn" href="/forgetPassword" id="forgot">
                    {" "}
                    Forgot Password?
                  </a>{" "}
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="btn btn-block text-center my-3 w-100"
              >
                Log in
              </button>
              {loginMessage && (
                <div className="text-center">
                  <h6 className="alert alert-danger">{loginMessage}</h6>
                </div>
              )}
              <div className="text-center pt-3 ">
                Not a member?
                <a
                  className="ms-2 bg-light text-decoration-underline"
                  href="/SignUp"
                >
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
