import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import logo from "./../../assets/images/logo.svg";
import { IoIosSearch, IoMdGlobe, IoMdCart } from "react-icons/io";
import { FaTruck } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { CgMenuLeftAlt } from "react-icons/cg";
import { Hidden } from "@material-ui/core";
import { LinkContainer } from "react-router-bootstrap";
import Searchbar from "../../components/Searchbar/index";
import {
  getCategories,
  getCategoryProducts,
  getProducts,
  getPreSearchRecords,
} from "../../redux/products";
import { types } from "../../redux/global/types";
import { useLocation } from "react-router-dom";
function MainNavbar(props) {
  const { cart, cartBit } = props;
  const location = useLocation();

  const history = useHistory();
  const searchIconRef = React.useRef(null);
  const [isHome, setIsHome] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [currentRoute, setCurrentRoute] = useState("");
  useEffect(() => {
    if (cart.length > 0) {
      let val = 0;
      cart.forEach((element) => {
        val += element.quantity;
      });
      setCartQuantity(val);
    } else {
      setCartQuantity(0);
    }
  }, [cartBit, cart]);

  useEffect(() => {
    if (
      history.location.pathname === `/` ||
      history.location.pathname === "/ar" ||
      history.location.pathname === "/en" ||
      history.location.pathname === "/ar/mother-baby-products" ||
      history.location.pathname.startsWith(
        `/${props.global.activeLanguage}/products`
      ) ||
      history.location.pathname.startsWith(`/ar/products`) ||
      history.location.pathname.startsWith(
        `/${props.global.activeLanguage}/mother-baby-products`
      ) ||
      history.location.pathname.startsWith(
        `/${props.global.activeLanguage}/home`
      )
    ) {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [history.location]);

  useEffect(() => {
    if (history.location.pathname != currentRoute) {
      setCurrentRoute(history.location.pathname);
    }
  }, [location]);

  let a = history.location.pathname.split("/");

  useEffect(() => {
    setTimeout(() => {
      if (a[1] != props.global.activeLanguage || !props.global.activeLanguage) {
        props.setActiveLanguage(a[1] ? a[1] : "en");
      }
    }, 1000);
  }, [a[1]]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchIconRef && !searchIconRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-wrap">
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        fixed="top"
        className={props.show && isHome ? "" : "hide-curve"}
      >
        <Hidden mdUp>
          <Navbar.Brand>
            <CgMenuLeftAlt
              onClick={() => props.toggleDrawer(true)}
              className="nav-toggle-override"
            />
            <img
              src={logo}
              alt="pigeon-logo"
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/")}
            />
          </Navbar.Brand>
        </Hidden>
        <Hidden smDown>
          <Navbar.Brand
          // href={`/` || `/${props.global.activeLanguage}`}
          >
            <img
              src={logo}
              alt="pigeon-logo"
              style={{ cursor: "pointer" }}
              onClick={() =>
                history.push(`/` || `/${props.global.activeLanguage}`)
              }
            />
          </Navbar.Brand>
        </Hidden>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto ml-4 pl-4 nav-text">
            <LinkContainer
              className={
                currentRoute === "/en/about"
                  ? "ActiveNavLink"
                  : currentRoute === "/ar/about"
                  ? "ActiveNavLink"
                  : ""
              }
              to={`/${props.global.activeLanguage}/about`}
            >
              <Nav.Link>
                {props.global.activeLanguage === "en"
                  ? "About Pigeon"
                  : "حول بيجون"}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer
              className={
                currentRoute === "/en/mother-baby-products"
                  ? "ActiveNavLink"
                  : currentRoute === "/ar/mother-baby-products"
                  ? "ActiveNavLink"
                  : currentRoute.includes("/en/products/")
                  ? "ActiveNavLink"
                  : currentRoute.includes("/en/product/")
                  ? "ActiveNavLink"
                  : ""
              }
              to={`/${props.global.activeLanguage}/mother-baby-products`}
            >
              <Nav.Link>
                {props.global.activeLanguage === "en"
                  ? "Our Products"
                  : "منتجاتنا"}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer
              className={
                currentRoute === "/en/mother-baby-world"
                  ? "ActiveNavLink"
                  : currentRoute === "/ar/mother-baby-world"
                  ? "ActiveNavLink"
                  : ""
              }
              to={`/${props.global.activeLanguage}/mother-baby-world`}
            >
              <Nav.Link>
                {props.global.activeLanguage === "en"
                  ? "Mother & Baby World"
                  : "عالم الأم والطفل"}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer
              className={
                currentRoute === "/en/good-to-know"
                  ? "ActiveNavLink"
                  : currentRoute === "/ar/good-to-know"
                  ? "ActiveNavLink"
                  : ""
              }
              to={`/${props.global.activeLanguage}/good-to-know`}
            >
              <Nav.Link>
                {props.global.activeLanguage === "en"
                  ? "Good to know"
                  : "من الجيد أن تعلمي"}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer
              className={
                currentRoute === "/en/breastfeeding-advisor"
                  ? "ActiveNavLink"
                  : currentRoute === "/ar/breastfeeding-advisor"
                  ? "ActiveNavLink"
                  : ""
              }
              to={`/${props.global.activeLanguage}/breastfeeding-advisor`}
            >
              <Nav.Link>
                {props.global.activeLanguage === "en"
                  ? "Breastfeeding Advisor"
                  : "مستشار الرضاعة الطبيعية"}
              </Nav.Link>
            </LinkContainer>

            {props.global.activeLanguage === "en" ? (
              <LinkContainer
                className={
                  currentRoute === "/en/blog"
                    ? "ActiveNavLink"
                    : currentRoute === "/ar/blog"
                    ? "ActiveNavLink"
                    : ""
                }
                to={`/${props.global.activeLanguage}/blog`}
              >
                <Nav.Link>
                  {props.global.activeLanguage === "en" ? "Blog" : "المدونة"}
                </Nav.Link>
              </LinkContainer>
            ) : (
              ""
            )}
            <LinkContainer
              className={
                currentRoute === "/en/video"
                  ? "ActiveNavLink"
                  : currentRoute === "/ar/video"
                  ? "ActiveNavLink"
                  : ""
              }
              to={`/${props.global.activeLanguage}/video`}
            >
              <Nav.Link>
                {props.global.activeLanguage === "en" ? "Video" : "فيديوهات"}
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <div className="dropdown-basic2">
            {" "}
            {props?.user?.loggedInUser?.firstName && (
              <>
                {props.global.activeLanguage === "en" ? "Hello" : "مرحباً"}{" "}
                {props?.user?.loggedInUser?.firstName}
              </>
            )}
          </div>
          <div className="dropdown">
            <Dropdown>
              <Dropdown.Toggle variant=" btn-sm" id="dropdown-basic">
                {"EN/AR"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  as="button"
                  className={
                    props.global.activeLanguage === "en" ? "active" : ""
                  }
                >
                  <div
                    onClick={() => {
                      props.setActiveLanguage("en");
                    }}
                  >
                    {"English"}
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  className={
                    props.global.activeLanguage === "ar" ? "active" : ""
                  }
                >
                  <div
                    onClick={() => {
                      props.setActiveLanguage("ar");
                    }}
                  >
                    {"العربية"}
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Nav className="navbar-icons">
            <LinkContainer to={`/${props.global.activeLanguage}/tracking`}>
              <Nav.Link title="Track Your Order">
                {/* <img className="deliveryTracking" src={deliveryTracking} /> */}
                <FaTruck fontSize="24px" />
              </Nav.Link>
              {/* <DeliveryTracking /> */}
            </LinkContainer>

            <LinkContainer to={`/${props.global?.activeLanguage}/cart`}>
              <Nav.Link>
                <IoMdCart fontSize="24px" />
                {cartQuantity > 0 && (
                  <span
                    className={
                      props.global.activeLanguage == "en"
                        ? "cartCount"
                        : "cartCountAr"
                    }
                  >
                    {cartQuantity}
                  </span>
                )}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer
              // to={`/${props.global?.activeLanguage}/profile?active=wishlist`}
              to={`/${props.global?.activeLanguage}/profile?active=basic`}
            >
              <Nav.Link>
                <BsPerson fontSize="24px" />
              </Nav.Link>
            </LinkContainer>
            <Nav.Link href="https://www.pigeon.com" target="_blank">
              <IoMdGlobe fontSize="24px" />
            </Nav.Link>

            <Nav.Link href="#" className="searchbar-icon" ref={searchIconRef}>
              <IoIosSearch
                fontSize="24px"
                onClick={() => {
                  setShowSearch(!showSearch);
                  props.getPreSearchRecords();
                }}
              />
              {showSearch ? (
                <Searchbar
                  onClose={() => setShowSearch(false)}
                  language={props.global?.activeLanguage}
                />
              ) : null}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    products: state?.productReducer?.products,
    allProducts: state?.productReducer?.allProducts,
    totalProducts: state?.productReducer?.totalProducts,
    categories: state?.productReducer?.categories,
    global: state.globalReducer,
    cartBit: state.cartReducer.cartBit,
    cart: state.cartReducer.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () =>
      dispatch({
        type: "LOGOUT",
      }),
    setActiveLanguage: (language) =>
      dispatch({
        type: types.SET_ACTIVE_LANGUAGE,
        payload: {
          language: language,
        },
      }),
    getProducts: (page) => dispatch(getProducts(page)),
    getCategories: () => dispatch(getCategories()),
    getCategoryProducts: (category) => dispatch(getCategoryProducts(category)),
    getPreSearchRecords: () => dispatch(getPreSearchRecords()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);
