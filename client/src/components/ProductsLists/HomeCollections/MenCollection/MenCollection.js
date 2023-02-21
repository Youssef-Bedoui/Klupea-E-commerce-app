import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import "../CollectionsStyle.css";
import { useNavigate } from "react-router-dom";
import config from "../../../../config.json";
import Product from "../../../Reusable/SingleProduct/Product";
import { AuthContext } from "../../../context/AuthProvider.js";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

function MenCollection() {

        const navigate = useNavigate();
        const [menCollection, setMenCollection] = useState([]);
        // const [showAlertWishSuccess, setShowAlertWishSuccess] = useState(false);
        const { theme } = useContext(AuthContext);

        const [scrollIndex, setScrollIndex] = useState(0);
        const maxIndex = menCollection.length - 5;

        const handlePrevClick = () => {
                if (scrollIndex > 0) {
                        setScrollIndex(scrollIndex - 1);
                }
        };

        const handleNextClick = () => {
                if (scrollIndex < maxIndex) {
                        setScrollIndex(scrollIndex + 1);
                }
        };


        useEffect(() => {
                axios.get(`${config.SERVER_URL}/products/men`).then((result) => {
                        setMenCollection(result.data.slice(0, 10));
                })
        }, [])

        return (
                <div id="menCollection" className={`MenCollection ${theme}`}>
                        <div className="container">
                                <div className="row collection_sec d-flex justify-content-center">
                                        <div className="collection_title d-flex justify-content-between align-items-center p-0">
                                                <h2>Men Collection</h2>
                                                <a href="men" className="text-ligt more">See more <ArrowForwardIosRoundedIcon className="more_arrow"/></a>
                                        </div>
                                        <div className="product-list">
                                                <button className="arrows left" onClick={handlePrevClick}><ArrowBackIosNewRoundedIcon className="arrows_icon"/></button>
                                                <div className="product-list-inner mx-auto">
                                                        {menCollection.slice(scrollIndex, scrollIndex + 5).map(item => {
                                                                return (
                                                                        <Product key={item.id} item={item} navigate={navigate} />

                                                                )
                                                        }
                                                        )}
                                                </div>
                                                <button className="arrows right" onClick={handleNextClick}><ArrowForwardIosRoundedIcon className="arrows_icon"/></button>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default MenCollection
