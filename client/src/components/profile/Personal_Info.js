import React, { useContext, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { AuthContext } from "../context/AuthProvider.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Personal_Info() {
  const { user,setUser } = useContext(AuthContext);

  const [isModifying, setIsModifying] = useState(false);
  const [userName, setUserName] = useState(user[0].userName);
  const [address, setAddress] = useState(user[0].address);
  const [city, setCity] = useState(user[0].city);
  const [phone, setPhone] = useState(user[0].phone);
  const [orders, setOrders] = useState([]);

  const showFailMessage = () => {
    toast.error("Address Modification Failed !");
  };
  const showSuccessMessage = () => {
    toast.success("Address Modified Successfully !");
  };

  const modifyAddress = async () => {
    const newInfo = {};

    if (userName) {
      newInfo.userName = userName;
    }
    if (address) {
      newInfo.address = address;
    }
    if (city) {
      newInfo.city = city;
    }
    if (phone) {
      newInfo.phone = phone;
    }
    const userID = localStorage.getItem("userID");
    try {
      const response = await axios.patch(
        `${config.SERVER_URL}/signIn/updateUser/${user[0].id}`,
        newInfo
      );
      setIsModifying(false);
      showSuccessMessage();
      const dataResponse = await axios.get(
        `${config.SERVER_URL}/signIn/userInfo/${userID}`
      );
      localStorage.setItem("user", JSON.stringify(dataResponse.data));
      setUser(dataResponse.data);
    } catch (error) {
      console.log(error);
      showFailMessage();
    }
  };

  return (
    <div className="col-lg-9 col-md-9 col-12">
      <div>
        <ToastContainer />
      </div>
      <div className="personal_info border p-3 my-3 mt-3">
        <p className="fw-bold mt-3">PERSONAL INFORMATION</p>
        <hr />
        <p className="name">{user[0].userName}</p>
        <p className="email">{user[0].email}</p>
      </div>
      <div className="personal_info border p-3 my-3">
        <div className="d-flex justify-content-between align-items-center pb-0 mt-3">
          <p className="fw-bold m-0">ADDRESSES</p>
          {isModifying ? (
            <div
              onClick={modifyAddress}
              className="save d-flex justify-content-center align-items-center mt-2 text-success"
            >
              <i class="fa fa-check-square fs-2" aria-hidden="true"></i>
            </div>
          ) : (
            <i
              onClick={() => {
                setIsModifying(!isModifying);
              }}
              class="fa fa-pencil edit"
              aria-hidden="true"
            ></i>
          )}
        </div>
        <hr />
        <p className="name">{user[0].userName}</p>
        <p>{isModifying ? "Modify Address" : "Default address :"}</p>

        {isModifying ? (
          <input
            className="address_inp"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
            defaultValue={user[0].userName ? user[0].userName : null}
            placeholder="UserName"
          />
        ) : (
          <p className="m-0 def_address">{user[0].userName}</p>
        )}
        {isModifying ? (
          <input
            className="address_inp"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="text"
            defaultValue={user[0].address ? user[0].address : null}
            placeholder="Address"
          />
        ) : (
          <p className="m-0 def_address">{user[0].address}</p>
        )}
        {isModifying ? (
          <input
            className="address_inp"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            type="text"
            defaultValue={user[0].city ? user[0].city : null}
            placeholder="City"
          />
        ) : (
          <p className="m-0 def_address">{user[0].city}</p>
        )}
        {isModifying ? (
          <input
            className="address_inp"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            type="text"
            defaultValue={user[0].phone ? user[0].phone : null}
            placeholder="Phone"
          />
        ) : (
          <p className="m-0 def_address">{user[0].phone}</p>
        )}
      </div>
    </div>
  );
}

export default Personal_Info;
