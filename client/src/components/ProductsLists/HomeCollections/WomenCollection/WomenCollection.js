import React, { useContext, useEffect, useState } from 'react';
import Product from "../../../Reusable/SingleProduct/Product";
import config from "../../../../config.json";
import "../CollectionsStyle.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthProvider.js";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

function KidsCollection() {
    const navigate = useNavigate();
    const [womenCollection, setWomenCollection] = useState([]);
    // const [showAlertWishSuccess, setShowAlertWishSuccess] = useState(false);
    const { theme } = useContext(AuthContext);

    const [scrollIndex, setScrollIndex] = useState(0);
    const maxIndex = womenCollection.length - 5;

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
        axios.get(`${config.SERVER_URL}/products/women`).then((result) => {
            setWomenCollection(result.data.slice(0, 10));
        })
    }, [])



    return (
        <div className={`WomenCollection ${theme}`}>
            <div className="container">
                <div className="row collection_sec d-flex justify-content-center">
                    <div className="collection_title d-flex justify-content-between align-items-center p-0">
                        <h2>Women Collection</h2>
                        <a href="women" className="text-ligt more">See more <ArrowForwardIosRoundedIcon className="more_arrow" /></a>
                    </div>
                    <div className="product-list">
                        <button className="arrows left" onClick={handlePrevClick}><ArrowBackIosNewRoundedIcon className="arrows_icon" /></button>
                        <div className="product-list-inner mx-auto">
                            {womenCollection.slice(scrollIndex, scrollIndex + 5).map(item => {
                                return (
                                    <Product key={item.id} item={item} navigate={navigate} />

                                )
                            }
                            )}
                        </div>
                        <button className="arrows right" onClick={handleNextClick}><ArrowForwardIosRoundedIcon className="arrows_icon" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KidsCollection
