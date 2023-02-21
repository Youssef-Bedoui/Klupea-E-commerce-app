import React, { useEffect, useState } from "react";
import ProductsHeader from "../../CategoryComponents/CategoryHeader/ProductsHeader";
import AllProducts from "../../CategoryComponents/AllProducts/AllProducts";
import MenCategories from "./MenCategories";
import config from "../../../../config.json";
import Tshirt from "../../../../images/men Categories/Men_T-shirts.png";
import Sweaters from "../../../../images/men Categories/Men_Sweaters.png";
import Pants from "../../../../images/men Categories/Men_Pants.png";
import Suits from "../../../../images/men Categories/Men_Suits.png";
import Shoes from "../../../../images/men Categories/Men_Shoes.png";
import coats from "../../../../images/men Categories/Men_coat.png";
import underwears from "../../../../images/men Categories/Men_underwears.png";
import accessories from "../../../../images/men Categories/Men_accessories.png";
import Subscribe from "../../../Subscribe/Subscribe";
import Footer from "../../../Reusable/Footer/Footer";
import axios from "axios";
import Nav from "../../../Reusable/Navs/Main_Nav/Nav";

function MenProducts({ image, category }) {
  const [products, setProducts] = useState([]);

  const [totalProductsNumber, setTotalProductsNumber] = useState(0);

  useEffect(() => {
    if (!category) {
      axios.get(`${config.SERVER_URL}/products/men`).then((result) => {
        setTotalProductsNumber(result.data.length);
        setProducts(result.data);
      });
    } else {
      axios
        .get(`${config.SERVER_URL}/products/men/${category}`)
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
              Men
            </li>
          </ol>
        </nav>
        {/*image*/}
        <ProductsHeader image={image} />

        <MenCategories
          image1={Tshirt}
          image2={Sweaters}
          image3={Pants}
          image4={Suits}
          image5={Shoes}
          image6={coats}
          image7={underwears}
          image8={accessories}
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

export default MenProducts;
