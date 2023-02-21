import React,{useContext} from 'react';
import "../InnerCategories.css";
import { AuthContext } from "../../../context/AuthProvider.js";

function MenCategories(props) {

    const { theme } = useContext(AuthContext);

    return (
        <div className={`Category_sections ${theme} my-4 mx-auto`}>
            <h4 className="fw-bold py-2 text-center">Clothes</h4>
            <div className="row d-flex-justify-content-center">
                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Men/T-shirts">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image1} />
                                <p className="cloth_title text-center">T-Shirts</p>
                            </div>
                        </a>
                    </div>

                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Men/Sweaters">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image2} />
                                <p className="cloth_title text-center">Sweaters</p>
                            </div>
                        </a>

                    </div>

                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Men/Pants">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image3} />
                                <p className="cloth_title text-center">Pants</p>
                            </div>
                        </a>
                    </div>

                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Men/Suits">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image4} />
                                <p className="cloth_title text-center">Suits</p>
                            </div>
                        </a>
                    </div>

                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Men/Shoes">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image5} />
                                <p className="cloth_title text-center">Shoes</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Men/Jackets">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image6} />
                                <p className="cloth_title text-center">Jackets & Coats</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Men/Underwears">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image7} />
                                <p className="cloth_title text-center">Underwears</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-6 section_container">
                        <a href="/Men/Accessories">
                            <div className="category_image">
                                <img className="img img-fluid" src={props.image8} />
                                <p className="cloth_title text-center">Accessories</p>
                            </div>
                        </a>
                    </div>
                </div>
        </div>
    )
}

export default MenCategories
