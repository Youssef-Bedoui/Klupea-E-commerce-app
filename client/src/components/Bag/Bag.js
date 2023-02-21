import React from 'react';
import "./Bag.css";
import PurshaseList from "./PurshaseList.js";
import Nav from "../Reusable/Navs/Main_Nav/Nav";
import { useContext, useState } from "react";
import NotConnectedPop from "../Reusable/NotConnectedPop/NotConnectedPop";
import { AuthContext } from "../context/AuthProvider.js";
import { useNavigate } from "react-router-dom";




function Bag() {
    const navigate = useNavigate();
    const { theme, isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated)

    //modal 
    const [showAlert, setShowAlert] = useState(isAuthenticated ? false : true);


    return (
        <div className={`Bag ${theme}`}>
            <Nav />
            {isAuthenticated ? (<div className="bag_main">
                <PurshaseList />
            </div>) : (
                <NotConnectedPop theme={theme} showAlert={showAlert} navigate={navigate} />
            )}
        </div>
    )
}

export default Bag;