import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.js";
import TopProducts from "./components/ProductsLists/HomeCollections/MenCollection/MenCollection";
import Men_img from "./images/Men_img.png";
import Women_img from "./images/Women_img.png";
import Kids_img from "./images/Kids_img.png";
import ProductDesc from "./components/ProductDescription/Product_desc";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Bag from "./components/Bag/Bag";
import Profile from "./components/profile/profile";
import SignIn from "./components/Authentication/SignIn/SignIn";
import SignUp from "./components/Authentication/SignUp/SignUp";
import MenProducts from "./components/ProductsLists/Products/MenProducts/MenProducts";
import WomenProducts from "./components/ProductsLists/Products/WomenProducts/WomenProducts";
import KidsProducts from "./components/ProductsLists/Products/KidsProducts/KidsProducts";
import NotFound from "./components/NotFound";
import Spinner from "./components/spinner/Spinner";
import CheckoutSuccess from "./components/Bag/CheckoutSuccess";
import { AuthContext } from "./components/context/AuthProvider.js";
import Wish from "./components/Wish/Wish";
import WifiOffOutlinedIcon from "@mui/icons-material/WifiOffOutlined";
import ForgetPassword from "./components/Authentication/PasswordReset/ForgetPassword";
import ResetPassword from "./components/Authentication/PasswordReset/ResetPassword";
import SignUpVerification from "./components/Authentication/SignUp/SignUpVerification";
import SearchResults from "./components/SearchResults/SearchResults";

function App() {
  // check connection
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [loading, setLoading] = useState(true);
  const [myTheme, setMyTheme] = useState("");
  const { theme } = useContext(AuthContext);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      setMyTheme(currentTheme);
    } else {
      setMyTheme("light");
    }
  }, [myTheme]);

  return (
    <div className={`App ${theme}`}>
      {!isOnline ? (
        <div className="conn_failed d-flex flex-column justify-content-center align-items-center">
          <WifiOffOutlinedIcon className="offline_icon" />
          <h1>You are Offline !</h1>
        </div>
      ) : (
        <Router>
          <Routes>
            <Route exact path="/" element={loading ? <Spinner /> : <Home />} />
            <Route path="/topProducts" element={<TopProducts />} />
            <Route path="/product/:id" element={<ProductDesc />} />

            <Route path="/Men" element={<MenProducts image={Men_img} />} />
            <Route
              path="/Men/T-shirts"
              element={<MenProducts image={Men_img} category={"t-shirt"} />}
            />
            <Route
              path="/Men/Sweaters"
              element={<MenProducts image={Men_img} category={"sweater"} />}
            />
            <Route
              path="/Men/Pants"
              element={<MenProducts image={Men_img} category={"pants"} />}
            />
            <Route
              path="/Men/Jackets"
              element={<MenProducts image={Men_img} category={"jacket"} />}
            />
            <Route
              path="/Men/Suits"
              element={<MenProducts image={Men_img} category={"suit"} />}
            />
            <Route
              path="/Men/Shoes"
              element={<MenProducts image={Men_img} category={"shoes"} />}
            />
            <Route
              path="/Men/Underwears"
              element={<MenProducts image={Men_img} category={"underwears"} />}
            />
            <Route
              path="/Men/Accessories"
              element={<MenProducts image={Men_img} category={"accessories"} />}
            />

            <Route
              path="/Women"
              element={<WomenProducts image={Women_img} />}
            />
            <Route
              path="/Women/T-shirts"
              element={<WomenProducts image={Women_img} category={"t-shirt"} />}
            />
            <Route
              path="/Women/Sweaters"
              element={<WomenProducts image={Women_img} category={"sweater"} />}
            />
            <Route
              path="/Women/Pants"
              element={<WomenProducts image={Women_img} category={"pants"} />}
            />
            <Route
              path="/Women/Skirts"
              element={<WomenProducts image={Women_img} category={"skirts"} />}
            />
            <Route
              path="/Women/Shoes"
              element={<WomenProducts image={Women_img} category={"shoes"} />}
            />
            <Route
              path="/Women/Highheels"
              element={
                <WomenProducts image={Women_img} category={"highheels"} />
              }
            />
            <Route
              path="/Women/Jackets"
              element={<WomenProducts image={Women_img} category={"jackets"} />}
            />
            <Route
              path="/Women/Underwear"
              element={
                <WomenProducts image={Women_img} category={"underwear"} />
              }
            />

            <Route path="/Kids" element={<KidsProducts image={Kids_img} />} />
            <Route
              path="/Kids/T-shirts_boy"
              element={
                <KidsProducts image={Kids_img} category={"t-shirt_boy"} />
              }
            />
            <Route
              path="/Kids/T-shirts_girl"
              element={
                <KidsProducts image={Kids_img} category={"t-shirt_girl"} />
              }
            />
            <Route
              path="/Kids/Sweaters_boy"
              element={
                <KidsProducts image={Kids_img} category={"sweater_boy"} />
              }
            />
            <Route
              path="/Kids/Sweaters_girl"
              element={
                <KidsProducts image={Kids_img} category={"sweater_girl"} />
              }
            />
            <Route
              path="/Kids/Pants_boy"
              element={<KidsProducts image={Kids_img} category={"pants_boy"} />}
            />
            <Route
              path="/Kids/Pants_girl"
              element={<KidsProducts image={Kids_img} category={"pants_girl"} />}
            />
            <Route
              path="/Kids/Skirts"
              element={<KidsProducts image={Kids_img} category={"skirts_girl"} />}
            />
            <Route
              path="/Kids/Shoes_boy"
              element={<KidsProducts image={Kids_img} category={"shoes_boy"} />}
            />
            <Route
              path="/Kids/Shoes_girl"
              element={
                <KidsProducts image={Kids_img} category={"shoes_girl"} />
              }
            />
            <Route
              path="/Kids/Jackets_boy"
              element={
                <KidsProducts image={Kids_img} category={"jacket_boy"} />
              }
            />
            <Route
              path="/Kids/Jackets_girl"
              element={
                <KidsProducts image={Kids_img} category={"jacket_girl"} />
              }
            />
            <Route path="/search/:name" element={<SearchResults />} />

            <Route path="/wish" element={<Wish />} />
            <Route path="/bag" element={<Bag />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/checkout-success" element={<CheckoutSuccess />} />

            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/verifUser" element={<SignUpVerification />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route
              path="/resetPassword/:activationCode"
              element={<ResetPassword />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      )}

      {}
    </div>
  );
}

export default App;
