import React, { useContext, useState, useEffect } from "react";
import "./Nav.css";
import brand_logo from "../../../../images/Brand_logo.png";
import { AuthContext } from "../../../context/AuthProvider.js";
import config from "../../../../config.json";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";
//drawer
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ManOutlinedIcon from "@mui/icons-material/ManOutlined";
import WomanOutlinedIcon from "@mui/icons-material/WomanOutlined";
import ChildFriendlyOutlinedIcon from "@mui/icons-material/ChildFriendlyOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { colors, ListItemSecondaryAction, Paper } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function Nav() {
  const navigate = useNavigate();
  const { isAuthenticated, itemsInBag, theme, setTheme, user } =
    useContext(AuthContext);
  const userName = user && user[0] && user[0].userName;
  const firstName = userName ? userName.split(" ")[0] : "";

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showFloatSearch, setShowFloatSearch] = useState(false);

  const handleClick = (item) => {
    navigate(`/search/${item.name}`, {
      state: {
        name: item.name,
      },
    });
    clearInput();
  };

  //drawer
  const [state, setState] = useState({ left: false });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemIcon className="w-100">
            <a className="mx-auto" href="/">
              <img
                src={brand_logo}
                style={{
                  height: "50px",
                  marginBottom: "10px",
                }}
                alt="Klupea logo"
              />
            </a>
          </ListItemIcon>
        </ListItem>
        <ListItem
          style={{
            color: "var(--blue)",
            backgroundColor: "#f5f5f5",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <HomeOutlinedIcon style={{ color: "var(--blue)" }} />
            </ListItemIcon>
            <ListItemText primary={"HOME"} style={{ color: "var(--blue)" }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/Men")}>
            <ListItemIcon>
              <ManOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Men"} />
            <ListItemSecondaryAction>
              <ChevronRightIcon />
            </ListItemSecondaryAction>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/Women")}>
            <ListItemIcon>
              <WomanOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Women"} />
            <ListItemSecondaryAction>
              <ChevronRightIcon />
            </ListItemSecondaryAction>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/Kids")}>
            <ListItemIcon>
              <ChildFriendlyOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Kids"} />
            <ListItemSecondaryAction>
              <ChevronRightIcon />
            </ListItemSecondaryAction>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/wish")}>
            <ListItemIcon>
              <FavoriteBorderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Wishlist"} />
            <ListItemSecondaryAction>
              <ChevronRightIcon />
            </ListItemSecondaryAction>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/Bag")}>
            <ListItemIcon>
              <ShoppingCartOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Bag"} />
            <ListItemSecondaryAction>
              <ChevronRightIcon />
            </ListItemSecondaryAction>
          </ListItemButton>
        </ListItem>
      </List>
      <hr />
      <List className="">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <div>
                <input
                  type="checkbox"
                  id="darkmode-toggle"
                  checked={theme === "light" ? false : true}
                />
                <label
                  onClick={toggleTheme}
                  className="darkmode-label"
                  for="darkmode-toggle"
                >
                  <DarkModeOutlinedIcon className="theme_icon DarkModeIcon" />
                  <WbSunnyOutlinedIcon className="theme_icon LightModeIcon" />
                </label>
              </div>
            </ListItemIcon>
            <ListItemText primary={"DarkMode"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          {isAuthenticated === true ? (
            <ListItemButton onClick={() => navigate("/Profile")}>
              <ListItemIcon>
                <Person2OutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Your Profile"} />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={() => navigate("/SignIn")}>
              <ListItemIcon>
                <LoginOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"SignIn"} />
            </ListItemButton>
          )}
        </ListItem>
        {isAuthenticated === "true" && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"SignOut"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );
  //theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const handleSearch = async (e) => {
    setSearchInput(e.target.value);
    if (searchInput.length <= 1) {
      setSearchResults([]);
    } else {
      const result = await axios.get(
        `${config.SERVER_URL}/products/search/${searchInput}`
      );
      setSearchResults(result.data.slice(0, 15));
    }
  };
  const clearInput = () => {
    setSearchResults([]);
    setSearchInput("");
  };

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    }
  }, [theme]);

  return (
    <>
      <nav
        className={` d-none d-lg-block row navbar navbar-expand-lg sticky-top ${theme}`}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="col-lg-2 navbar-brand mx-auto" href="/">
            <img src={brand_logo} className="d-block" alt="Klupea logo" />
          </a>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="col-lg-4 me-auto navbar-nav leftBtns">
              <li className="nav-item mx-md-3 active">
                <a className="nav-link " href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item mx-md-3">
                <a className="nav-link" href="/men">
                  Men
                </a>
              </li>
              <li className="nav-item mx-md-3">
                <a className="nav-link" href="/women">
                  Women
                </a>
              </li>
              <li className="nav-item mx-md-3">
                <a className="nav-link" href="/kids">
                  Kids
                </a>
              </li>
            </ul>
            <div className="col-lg-4 search d-lg-flex d-none">
              <div className="col searchInputs position-relative">
                <input
                  value={searchInput}
                  onChange={handleSearch}
                  onBlur={() => {
                    setSearchInput("");
                  }}
                  type="text"
                  placeholder="Search"
                />
                <div className="searchIcon">
                  {searchInput.length === 0 ? (
                    <SearchIcon />
                  ) : (
                    <CloseIcon id="clearBtn" onClick={clearInput} />
                  )}
                </div>
              </div>
              <div className="dataResult">
                {searchResults.map((item, index) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                      key={index}
                      className="dataItem"
                      onClick={() => handleClick(item)}
                    >
                      <p>{item.name}</p>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="me-auto col-lg-3 ms-auto mb-lg-0 rightBtns d-flex flex-row justify-content-around align-items-center rounded">
              <div>
                <input
                  type="checkbox"
                  id="darkmode-toggle"
                  checked={theme === "light" ? false : true}
                />
                <label
                  onClick={toggleTheme}
                  className="darkmode-label"
                  for="darkmode-toggle"
                >
                  <DarkModeOutlinedIcon className="theme_icon DarkModeIcon" />
                  <WbSunnyOutlinedIcon className="theme_icon LightModeIcon" />
                </label>
              </div>
              {firstName ? (
                <a className="nav-link user_link" href="/profile">
                  <HowToRegIcon />
                  {`Hi, ${firstName} !`}
                </a>
              ) : (
                <a className="nav-link" href="/signIn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-box-arrow-in-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                  </svg>
                  Sign In
                </a>
              )}
              <a className="nav-link" href="/wish">
                <FavoriteBorderOutlinedIcon />
              </a>
              <a className="nav-link position-relative bag_in_nav" href="/bag">
                <ShoppingCartOutlinedIcon />
                {itemsInBag > 0 && (
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "sans-serif",
                      backgroundColor: "var(--pink)",
                    }}
                    className="position-absolute top-0 start-50 translate-middle badge rounded-circle"
                  >
                    {itemsInBag}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="d-block d-lg-none">
        <React.Fragment>
          <Button onClick={toggleDrawer("left", true)}>
            <MenuOutlinedIcon style={{ fontSize: "30px" }} />
          </Button>
          <Button>
            <a className="mx-auto" href="/">
              <img
                src={brand_logo}
                style={{ height: "50px", margin: "0 20px" }}
                alt="Klupea logo"
              />
            </a>
          </Button>
          <Button>
            <div
              className="search_sm ms-auto d-lg-none"
              id="navbarTogglerDemo02"
            >
              <a className="position-relative color-dark">
                <SearchIcon />
              </a>
              <div className="search-sm mx-auto my-2 vw-100">
                <div className="searchInputs position-relative">
                  <input
                    value={searchInput}
                    onChange={handleSearch}
                    onBlur={() => {
                      setSearchInput("");
                    }}
                    type="text"
                    placeholder="Search"
                  />
                  <div className="searchIcon-sm">
                    {searchInput.length === 0 ? (
                      <SearchIcon />
                    ) : (
                      <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                  </div>
                </div>
                <div className="dataResult-sm">
                  {searchResults.map((item, index) => {
                    return (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        key={index}
                        className="dataItem-sm"
                        onClick={() => handleClick(item)}
                      >
                        <p>{item.name}</p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Button>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
}

export default Nav;
