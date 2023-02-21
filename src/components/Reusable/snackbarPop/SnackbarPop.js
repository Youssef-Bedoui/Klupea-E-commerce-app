import React from "react";
import Snackbar from "@mui/material/Snackbar";

const SnackbarPop = ({open,close,text}) => {

  return (
    <div>
      <Snackbar
        open={open}
        onClose={close}
        message={text}
      />
    </div>
  );
};

export default SnackbarPop;
