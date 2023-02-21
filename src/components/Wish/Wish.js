import React, { useContext, useEffect, useState, useRef } from "react";
import "./Wish.css";
import Nav from "./../Reusable/Navs/Main_Nav/Nav";
import config from "../../config.json";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { AuthContext } from "../context/AuthProvider.js";
import Footer from "./../Reusable/Footer/Footer";
import SizesModal from "./../Reusable/SizesModal/SizesModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import NotConnectedPop from "../Reusable/NotConnectedPop/NotConnectedPop";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import Spinner from "./../spinner/Spinner";
import SnackbarPop from "./../Reusable/snackbarPop/SnackbarPop";

function Wish() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate;
  const { theme, user, isAuthenticated, setItemsInBag } =
    useContext(AuthContext);
  const userID = user[0]?.id;

  const [wishProducts, setWishProducts] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [productID, setProductID] = useState(null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const links = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  
  //modal
  const [showAlert, setShowAlert] = useState(isAuthenticated ? false : true);

  const getWishList = async () => {
    try {
      const { data } = await axios.get(
        `${config.SERVER_URL}/wishList/getWishList/${userID}`
      );
      setWishProducts(data);
      console.log(wishProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (itemID) => {
    try {
      await axios.delete(
        `${config.SERVER_URL}/wishList/deleteItem/${itemID}/${userID}`
      );
      handleOpenSnack();
      getWishList();
       setItemsInBag((prev) => (prev -= 1));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSizeClick = (index) => {
    // remove the 'active_size' class from all buttons
    links.current.forEach((buttonRef) => {
      if (buttonRef.current) {
        buttonRef.current.classList.remove("active_size");
      }
    });

    // add the 'active_size' class to the clicked button
    if (links.current[index] && links.current[index].current) {
      links.current[index].current.classList.add("active_size");
    }
  };
  useEffect(() => {
    handleSizeClick();
  }, []);

  //modal
  const showAlertAddSuccess = () => {
    toast.success("item added to bag", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const openModal = (id) => {
    setIsOpen(true);
    setProductID(id);
    console.log(id);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  //snackbar
  const [openSnack, setOpenSnack] = useState({
    open: false,
    vertical: "top",
    horizontal: "left",
  });

  const handleOpenSnack = () => {
    setOpenSnack({ open: true, vertical: "top", horizontal: "left" });
  };

  const handleCloseSnack = () => {
    setOpenSnack({
      open: false,
      vertical: "top",
      horizontal: "left",
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    getWishList();
  }, []);

  return (
    <div className="wishList">
      <Nav />
      <h1 className="fw-bold text-center mt-lg-3 mt-1">
        My wishlist <FavoriteBorderOutlinedIcon className="fav_icon" />
      </h1>
      {isLoading ? (
        <Spinner />
      ) : isAuthenticated ? (
        <div className="wish_table mb-lg-0 mb-2">
          <div className="container wish_container">
            <ToastContainer />
            {wishProducts.length ? (
              <table
                className={
                  theme === "light"
                    ? `table wish_table table-transparent text-center align-middle`
                    : `table table-dark text-center align-middle`
                }
              >
                <thead>
                  <tr>
                    <th className="col-1"></th>
                    <th className="col-lg-2 col-1"></th>
                    <th scope="col">Product name</th>
                    <th scope="col">Unit price</th>
                    <th scope="col">Add to cart</th>
                  </tr>
                </thead>
                <tbody>
                  {wishProducts.map((product, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row" className="delete_wish">
                          <IconButton
                            onClick={() => deleteItem(product.id)}
                            aria-label="delete"
                            color="error"
                          >
                            <DeleteForeverOutlinedIcon />
                          </IconButton>
                        </th>
                        <td>
                          <img
                            className="wish_img"
                            src={product.product_image}
                          />
                        </td>
                        <td>{product.product_name}</td>
                        <td>{product.unit_price} TND</td>
                        <td>
                          <IconButton
                            onClick={() => openModal(product.productID)}
                            color="primary"
                            aria-label="add to shopping cart"
                          >
                            <AddShoppingCartIcon />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div
                style={{ height: "60vh" }}
                className="my-5 d-flex flex-column justify-content-center align-items-center"
              >
                <SentimentDissatisfiedRoundedIcon
                  style={{ fontSize: "40px" }}
                />
                <h4 className="fw-bold my-2">Your wishList is empty !</h4>
                <a href="/" className="btn btn-danger">
                  Keep Shopping
                </a>
              </div>
            )}
          </div>

          {/*Modal popup*/}
          <SizesModal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            openModal={openModal}
            closeModal={closeModal}
            size={size}
            setSize={setSize}
            quantity={quantity}
            setQuantity={setQuantity}
            showAlertAddSuccess={showAlertAddSuccess}
            links={links}
            productID={productID}
            userID={userID}
            handleSizeClick={handleSizeClick}
          />
          {/*snackbar*/}
          <SnackbarPop
            text={"Item deleted from your wishlist"}
            open={openSnack.open}
            close={handleCloseSnack}
          />
          <Footer />
        </div>
      ) : (
        <NotConnectedPop
          theme={theme}
          showAlert={showAlert}
          navigate={navigate}
        />
      )}
    </div>
  );
}

export default Wish;
