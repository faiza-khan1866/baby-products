import React, { useState } from "react";
import { Link } from "react-router-dom";
import banner4 from "./../../../assets/images/image-menu/q4.jpeg";
import banner5 from "./../../../assets/images/image-menu/q5.jpeg";
import banner6 from "./../../../assets/images/image-menu/ABOUTPIGEON.jpg";
import banner7 from "./../../../assets/images/image-menu/PIGEONWAY.jpg";
import { constants } from "../../../utils/constants";

export default function ImageMenu(props) {
  const [currentImage, setCurrentImage] = useState(banner6);
  const bannerImages = [banner6, banner7, banner5, banner4];

  const setSliderImage = (index) => {
    setCurrentImage(bannerImages[index]);
  };

  return (
    <React.Fragment>
      <div
        className="image-menu"
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        <ul>
          <li
            onMouseOver={() => setSliderImage(0)}
          >
            <Link to={`/${props.language}/about`}>
              <span className="link-txt">
                {constants?.site_content?.Image_Menu?.title1[props.language]}
              </span>
            </Link>
          </li>
          <li
            onMouseOver={() => setSliderImage(1)}
          >
            <Link to={`/${props.language}/about`}>
              <span className="link-txt">
                {constants?.site_content?.Image_Menu?.title2[props.language]}
              </span>
            </Link>
          </li>
          <li
            onMouseOver={() => setSliderImage(2)}
          >
            <Link to={`/${props.language}/breastfeeding-advisor`}>
              <span className="link-txt">
                {constants?.site_content?.Image_Menu?.title3[props.language]}
              </span>
            </Link>
            {/* </a> */}
          </li>
          <li
            onMouseOver={() => setSliderImage(3)}
          >
            <Link to={`/${props.language}/mother-baby-world`}>
              <span className="link-txt">
                {constants?.site_content?.Image_Menu?.title4[props.language]}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}
