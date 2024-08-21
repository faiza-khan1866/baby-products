import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineHeart,
} from "react-icons/ai";
import { IoMdCart, IoMdGlobe} from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { BsPerson } from "react-icons/bs";


const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});



function BottomTabNavigator(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [activeLink, setActiveLink] = useState("");
  const history = useHistory();
  useEffect(() => {
    if(activeLink != history.location.pathname){
      setActiveLink(history.location.pathname)
    }
  
  }, [history.location]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="bottom-navigator-wrapper">
      <BottomNavigation  
        value={value}
        onChange={handleChange}
        className={classes.root}
        showlabel={"false"}
      >
        <Link to="/" className={activeLink == "/" ? "activeBottomNav" : ""}>
          <AiOutlineHome className="tab-icon" />
        </Link>
        <Link to={`/${props.activeLanguage}/mother-baby-products`} className={activeLink == `/${props.activeLanguage}/mother-baby-products` ? "activeBottomNav" : ""}>
          <IoGridOutline className="tab-icon" />
        </Link>
        <Link to={`/${props.activeLanguage}/cart`} className={activeLink == `/${props.activeLanguage}/cart` ? "activeBottomNav" : ""}>
        <IoMdCart fontSize="24px" />
        </Link>
        <Link to={`/${props.activeLanguage}/profile?active=basic`} className={activeLink == `/${props.activeLanguage}/profile?active=basic` ? "activeBottomNav" : activeLink == `/${props.activeLanguage}/login` ? "activeBottomNav" : ""}>
          <BsPerson className="tab-icon" />
        </Link>
        <Nav.Link href="https://www.pigeon.com" target="_blank">
              <IoMdGlobe fontSize="24px" />
        </Nav.Link>
      </BottomNavigation>
    </div>
  );
}

export default BottomTabNavigator;
