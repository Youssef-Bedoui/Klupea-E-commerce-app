import React from 'react';
import "./BrandSection.css";
const brand1 = require("../../images/brand_logos/25-min-2.jpg");
const brand2 = require("../../images/brand_logos/1-14734_adidas-logo-png.png");
const brand3 = require("../../images/brand_logos/41bdfe4f07e9d592fd32e277b9bee487.jpg");
const brand4 = require("../../images/brand_logos/508-5082031_clothes-brand-logo-png-transparent-png.png");
const brand5 = require("../../images/brand_logos/Giorgio_Armani_logo.jpg");
const brand6 = require("../../images/brand_logos/Calvin-Klein-logo.png");
const brand7 = require("../../images/brand_logos/HM-Logo-1968-99.png");
const brand8 = require("../../images/brand_logos/b8233276-c667-44f0-b120-83806c48ad53.png_Chanel+Logo.png");
const brand9 = require("../../images/brand_logos/ee2fe40df06bbc64da86516bea50e8a8.jpg");
const brand10 = require("../../images/brand_logos/nikelogo.jpg");
const brand11 = require("../../images/brand_logos/PUMA-logo.jpg");
const brand12 = require("../../images/brand_logos/Lacoste-Logo-2011-present.jpg");

function BrandSection() {
    return (
        <div className="brands_section">
            <h3 className="text-center py-2 brands_header">Our Brands</h3>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-2 col-md-3 col-5 brand_inner">
                    <img className="img_fluid brand_img" src={brand1} />
                </div>
                <div className="col-lg-2 col-md-3 col-5 brand_inner">
                    <img className="img_fluid brand_img" src={brand2} />
                </div>
                <div className="col-lg-2 col-md-3 col-5 brand_inner">
                    <img className="img_fluid brand_img" src={brand3} />
                </div>
                <div className="col-lg-2 col-md-3 col-5 brand_inner">
                    <img className="img_fluid brand_img" src={brand4} />
                </div>
                <div className="col-lg-2 col-md-3 col-5 brand_inner">
                    <img className="img_fluid brand_img" src={brand5} />
                </div>
                <div className="col-lg-2 col-md-3 col-5 brand_inner">
                    <img className="img_fluid brand_img" src={brand6} />
                </div>
                <div className="col-lg-2 col-md-3 col-5 brand_inner">
                    <img className="img_fluid brand_img" src={brand7} />
                </div>
                <div className="col-lg-2 col-md-3 col-5 brand_inner">
                    <img className="img_fluid brand_img" src={brand8} />
                </div>
                <div className="col-lg-2 col-md-3 col-5 brand_inner">
                    <img className="img_fluid brand_img" src={brand9} />
                </div>
                <div className="col-lg-2 col-md-3 col-5 brand_inner">
                    <img className="img_fluid brand_img" src={brand10} />
                </div>
                <div className="col-lg-2 col-md-3 col-5 brand_inner">
                    <img className="img_fluid brand_img" src={brand11} />
                </div>
                <div className="col-lg-2 col-md-3 col-5 brand_inner">
                    <img className="img_fluid brand_img" src={brand12} />
                </div>
            </div>
        </div>
    )
}

export default BrandSection