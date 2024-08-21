import React, { useEffect, useState } from "react";
import BottomTabNavigator from "../components/BottomTabNavigator/BottomTabNavigator";
import Footer from "./Footer";
import MainNavbar from "./Navbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getCategories, getProducts } from "../redux/products";
import logo from "./../assets/images/logo.svg";
import { types } from "../redux/global/types";
import "./Layout.scss";
import { API } from "../http/API";

const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
}));

function Layout(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.pageYOffset;

      setVisible(
        (prevScrollPos > currentScrollPos &&
          prevScrollPos - currentScrollPos > 70) ||
          currentScrollPos < 50
      );

      setPrevScrollPos(currentScrollPos);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  useEffect(() => {
    props.emptyProducts();

    if (
      window.location.pathname == "/en/order/success" ||
      window.location.pathname == "/ar/order/success" ||
      window.location.pathname == "/en/about" ||
      window.location.pathname == "/ar/about" ||
      window.location.pathname == "/ar/blog" ||
      window.location.pathname == "/en/video" ||
      window.location.pathname == "/ar/video" ||
      window.location.pathname == "/en/blog" ||
      window.location.pathname.startsWith("/en/product/") ||
      window.location.pathname.startsWith("/ar/product/")
    ) {
    } else {
      props.getCategories();
    }
  }, []);
  const { global } = props;
  return (
    <div
      className={`layout ${
        global?.activeLanguage === "ar"
          ? "arabic-direction"
          : "english-direction"
      }`}
    >
      {/* <div
        className={`${props.showSpinner ? "d-flex" : "d-none"
          } flex-column text-center align-items-center justify-content-center`}
        style={{
          position: "absolute",
          zIndex: 99999,
          height: "100%",
          width: "100%",
          background: "rgba(255,255,255,0.6)",
        }}
      >
        <ClipLoader color={"#e65550"} loading={true} size={80} />
      </div> */}
      <Hidden mdUp>
        {/* <span onClick={toggleDrawer(true)}>{"OPEN"}</span> */}
        <nav className={classes.drawer}>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor={"left"}
            open={drawerOpen}
            onClose={() => toggleDrawer(false)}
          >
            <div className="drawer-menu">
              <div className="drawer-logo">
                <img
                  src={logo}
                  alt="Pigeon Global Logo"
                  onClick={() => {
                    history.push("/");
                    toggleDrawer(false);
                  }}
                />
              </div>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                  <ListItemText
                    primary={
                      global.activeLanguage === "en"
                        ? "About Pigeon"
                        : "حول بيجون"
                    }
                    onClick={() => {
                      history.push(`/${global.activeLanguage}/about`);
                      toggleDrawer(false);
                    }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    onClick={() => {
                      history.push(
                        `/${global.activeLanguage}/mother-baby-products`
                      );
                      toggleDrawer(false);
                    }}
                    primary={
                      global.activeLanguage === "en"
                        ? "Our Products"
                        : "منتجاتنا"
                    }
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    onClick={() => {
                      history.push(
                        `/${global.activeLanguage}/mother-baby-world`
                      );
                      toggleDrawer(false);
                    }}
                    primary={
                      global.activeLanguage === "en"
                        ? "Mother & Baby World"
                        : "عالم الأم والطفل"
                    }
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    onClick={() => {
                      history.push(`/${global.activeLanguage}/good-to-know`);
                      toggleDrawer(false);
                    }}
                    primary={
                      global.activeLanguage === "en"
                        ? "Good to know"
                        : "من الجيد أن تعلمي"
                    }
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    onClick={() => {
                      history.push(
                        `/${global.activeLanguage}/breastfeeding-advisor`
                      );
                      toggleDrawer(false);
                    }}
                    primary={
                      global.activeLanguage === "en"
                        ? "Breastfeeding Advisor"
                        : "مستشار الرضاعة الطبيعية"
                    }
                  />
                </ListItem>
                {global.activeLanguage === "en" && (
                  <ListItem button>
                    <ListItemText
                      onClick={() => {
                        history.push(`/${global.activeLanguage}/blog`);
                        toggleDrawer(false);
                      }}
                      primary={
                        global.activeLanguage === "en" ? "Blog" : "المدونة"
                      }
                    />
                  </ListItem>
                )}
                <ListItem button>
                  <ListItemText
                    onClick={() => {
                      history.push(`/${global.activeLanguage}/video`);
                      toggleDrawer(false);
                    }}
                    primary={
                      global.activeLanguage === "en" ? "Video" : "فيديوهات"
                    }
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    onClick={() => {
                      history.push(`/${global.activeLanguage}/contact`);
                      toggleDrawer(false);
                    }}
                    primary={
                      global.activeLanguage === "en" ? "Contact" : "تواصل معنا"
                    }
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    onClick={() => {
                      history.push(`/${global.activeLanguage}/profile`);
                      toggleDrawer(false);
                    }}
                    primary={
                      global.activeLanguage === "en" ? "Profile" : "ملف التعريف"
                    }
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    onClick={() => {
                      history.push(`/${global.activeLanguage}/cart`);
                      toggleDrawer(false);
                    }}
                    primary={
                      global.activeLanguage === "en" ? "Cart" : "عربة التسوق"
                    }
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    onClick={() => {
                      history.push(`/${global.activeLanguage}/tracking`);
                      toggleDrawer(false);
                    }}
                    primary={
                      global.activeLanguage === "en"
                        ? "Order Tracking"
                        : "عربة التسوق"
                    }
                  />
                </ListItem>
                <ListItem button>
                  <h6>
                    {props.global.activeLanguage === "en"
                      ? "Language"
                      : "اللغة"}{" "}
                    :{" "}
                  </h6>
                </ListItem>
                <ListItem button className="mob_lang_us">
                  <ListItemText
                    onClick={() => {
                      props.setActiveLanguage("en");
                      toggleDrawer(false);
                    }}
                    primary={
                      props.global.activeLanguage === "en"
                        ? "English"
                        : "الإنجليزية"
                    }
                  />
                </ListItem>
                <ListItem button className="mob_lang_ar">
                  <ListItemText
                    onClick={() => {
                      props.setActiveLanguage("ar");
                      toggleDrawer(false);
                    }}
                    primary={
                      props.global.activeLanguage === "en"
                        ? "العربية"
                        : "العربية"
                    }
                  />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </nav>
      </Hidden>
      <MainNavbar show={visible} toggleDrawer={(show) => toggleDrawer(show)} />
      <div style={{ minHeight: "100vh" }}>{props.children}</div>
      <Footer />
      <BottomTabNavigator activeLanguage={global.activeLanguage} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state?.productReducer?.products,
    totalProducts: state?.productReducer?.totalProducts,
    categories: state?.productReducer?.categories,
    // showSpinner: state?.globalReducer?.showSpinner,
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (page) => dispatch(getProducts(page)),
    getCategories: () => dispatch(getCategories()),
    // getPreSearchRecords: () => dispatch(getPreSearchRecords()),
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
    emptyProducts: () =>
      dispatch({
        type: "EMPTY_PRODUCTS",
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
