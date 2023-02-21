import React,{useContext} from 'react';
import "./Spinner.css";
import ReactLoading from 'react-loading';
import { AuthContext } from "../context/AuthProvider.js";

function Spinner() {
  const { theme } = useContext(AuthContext);
  return (
    <div className={`spinner-container ${theme}`}>
      <ReactLoading type={"bars"} color={"var(--pink)"} height={50} width={100}/>
    </div>
  )
}

export default Spinner