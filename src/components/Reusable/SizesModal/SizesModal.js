import React, { useContext, useState, useEffect } from "react";
import "./SizesModal.css";
import config from "../../../config.json";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { AuthContext } from "./../../context/AuthProvider";

function SizesModal(props) {
  const { setItemsInBag } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    modalIsOpen,
    closeModal,
    size,
    setSize,
    quantity,
    setQuantity,
    showAlertBagSuccess,
    links,
    productID,
    userID,
    handleSizeClick,
  } = props;

  const [sizes, setSizes] = useState([]);

  const getSizes = async () => {
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

  const handleAdd = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleSubtrac = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToBag = () => {
    axios
      .post(`${config.SERVER_URL}/bag/addItem`, {
        productID,
        orderSize: size,
        orderQuantity: quantity,
        userID: userID,
      })
      .then((result) => {
        closeModal();
        setItemsInBag((prev) => (prev += 1));
        showAlertBagSuccess(true);
        setTimeout(() => {
          showAlertBagSuccess(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSizes();
  }, [productID, userID]);

  return (
    <Popup
      open={modalIsOpen}
      onClose={closeModal}
      position="right center"
      className="modal"
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="fw-bold">Please select size and quantity </div>
        <span onClick={closeModal} className="fw-bold closeBtn fs-4">
          &times;
        </span>
      </div>
      <hr />
      <div className="fw-bold">
        <div className="d-flex justify-content-around align-items-center pt-lg-2 pt-0">
          {sizes.map((size, key) => {
            return (
              <p
                ref={links.current[key]}
                onClick={() => {
                  setSize(size.size);
                  handleSizeClick(key);
                }}
                className="size"
              >
                {size.size}
              </p>
            );
          })}
        </div>
        <h4 className="text-center mt-2">Quantity :</h4>
        <div className="quantityBtns d-flex justify-content-center align-items-center mb-lg-3 mb-2">
          <button className="minBtn" onClick={() => handleSubtrac()}>
            <NavigateBeforeIcon />
          </button>
          <span className="quantity_num">{quantity}</span>
          <button
            disabled={false}
            className="addBtn"
            onClick={() => handleAdd()}
          >
            <NavigateNextIcon />
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-around align_items_center">
        <button
          onClick={() => {
            addToBag();
          }}
          className="btn keepBtn w-100 me-2"
        >
          KEEP SHOPPING
        </button>
        <button
          onClick={() => {
            addToBag();
            navigate("/bag");
            setItemsInBag((prev) => (prev += 1));
          }}
          className="btn finishBtn w-100"
        >
          FINISH ORDER
        </button>
      </div>
    </Popup>
  );
}

export default SizesModal;
