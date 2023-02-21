import React from "react";
import "./PopUpAlert.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

function PopUpAlert(props) {
  const { text, showAlertWishSuccess, alertType } = props;
  return (
    <Popup
      open={showAlertWishSuccess}
      position="right center"
      className="WishModalSuccess"
    >
      <div className="d-flex flex-column justify-content-center align-items-center text-center">
        {alertType === "success" && (
          <CheckCircleIcon
            className="done_icon my-2"
            style={{ fontSize: "50px" }}
          />
        )}
        {alertType === "alert" && (
          <ErrorRoundedIcon
            className="my-2 text-danger"
            style={{ fontSize: "50px" }}
          />
        )}
        <h5>{text}</h5>
      </div>
    </Popup>
  );
}

export default PopUpAlert;
