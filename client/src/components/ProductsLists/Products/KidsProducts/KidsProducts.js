import React, { useContext, useEffect, useState } from "react";
import ProductsHeader from "../../CategoryComponents/CategoryHeader/ProductsHeader";
import AllProducts from "../../CategoryComponents/AllProducts/AllProducts";
import KidsCategories from "./KidsCategories";
import config from "../../../../config.json";
import Tshirt_boy from "../../../../images/Kids categories/My project (7).png";
import Tshirt_girl from "../../../../images/Kids categories/tshirt_girl.png";
import Sweater_boy from "../../../../images/Kids categories/My project (6).png";
import Sweater_girl from "../../../../images/Kids categories/My project (8).png";
import Pants_boy from "../../../../images/Kids categories/My project (5).png";
import Pants_girl from "../../../../images/Kids categories/My project (3).png";
import Skirts from "../../../../images/Kids categories/skirt_girl.png";
import Shoes_boy from "../../../../images/Kids categories/My project (9).png";
import Shoes_girl from "../../../../images/Kids categories/My project (10).png";
import coat_boy from "../../../../images/Kids categories/boy coat.png";
import coat_girl from "../../../../images/Kids categories/My project (2).png";
import Subscribe from "../../../Subscribe/Subscribe";
import Footer from "../../../Reusable/Footer/Footer";
import axios from "axios";
import Nav from "../../../Reusable/Navs/Main_Nav/Nav";

function KidsProducts({ image, category }) {
  const [products, setProducts] = useState([]);
  const [totalProductsNumber, setTotalProductsNumber] = useState(0);

  useEffect(() => {
    if (!category) {
      axios.get(`${config.SERVER_URL}/products/kids`).then((result) => {
        setTotalProductsNumber(result.data.length);
        setProducts(result.data);
      });
    } else {
      axios
        .get(`${config.SERVER_URL}/products/kids/${category}`)
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
              Kids
            </li>
          </ol>
        </nav>
        {/*image*/}
        <ProductsHeader image={image} />

        <KidsCategories
          image1={Tshirt_boy}
          image2={Tshirt_girl}
          image3={Sweater_boy}
          image4={Sweater_girl}
          image5={Pants_boy}
          image6={Pants_girl}
          image7={Skirts}
          image8={Shoes_boy}
          image9={Shoes_girl}
          image10={coat_boy}
          image11={coat_girl}
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

export default KidsProducts;
