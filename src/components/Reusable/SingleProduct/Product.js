import React, { useContext, useState, useEffect, useRef } from "react";
import "./Product.css";
import axios from "axios";
import config from "../../../config.json";
import { AuthContext } from "../../context/AuthProvider.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SizesModal from "../SizesModal/SizesModal";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PopUpAlert from "../PopUpAlert/PopUpAlert";

function Product(props) {
  const { isAuthenticated, itemsInBag, setItemsInBag, user } =
    useContext(AuthContext);
  const userID = user[0]?.id;
  const { item, index, navigate } = props;
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [productID, setProductID] = useState(item.ID);
  const [showAlertWishSuccess, setShowAlertWishSuccess] = useState(false);
  const [showAlertBagSuccess, setShowAlertBagSuccess] = useState(false);

  const links = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const handleSizeClick = (index) => {
    links.current.forEach((buttonRef) => {
      if (buttonRef.current) {
        buttonRef.current.classList.remove("active_size");
      }
    });

    if (links.current[index] && links.current[index].current) {
      links.current[index].current.classList.add("active_size");
    }
  };
  useEffect(() => {
    handleSizeClick();
  }, [sizes]);

  // Modal
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setQuantity(1);
  };

  const addToWish = () => {
    if (isAuthenticated) {
      axios
        .post(`${config.SERVER_URL}/wishList/addWish`, {
          userID: user[0].id,
          productID: productID,
          product_image: item.image,
          product_name: item.name,
          unit_price: item.price,
        })
        .then((result) => {
          setShowAlertWishSuccess(true);
          setItemsInBag(itemsInBag + 1);
          setTimeout(() => {
            setShowAlertWishSuccess(false);
          }, 1000);
        });
    }
  };

  return (
    <>
      <PopUpAlert
        text={"ITEM ADDED TO WISHLIST"}
        showAlertWishSuccess={showAlertWishSuccess}
        alertType={"success"}
      />
      <PopUpAlert
        text={"ITEM ADDED TO BAG"}
        showAlertWishSuccess={showAlertBagSuccess}
        alertType={"success"}
      />

      <div key={index} className="product col-lg-2 col-md-3 col-5 p-0">
        <img
          className="img-fluid item_img"
          src={item.image}
          onClick={() => {
            navigate(`/product/${index}`, { state: { product: item } });
          }}
        />

        <span className="badge bg-info brand_badge">{item.brand}</span>
        <span onClick={() => addToWish(item.id)} className="heart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="currentColor"
            class="bi bi-bookmark-heart"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"
            />
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
          </svg>
        </span>
        <div
          className="item_details ps-2"
          onClick={() => {
            navigate(`/product/${index}`, { state: { product: item } });
          }}
        >
          <h5 className="text-left text-dark">{item.name}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <span className="price">{item.price} TND</span>
            {item.prevPrice ? (
              <span className="lastPrice">{item.prevPrice} TND</span>
            ) : null}
          </div>
        </div>
        {isAuthenticated ? (
          <>
            <div
              onClick={() => {
                openModal();
              }}
              className="addTobag d-flex justify-content-center align-items-center d-none d-sm-none d-md-none d-lg-flex"
            >
              <AddShoppingCartIcon />
            </div>
            <div
              onClick={() => {
                openModal();
              }}
              className="addTobag_sm d-flex justify-content-center align-items-center d-lg-none"
            >
              <AddShoppingCartIcon />
            </div>
          </>
        ) : null}
      </div>
      {/*modal popup*/}
      <SizesModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        size={size}
        setSize={setSize}
        quantity={quantity}
        setQuantity={setQuantity}
        showAlertAddSuccess={setShowAlertWishSuccess}
        showAlertBagSuccess={setShowAlertBagSuccess}
        links={links}
        productID={productID}
        userID={userID}
        handleSizeClick={handleSizeClick}
      />
    </>
  );
}

export default Product;
