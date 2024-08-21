import React, { useState, useEffect } from "react";
import MainTitle from "./../../../components/MainTitle";
// import banner from "./../../../assets/images/products/banner.jpeg";
import banner from "./../../../assets/images/banner4.jpeg";
import { constants } from "../../../utils/constants";
import { connect } from "react-redux";

function ProductHeader(props) {
  const { global, categoryAr, categoryEn } = props;
  const [categoryImg, setCategoryImg] = useState();

  useEffect(() => {
    if (global?.activeLanguage === "ar") {
      if (categoryAr?.featured_img) {
        setCategoryImg(categoryAr?.featured_img || "");
      }
    }
    if (global?.activeLanguage === "en") {
      if (categoryEn?.featured_img) {
        setCategoryImg(categoryEn?.featured_img || "");
      }
    }
  }, [global.activeLanguage, categoryAr, categoryEn]);

  return (
    <div
      className="product-header"
      // style={{ backgroundImage: `url(${categoryImg || banner})` }}
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* <MainTitle
        text={"I am Category"
        }
      /> */}
      <MainTitle
        text={
          global?.activeLanguage === "ar"
            ? constants?.site_content?.our_products_heading.ar
            : constants?.site_content?.our_products_heading.en
        }
        category={global?.activeLanguage === "ar" ? categoryAr : categoryEn}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(ProductHeader);
