import React from "react";
import ProductsHeader from "../../CategoryComponents/CategoryHeader/ProductsHeader";
import AllProducts from "../../CategoryComponents/AllProducts/AllProducts";
import WomenCategories from "./WomenCategories";
import config from "../../../../config.json";
import Tshirt from "../../../../images/women Categories/My project (8).png";
import Sweaters from "../../../../images/women Categories/My project (5).png";
import Pants from "../../../../images/women Categories/My project (3).png";
import Skirts from "../../../../images/women Categories/skirts.png";
import Shoes from "../../../../images/women Categories/My project (7).png";
import HighHeels from "../../../../images/women Categories/My project (6).png";
import Underwear from "../../../../images/women Categories/My project (2).png";
import Jackets from "../../../../images/women Categories/My project (9).png";
import Subscribe from "../../../Subscribe/Subscribe";
import Footer from "../../../Reusable/Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../../../Reusable/Navs/Main_Nav/Nav";

function WomenProducts({ image, category }) {
  const [products, setProducts] = useState([]);

  const [totalProductsNumber, setTotalProductsNumber] = useState(0);

  useEffect(() => {
    if (!category) {
      axios.get(`${config.SERVER_URL}/products/women`).then((result) => {
        setTotalProductsNumber(result.data.length);
        setProducts(result.data);
      });
    } else {
      axios
        .get(`${config.SERVER_URL}/products/women/${category}`)
        .then((result) => {
          setTotalProductsNumber(result.data.length);
          setProducts(result.data);
        });
    }
  }, []);

  return (
    <div>
      <Nav />

      <div className="container pt-2">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Women
            </li>
          </ol>
        </nav>
        {/*image*/}
        <ProductsHeader image={image} />

        <WomenCategories
          image1={Tshirt}
          image2={Sweaters}
          image3={Pants}
          image4={Skirts}
          image5={Shoes}
          image6={HighHeels}
          image7={Underwear}
          image8={Jackets}
        />

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

export default WomenProducts;
