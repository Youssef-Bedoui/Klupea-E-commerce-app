/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Bag.css";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import noItems from "../../images//no_items.png";
import config from "../../config.json";
import Spinner from "../spinner/Spinner";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import Footer from "../Reusable/Footer/Footer";
import { AuthContext } from "../context/AuthProvider.js";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Personal_Info from "../profile/Personal_Info";
import IconButton from "@mui/material/IconButton";
import SnackbarPop from "../Reusable/snackbarPop/SnackbarPop";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckIcon from "@mui/icons-material/Check";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function PurshaseList() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setUser, itemsInBag, setItemsInBag } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = localStorage.getItem("userID");
  const [bagProducts, setBagProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const [itemNumber, setItemNumber] = useState(0);
  const [sizes, setSizes] = useState([]);

  const getSizes = async (productID) => {
    try {
      const response = await axios.get(
        `${config.SERVER_URL}/products/getSizes/${productID}`
      );
      console.log(response.data);
      setSizes(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //order info
  const [userName, setuserName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  //address dualog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //snackbar
  const [isOpen, setIsOpen] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "left",
  });

  const handleOpenSnack = () => {
    setIsOpen({ open: true, vertical: "bottom", horizontal: "left" });
  };

  const handleCloseSnack = () => {
    setIsOpen({
      open: false,
      vertical: "bottom",
      horizontal: "left",
    });
  };

  //stripe
  const [lineItems, setLineItems] = useState([]);
  //order id generated

  const getData = async () => {
    try {
      const result = await axios.get(`${config.SERVER_URL}/bag/${userID}`);
      setBagProducts(result.data);
      let productNum = 0;
      let total = 0;
      for (let i = 0; i < bagProducts.length; i++) {
        total += parseInt(bagProducts[i].price) * bagProducts[i].orderQuantity;
        productNum += bagProducts[i].orderQuantity;
      }
      setTotalPrice(total);
      setTotalOrderPrice((total += 7));
      setItemNumber(productNum);

      //products for stripe payment
      setLineItems(
        bagProducts.map((product) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
              },
              unit_amount: parseInt(product.price) * 100,
            },
            quantity: product.orderQuantity,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  });

  useEffect(() => {
    getData();
  }, [userID, bagProducts]);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${config.SERVER_URL}/bag/deleteItem/${id}`);
      setItemsInBag(itemsInBag - 1);
      handleOpenSnack();
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const selectSize = async (size, id) => {
    try {
      console.log(size, id);
      const result = await axios.patch(
        `${config.SERVER_URL}/bag/updateItem/${id}`,
        { orderSize: size }
      );
      console.log(result);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const selectQuantity = async (quantity, id) => {
    try {
      const result = await axios.patch(
        `${config.SERVER_URL}/bag/updateItem/${id}`,
        { orderQuantity: quantity }
      );
      console.log(result);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async () => {
    if (!lineItems || !lineItems.length) {
      console.error("lineItems are not set or empty");
      return;
    }

    const orders = bagProducts.map((item) => ({
      productID: item.ID,
      quantity: item.orderQuantity,
    }));

    try {
      const response = await axios.post(
        `${config.SERVER_URL}/stripe/create-checkout-session`,
        lineItems,
        { headers: { "Content-Type": "application/json" } }
      );
      window.location.href = response.data.url;

      const res = await axios.post(
        `${config.SERVER_URL}/orders/placeOrder/${user[0].id}`,
        { orders }
      );
      localStorage.setItem("orderID", res.data.orderID);

      console.log("Orders placed successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const modifAddress = async () => {
    const newInfo = {};

    if (userName) {
      newInfo.userName = userName;
    }
    if (address) {
      newInfo.address = address;
    }
    if (city) {
      newInfo.city = city;
    }
    if (phone) {
      newInfo.phone = phone;
    }
    const userID = localStorage.getItem("userID");
    try {
      await axios.patch(
        `${config.SERVER_URL}/signIn/updateUser/${user[0].id}`,
        newInfo
      );
      const dataResponse = await axios.get(
        `${config.SERVER_URL}/signIn/userInfo/${userID}`
      );
      localStorage.setItem("user", JSON.stringify(dataResponse.data));
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  });

  return (
    <>
      <div className={`list ${theme}`}>
        <h1 className="text-center fw-bold mt-lg-3 mt-1">
          My Bag <ShoppingCartOutlinedIcon className="bag_icon" />
        </h1>

        {isLoading ? (
          <Spinner />
        ) : bagProducts.length ? (
          <div>
            <div className="container_fluid">
              <div className="row">
                <div className="left_list col-md-7 col-lg-8 col-12">
                  {bagProducts.length &&
                    bagProducts.map((product, index) => {
                      return (
                        <div className="itemCard" key={index}>
                          <span
                            onClick={() => {
                              deleteItem(product.id);
                            }}
                            className="deleteBtn"
                          >
                            <IconButton aria-label="delete" color="error">
                              <RemoveShoppingCartOutlinedIcon className="" />
                            </IconButton>
                          </span>
                          <img
                            className="img"
                            src={product.image}
                            alt="product_image"
                          />
                          <div className="description d-flex flex-column justify-content-around d-flex ms-2">
                            <p className="title">{product.name}</p>
                            <div className="row">
                              <div className="dropdown sizes col-3 col-md-3 col-lg-2">
                                <button
                                  className="btn btn-transparent dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  onClick={() => getSizes(product.ID)}
                                >
                                  Size: {product.orderSize}
                                </button>
                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  {sizes.map((size, key) => (
                                    <p
                                      indek={key}
                                      onClick={() => {
                                        selectSize(size.size, product.id);
                                      }}
                                      className="dropdown-item"
                                    >
                                      {size.size}
                                    </p>
                                  ))}
                                </div>
                              </div>
                              <div className="dropdown quantity col-3 col-md-3 col-lg-2 offset-lg-1">
                                <button
                                  className="btn btn-transparent dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  Quantity: {product.orderQuantity}
                                </button>
                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  {Array.from(Array(6).keys()).map((value) => (
                                    <p
                                      key={value}
                                      onClick={() => {
                                        selectQuantity(value + 1, product.id);
                                      }}
                                      className="dropdown-item"
                                    >
                                      {value + 1}
                                    </p>
                                  ))}
                                </div>
                              </div>
                              <div className="prices col-6 col-md-6 col-lg-5 ms-lg-auto d-flex flex-column justify-content-center align-items-end">
                                <span className="price">
                                  __ {product.price} TND
                                </span>
                                {product.prevPrice ? (
                                  <span className="lastPrice">
                                    {product.prevPrice} TND
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div
                  className={`price_details ${theme} col-md-5 col-lg-4 col-12`}
                >
                  <div className="container">
                    <p className="price_title">
                      ORDER DETAILS ({itemNumber} Item)
                    </p>
                    <div className="price_detail">
                      <p className="one_detail">Total</p>
                      <p className="price">{totalPrice} TND</p>
                    </div>
                    <div className="price_detail">
                      <p className="one_detail">Transportation fee</p>
                      <p className="price">7 TND</p>
                    </div>
                    <div
                      style={{ backgroundColor: "" }}
                      className={`p-2 fw-bold delivery_info ${theme} border border-dark`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <p
                          style={{
                            fontSize: "small",
                            textDecorationLine: "underline",
                          }}
                          className=""
                        >
                          Delivery Infos {""}
                          <LocalShippingIcon />
                        </p>
                        <span
                          className="edit_address text-primary"
                          onClick={handleClickOpen}
                        >
                          <EditLocationAltIcon />
                          <span>Modify</span>
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Customer :</p>
                        <p className="mb-0">{user[0].userName}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Address :</p>
                        <p className="mb-0">{user[0].address}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">City :</p>
                        <p className="mb-0">{user[0].city}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Phone :</p>
                        <p className="mb-0">{user[0].phone}</p>
                      </div>
                    </div>
                    <h6 style={{ fontSize: "small", margin: "0" }}>
                      <CheckIcon className="text-success" />
                      Shipment to {user[0].city} in 2-4 days
                    </h6>
                    <h6 style={{ fontSize: "small", margin: "0" }}>
                      <CheckIcon className="text-success" />
                      Safe Shipment with ARAMEX
                    </h6>
                    <h6 style={{ fontSize: "small", margin: "0" }}>
                      <CheckIcon className="text-success" />
                      Order return right in 7 days
                    </h6>
                    <hr />
                    <div className="price_detail">
                      <p className="total">Total Amount</p>
                      <p className="price total">{totalOrderPrice} TND</p>
                    </div>

                    <button
                      onClick={handlePayment}
                      className="orderBtn"
                      type="submit"
                    >
                      PAY NOW
                      <PaymentIcon className="ms-2 fs-3" />
                    </button>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <img
                className="img_fluid"
                style={{ width: "20%", height: "auto" }}
                src={noItems}
              />
              <h4 className="">Oops... No items in your bag</h4>
            </div>
            <Footer />
          </>
        )}
      </div>
      {/*dialog*/}
      {open && (
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              Modify Delivery Address
              <br />
              <span style={{ fontSize: "smaller", color: "gray" }}>
                Your default address will be modified*
              </span>
            </DialogTitle>
            <DialogContent>
              <TextField
                onChange={(e) => setuserName(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="Customer Name*"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                onChange={(e) => setAddress(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="Address*"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                onChange={(e) => setCity(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="City*"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                onChange={(e) => setPhone(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="Phone*"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() => {
                  handleClose();
                  modifAddress();
                  setUser();
                }}
              >
                Save Address
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {/*snackbar*/}
      <SnackbarPop
        text={"Item deleted from your bag"}
        open={isOpen.open}
        close={handleCloseSnack}
      />
    </>
  );
}

export default PurshaseList;
