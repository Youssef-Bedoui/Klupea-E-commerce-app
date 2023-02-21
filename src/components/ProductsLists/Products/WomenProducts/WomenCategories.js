import React,{useContext} from 'react';
import "../InnerCategories.css";
import { AuthContext } from "../../../context/AuthProvider.js";

function WomenCategories(props) {

    const { theme } = useContext(AuthContext);

    return (
        <div className={`Category_sections ${theme} my-4 mx-auto`}>
            <h4 className="fw-bold py-2 text-center">Clothes</h4>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-3 col-md-6 section_container">
                    <a href="/Women/T-shirts">
                        <div className="category_image">
                            <img className="img img-fluid" src={props.image1} />
                            <p className="cloth_title text-center">T-Shirts</p>
                        </div>
                    </a>
                </div>

                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Women/Sweaters">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image2} />
                                <p className="cloth_title text-center">Sweaters</p>
                            </div>
                        </a>
                    </div>

                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Women/Pants">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image3} />
                                <p className="cloth_title text-center">Pants</p>
                            </div>
                        </a>
                    </div>

                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Women/Skirts">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image4} />
                                <p className="cloth_title text-center">Skirts</p>
                            </div>
                        </a>
                    </div>

                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Women/Shoes">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image5} />
                                <p className="cloth_title text-center">Shoes</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Women/Highheels">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image6} />
                                <p className="cloth_title text-center">High Heels</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Women/Jackets">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image8} />
                                <p className="cloth_title text-center">Jackets & coats</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Women/Underwear">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image7} />
                                <p className="cloth_title text-center">Underwear</p>
                            </div>
                        </a>
                    </div>
            </div>
        </div>
    )
}

export default WomenCategories
