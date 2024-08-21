import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import windowSize from "react-window-size";
import { API } from "../../../http/API";

import ButtonTheme from "../../../components/ButtonTheme/ButtonTheme";
// import HoverCurve from "../../../components/HoverCurve/HoverCurve";
import { Link, useHistory } from "react-router-dom";
import { constants } from "../../../utils/constants";
import { connect } from "react-redux";
// import { categoryProducts } from "./../../../utils/data";

function ProductSlider(props) {
  const [visibleSlides, setVisibleSlides] = useState(4);
  const history = useHistory();
  useEffect(() => {
    if (props.windowWidth < 578) {
      setVisibleSlides(1);
    }
    if (props.windowWidth > 578 && props.windowWidth < 767) {
      setVisibleSlides(2);
    }
    if (props.windowWidth > 767) {
      setVisibleSlides(4);
    }
  }, [props.windowWidth]);

  return (
    <div className="product-slider">
      <div className="section-title-underlined">
        <h3>{constants.site_content.recommended_products[props.language]}</h3>
      </div>
      <CarouselProvider
        naturalSlideWidth={10}
        naturalSlideHeight={8}
        totalSlides={props.products?.length}
        infinite
        visibleSlides={visibleSlides}
        isIntrinsicHeight
        dir={props.global?.activeLanguage === "en" ? "" : "ltr"}
      >
        <Container>
          <Slider>
            {props.products?.map((x, index) => (
              <Slide index={index} className="product-slide" key={index}>
                <div className="inner">
                  <Link
                    to={`/${
                      props.global?.activeLanguage
                    }/product/${encodeURIComponent(x.route)}`}
                  >
                    <div className="wave-overlay"></div>

                    <Image
                      src={
                        process.env.REACT_APP_IMAGE_BASE_URL + x.featured_img
                      }
                      hasMasterSpinner={true}
                    />
                    <p className="slide-title mb-0">
                      {props.isArabic ? x.arabic?.name : x.name}
                    </p>
                  </Link>
                  <Link
                    className="overlay-title"
                    to={`/${
                      props.global?.activeLanguage
                    }/product/${encodeURIComponent(x.route)}`}
                  >
                    <ButtonTheme
                      style={{
                        background: "#fff",
                        border: "1px solid #fff",
                        borderRadius: "0",
                        color: "#e65550",
                      }}
                      onClick={() => {
                        history.push(
                          `/${
                            props.global?.activeLanguage
                          }/product/${encodeURIComponent(x.route)}`
                        );
                      }}
                    >
                      {props.global.activeLanguage == "en"
                        ? "View Details"
                        : "عرض التفاصيل"}
                    </ButtonTheme>
                  </Link>
                </div>
              </Slide>
            ))}
          </Slider>
          <ButtonBack className="ctrl-button prev">
            <span className="button-svg"></span>
          </ButtonBack>
          <ButtonNext className="ctrl-button next">
            <span className="button-svg"></span>
          </ButtonNext>
        </Container>
      </CarouselProvider>
      <ButtonTheme
        variant="primary"
        style={{ fontSize: "16px" }}
        outline
        className="btn-view-all"
        size="sm"
      >
        <Link to={`/${props.global.activeLanguage}/products`}>
          {constants.site_content.view_all_products[props.language]}
        </Link>
      </ButtonTheme>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(windowSize(ProductSlider));
