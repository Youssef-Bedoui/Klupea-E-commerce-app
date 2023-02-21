import React,{useContext} from 'react';
import "../InnerCategories.css";
import { AuthContext } from "../../../context/AuthProvider.js";

function KidsCategories(props) {

    const { theme } = useContext(AuthContext);

    return (
        <div className={`Category_sections ${theme} my-4 mx-auto`}>
            <h4 className="fw-bold py-2 text-center">Clothes</h4>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-3 col-md-6 section_container">
                    <a href="/Kids/T-shirts_boy">
                        <div className="category_image">
                            <img className="img img-fluid" src={props.image1} />
                            <p className="cloth_title text-center">T-Shirt boys</p>
                        </div>
                    </a>
                </div>
                <div className="col-lg-3 col-md-6 section_container">
                    <a href="/Kids/T-shirts_girl">
                        <div className="category_image">
                            <img className="img img-fluid" src={props.image2} />
                            <p className="cloth_title text-center">T-Shirt girls</p>
                        </div>
                    </a>
                </div>

                <div className="col-lg-3 col-md-6 section_container">
                    <a href="/Kids/Sweaters_boy">
                        <div className="category_image">
                            <img className="img img-fluid" src={props.image3} />
                            <p className="cloth_title text-center">Sweater boys</p>
                        </div>
                    </a>
                </div>

                <div className="col-lg-3 col-md-6 section_container">
                    <a href="/Kids/Sweaters_girl">
                        <div className="category_image">
                            <img className="img img-fluid" src={props.image4} />
                            <p className="cloth_title text-center">Sweater girls</p>
                        </div>
                    </a>
                </div>

                <div className="col-lg-3 col-md-6 section_container">
                    <a href="/Kids/Pants_boy">
                        <div className="category_image">
                            <img className="img img-fluid" src={props.image5} />
                            <p className="cloth_title text-center">Pants boys</p>
                        </div>
                    </a>
                </div>

                <div className="col-lg-3 col-md-6 section_container">
                    <a href="/Kids/Pants_girl">
                        <div className="category_image">
                            <img className="img img-fluid" src={props.image6} />
                            <p className="cloth_title text-center">Pants girls</p>
                        </div>
                    </a>
                </div>
                <div className="col-lg-3 col-md-6 section_container">
                    <a href="/Kids/Skirts">
                        <div className="category_image">
                            <img className="img img-fluid" src={props.image7} />
                            <p className="cloth_title text-center">Skirts</p>
                        </div>
                    </a>
                </div>
                <div className="col-lg-3 col-md-6 section_container">
                    <a href="/Kids/Shoes_boy">
                        <div className="category_image">
                            <img className="img img-fluid" src={props.image8} />
                            <p className="cloth_title text-center">Shoes boys</p>
                        </div>
                    </a>
                </div>
                <div className="col-lg-3 col-md-6 section_container">
                    <a href="/Kids/Shoes_girl">
                        <div className="category_image">
                            <img className="img img-fluid" src={props.image9} />
                            <p className="cloth_title text-center">Shoes girls</p>
                        </div>
                    </a>
                </div>
                <div className="col-lg-3 col-md-6 section_container">
                    <a href="/Kids/Jackets_boy">
                        <div className="category_image">
                            <img className="img img-fluid" src={props.image10} />
                            <p className="cloth_title text-center">Jackets & coats boys</p>
                        </div>
                    </a>
                </div>
                <div className="col-lg-3 col-md-6 section_container">
                    <a href="/Kids/Jackets_girl">
                        <div className="category_image">
                            <img className="img img-fluid" src={props.image11} />
                            <p className="cloth_title text-center">Jackets & coats girls</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default KidsCategories
