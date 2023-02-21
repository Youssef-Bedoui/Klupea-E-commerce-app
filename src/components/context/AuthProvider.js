import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
  token: {},
  refreshToken: {},
  itemsInBag: {},
  login: (data) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated")
      ? JSON.parse(localStorage.getItem("isAuthenticated"))
      : false
  );
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );
  const [itemsInBag, setItemsInBag] = useState({});
  console.log(isAuthenticated);
  const login = (data) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
    setUser(data);
    // Store the data in local storage or session storage
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("userID", data[0].id);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    setUser({});
    localStorage.removeItem("user");
  };

  const getItemsInBagNumber = async () => {
    const userID = user[0]?.id;
    const result = await axios.get(`${config.SERVER_URL}/bag/${userID}`);
    setItemsInBag(result.data.length);
    console.log(result.data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getItemsInBagNumber();
    }
  }, [isAuthenticated, itemsInBag,logout]);

  return (
    <AuthContext.Provider
      value={{
        theme,
        setTheme,
        isAuthenticated,
        setIsAuthenticated,
        itemsInBag,
        setItemsInBag,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

////////////////////////////////////////////////////

// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import config from "../../config.json";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// const AuthProvider = (props) => {

//     const getItemsNumber = async () => {
//         console.log("itemsInBag");
//         const userID = localStorage.getItem("userID");
//         const result = await axios.get(`${config.SERVER_URL}/bag/${userID}`)
//         setItemsInBag(result.data.length);
//     }

//     const connected = localStorage.getItem("isConnected");
//     const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//     const [userData, setUserData] = useState([]);
//     const [itemsInBag, setItemsInBag] = useState(connected ? getItemsNumber() : null);

//     const token = localStorage.getItem("token");
//     const refreshToken = localStorage.getItem("rToken");

//     const isAuth = async () => {
//         console.log("isAuth");

//         if (refreshToken) {
//             try {
//                 const result = await axios.get(
//                     `${config.SERVER_URL}/auth/isUserAuth`,
//                     {
//                         headers: {
//                             "authorization": token
//                         }
//                     });

//                 if (result.data === "Session Expired") {
//                     localStorage.setItem("isConnected", false);
//                     setUserData([]);
//                     localStorage.clear();
//                     window.location.href = "/signIn";
//                 } else if (result.data === "You are authenticated!") {
//                     return;
//                 } else {
//                     const result = await axios.get(`${config.SERVER_URL}/auth/refreshToken`,
//                         {
//                             headers: {
//                                 "authorization": refreshToken
//                             }
//                         });
//                     localStorage.setItem("token", "Bearer " + result.data.token);
//                     localStorage.setItem("isConnected", true);
//                 }
//             } catch (error) {
//                 console.error(error);
//                 localStorage.setItem("isConnected", false);
//                 setUserData([]);
//                 localStorage.clear();
//                 window.location.href = "/";

//             }
//         }

//     };
//     const userInfo = async () => {
//         if (connected === "true") try {
//             const result = await axios.get(
//                 `${config.SERVER_URL}/signIn/userInfo`,
//                 {
//                     headers: {
//                         "authorization": token
//                     }
//                 }
//             );
//             if (result.data.msg === "Not authenticated!") {
//                 localStorage.setItem("isConnected", false);

//                 setUserData([]);
//             }
//             setUserData(result.data[0]);
//             localStorage.setItem("isConnected", true);
//             localStorage.setItem("userID", result.data[0].id);
//         } catch (error) {
//             console.error(error);
//             localStorage.setItem("isConnected", false);
//             setUserData([]);
//         }

//     }

//     useEffect(() => {
//         isAuth();
//         // Set up a timer to check the auth status every 100 minutes
//         const timer = setInterval(isAuth, 100 * 60 * 1000);
//         return () => clearInterval(timer);
//     }, []);

//     useEffect(() => {
//         getItemsNumber();
//     }, [token, refreshToken, connected, itemsInBag]);

//     const contextValue = useMemo(
//         () => ({
//             theme,
//             setTheme,
//             userData,
//             itemsInBag,
//             setItemsInBag,
//             setUserData,
//             userInfo,
//             getItemsNumber,
//         }),
//         [theme, userData, itemsInBag]
//     );

//     return (
//         <AuthContext.Provider value={contextValue}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// }

// export default AuthProvider;
