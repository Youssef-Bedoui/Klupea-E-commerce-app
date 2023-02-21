import React, { useContext, useState, useEffect, useRef } from "react";
import "./Product_desc.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import { AuthContext } from "../context/AuthProvider.js";
import Spinner from "../spinner/Spinner";
import Footer from "../Reusable/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./../Reusable/Navs/Main_Nav/Nav";
import NotConnectedPop from "../Reusable/NotConnectedPop/NotConnectedPop";

function ProductDesc() {
  const { theme, isAuthenticated, user, itemsInBag, setItemsInBag } =
    useContext(AuthContext);
  const [sizes, setSizes] = useState([]);
  const userID = user[0]?.id;

  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const sizeBtns = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const product = location.state.product;

  // Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const showAlertAddSuccess = () => {
    toast.success("Item Added to Bag", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showAlertAddToWishSuccess = () => {
    toast.success("Item Added to Wishlist", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const customStyles = {
    content: {
      minWidth: "30%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
    },
  };

  const [showNotConnectedPop, setShowNotConnectedPop] = useState(false);
  const [addItemToBag, setAddItemToBag] = useState(false);

  const [productSize, setProductSize] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);

  const images = [product.image];
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleSizeClick = (index) => {
    // remove the 'isActive' class from all buttons
    sizeBtns.current.forEach((buttonRef) => {
      if (buttonRef.current) {
        buttonRef.current.classList.remove("isActive");
      }
    });

    // add the 'isActive' class to the clicked button
    if (sizeBtns.current[index] && sizeBtns.current[index].current) {
      sizeBtns.current[index].current.classList.add("isActive");
    }
  };

  const getSizes = async () => {
    try {
      const response = await axios.get(
        `${config.SERVER_URL}/products/getSizes/${product.ID}`
      );
      console.log(response.data);
      setSizes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSizeClick();
    getSizes();
  }, []);

  const addToBag = (product) => {
    const productDetails = {
      productID: Number(product.ID),
      orderSize: productSize,
      orderQuantity: productQuantity,
      userID: userID,
    };
    isAuthenticated
      ? axios
          .post(`${config.SERVER_URL}/bag/addItem`, productDetails)
          .then((err, result) => {
            if (err) {
              console.log(err);
              setItemsInBag(itemsInBag + 1);
              showAlertAddSuccess();
            } else {
              console.log(result);
            }
          })
      : setShowNotConnectedPop(true);

    setTimeout(() => {
      navigate("/");
      closeModal();
    }, 3000);
  };
  const addToWish = (product) => {
    isAuthenticated
      ? axios
          .post(`${config.SERVER_URL}/wishList/addWish`, {
            userID: userID,
            productID: product.ID,
            product_image: product.image,
            product_name: product.name,
            unit_price: product.price,
          })
          .then((err, result) => {
            if (err) {
              console.log(err);
              showAlertAddToWishSuccess();
            } else {
              console.log(result);
              setItemsInBag(itemsInBag + 1);
            }
          })
      : setShowNotConnectedPop(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <Nav />
      <div className={`product_desc ${theme}`}>
        <div className="container my-md-1">
          <div className="row border cont">
            <ToastContainer />
            {showNotConnectedPop && (
              <NotConnectedPop
                theme={theme}
                showAlert={showNotConnectedPop}
                navigate={navigate}
              />
            )}
            <div className="col-md-6 col-10 mx-auto d-flex justify-content-center align-items-start">
              <img
                onClick={() => {
                  setIsOpen(true);
                }}
                className="img img-fluid"
                src={product.image}
              />
              {isOpen && (
                <Lightbox
                  mainSrc={product.image}
                  // nextSrc={images[(photoIndex + 1) % images.length]}
                  // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                  onCloseRequest={() => setIsOpen(false)}
                  // onMovePrevRequest={() =>
                  //     this.setState({
                  //         photoIndex: (photoIndex + images.length - 1) % images.length,
                  //     })
                  // }
                  // onMoveNextRequest={() =>
                  //     this.setState({
                  //         photoIndex: (photoIndex + 1) % images.length,
                  //     })
                  // }
                  imageCaption={product.name}
                />
              )}
            </div>
            <div className="col-md-6 col-12 description_section px-3">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="pt-md-3 pt-0 text-left title">{product.name}</h3>
                <p className="badge bg-info fs-5">{product.brand}</p>
              </div>
              <hr />
              <span className="desc_prices">
                <span className="price fs-3">{product.price} TND</span>
                {product.prevPrice ? (
                  <span className="lastPrice">{product.prevPrice} TND</span>
                ) : null}
              </span>
              <h6>{product.description}</h6>
              <h6 className="mt-lg-3 mt-2 fw-bold">SELECT SIZE</h6>
              <span className="d-flex justify-content-start sizes text-center mt-2">
                {sizes.map((size, key) => {
                  return (
                    <span
                      ref={sizeBtns.current[key]}
                      onClick={() => {
                        handleSizeClick(key);
                        setProductSize(size.size);
                        setBtnDisabled(false);
                      }}
                      className="fw-bold size"
                    >
                      {size.size}
                    </span>
                  );
                })}
              </span>
              <h6 className="mt-3 fw-bold">SELECT QUANTITY</h6>
              <div className="col-md-5">
                <div className="d-flex justify-content-start">
                  <button
                    className="minusBtn"
                    onClick={() => {
                      if (productQuantity > 0)
                        setProductQuantity(productQuantity - 1) &&
                          setProductQuantity(productQuantity);
                    }}
                  >
                    -
                  </button>
                  <input
                    className="numberOfItems"
                    type="text"
                    value={productQuantity}
                  />
                  <button
                    className="plusBtn"
                    onClick={() => {
                      setProductQuantity(productQuantity + 1) &&
                        setProductQuantity(productQuantity + 1);
                      console.log(productQuantity);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="buttons mb-md-0 mb-3">
                <button
                  onClick={() => productSize && addToBag(product)}
                  disabled={btnDisabled}
                  className="btn btn-sm addToBag col-md-6 col-12 my-3 mx-md-2 mx-0"
                >
                  <svg
                    className="bag"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-bag-check"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                    />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                  ADD TO BAG
                </button>
                <button
                  onClick={() => addToWish(product)}
                  href=""
                  className="btn btn-sm whish col-md-5 col-12 m-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-bag-heart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5ZM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1Zm0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                  </svg>
                  WHISHLIST
                </button>
              </div>
            </div>
          </div>
        </div>
        {addItemToBag ? (
          <div
            className="rounded-pill"
            style={{
              position: "absolute",
              top: "100px",
              right: "10px",
              boxShadow: "2px 2px 10px gray",
              overflow: "hidden",
            }}
          >
            <div className="d-flex justify-content-center align-items-center bg-light text-dark">
              <img
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "30px 0  0 30px",
                  borderRight: ".5px solid black",
                }}
                src={product.image}
              />
              <h6 className="px-5 fw-bold ">Item added to bag </h6>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                color="rgb(0,200,0)"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-check-square-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
              </svg>
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
}

export default ProductDesc;
