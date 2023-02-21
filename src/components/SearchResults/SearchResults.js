import React, { useEffect, useState } from "react";
import AllProducts from "../ProductsLists/CategoryComponents/AllProducts/AllProducts.js";
import config from "../../config.json";
import Subscribe from "../Subscribe/Subscribe";
import Footer from "../Reusable/Footer/Footer";
import axios from "axios";
import Nav from "../Reusable/Navs/Main_Nav/Nav";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);

  const [totalProductsNumber, setTotalProductsNumber] = useState(0);

  useEffect(() => {
    axios
      .get(`${config.SERVER_URL}/products/search/${state.name}`)
      .then((result) => {
        setTotalProductsNumber(result.data.length);
        setProducts(result.data);
      });
  }, [state.name]);

  return (
    <div>
      <Nav />

      <div className="container pt-2">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li class="breadcrumb-item">
              <a href="/">Search</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {state.name}
            </li>
          </ol>
        </nav>
        {/*image*/}

        <AllProducts
          products={products}
          totalProductsNumber={totalProductsNumber}
          filterProducts={setProducts}
        />
      </div>

      <Subscribe />
      <Footer />
    </div>
  );
}

export default SearchResults;
