import React from 'react';
import "./ProductsHeader.css";

function ProductsHeader(props) {
  return (
    <div className="image_category mx-auto">
      <img className="img img-fluid" src={props.image} />
    </div>
  )
}

export default ProductsHeader
