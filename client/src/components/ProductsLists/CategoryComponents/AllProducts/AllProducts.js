import React, {useContext, useEffect, useState } from 'react';
import "./AllProducts.css";
import { useNavigate } from "react-router-dom";
import Product from "../../../Reusable/SingleProduct/Product";
import { AuthContext } from "../../../context/AuthProvider.js";
import noProducts_img from "../../../../images/no_products.png";

function InnerCategory(props) {

  const { theme } = useContext(AuthContext);
  const navigate = useNavigate();

  const [filterText, setFilterText] = useState("Latest products");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  //filters
  const filterByLatest = () => {
    props.filterProducts(props.products.sort((a, b) => {
      const arrivalDateA = new Date(a.arrivalDate.split('/').reverse().join('-'));
      const arrivalDateB = new Date(b.arrivalDate.split('/').reverse().join('-'));
      return arrivalDateB.getTime() - arrivalDateA.getTime();
    }));
  };
  const filterByAscPrice = () => {
    props.filterProducts(props.products.sort((a, b) => {
      return a.price - b.price
    }))
  };
  const filterByDescPrice = () => {
    props.filterProducts(props.products.sort((a, b) => {
      return b.price - a.price
    }))
  }

  //pages Numbers
  const numberOfPages = Math.ceil(props.products.length / itemsPerPage);
  const pages = [];

  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i)
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.products.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map(number => {
    return (
      <li key={number} id={number} onClick={() => number > 1 ? window.scrollTo({ top: 650, behavior: 'smooth' }) : null}>
        {number}
      </li>
    )
  })

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  }

  return (
    <div className={`items ${theme} py-2 mb-3`} id="top_page">
      <div className="container">
        <div className="row d-flex justify-content-center" id="products">
          <div className="filter_header">
            <div className="">
              <p><span className="fw-bold">{currentItems > itemsPerPage.length ? itemsPerPage : currentItems.length}</span> products of {props.totalProductsNumber}</p>
            </div>
            <div className="filter_dropdown dropdown">
              <button className="btn border dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Filter By: {filterText}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li onClick={() => { filterByLatest(); setFilterText("Latest products"); }}><a className="dropdown-item" href="#products">Latest products</a></li>
                <li onClick={() => { filterByAscPrice(); setFilterText("Ascending price"); }}><a className="dropdown-item" href="#products">Ascending price</a></li>
                <li onClick={() => { filterByDescPrice(); setFilterText("Decreasing price"); }}><a className="dropdown-item" href="#products">Decreasing price</a></li>
                <li onClick={() => { setFilterText("High Noted"); }}><a className="dropdown-item" href="#products">High Noted</a></li>
              </ul>
            </div>
          </div>
          <hr />
          {console.log(currentItems)}
          {currentItems.length ? (currentItems.map((item, index) => {
            return (
              <Product key={item.id} item={item} index={index} navigate={navigate} />
            )
          })) :
            <div className="d-flex flex-column justify-content-center align-items-center p-3">
              <img src={noProducts_img} className="img-fluid" />
              <h5 className="fw-bold">Sorry, No products found !</h5>
            </div>
          }
          {/*Page Numbers*/}
          <ul className="pageNumbers_sec">
            <span className="pages">Pages :</span> <span className="pageNumbers" onClick={renderPageNumbers.length !== 0 && handleClick}>{renderPageNumbers}</span>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default InnerCategory
