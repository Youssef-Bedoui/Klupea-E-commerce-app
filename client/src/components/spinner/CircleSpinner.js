import React,{useContext} from 'react';
import "./Spinner.css";
import ReactLoading from 'react-loading';
import { AuthContext } from "../context/AuthProvider.js";

function CircleSpinner() {
  const { theme } = useContext(AuthContext);
  return (
    <div className={`spinner-container ${theme}`}>
      <ReactLoading type={"spin"} color={"var(--pink)"} height={50} width={50}/>
    </div>
  )
}

export default CircleSpinner