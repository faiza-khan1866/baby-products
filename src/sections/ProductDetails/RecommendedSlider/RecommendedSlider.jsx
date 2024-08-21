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

import { Link, useHistory } from "react-router-dom";
import ButtonTheme from "../../../components/ButtonTheme";
import { constants } from "../../../utils/constants";

function RecommendedSlider(props) {
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
    <div className="recommended-slider">
      <div className="section-title-underlined">
        <h3>{constants.site_content.related_products[props.language]}</h3>
      </div>
      <CarouselProvider
        naturalSlideWidth={10}
        naturalSlideHeight={8}
        totalSlides={props.products?.length - 1}
        infinite
        visibleSlides={visibleSlides}
        isIntrinsicHeight
        className="recommended-carousel"
        dir={props.language === "en" ? "" : "ltr"}
      >
        <Container>
          <Slider>
            {props.products?.map(
              (x, index) =>
                props.currentProduct.name !== x.name && (
                  <Slide index={index} className="product-slide">
                    <div
                      className="inner"
                      onClick={() => {
                        props.setShowProduct();
                      }}
                    >
                      <Link
                        to={`/${props.language}/product/${encodeURIComponent(
                          x.route
                        )}`}
                      >
                        <div className="wave-overlay"></div>
                        <Link
                          className="overlay-title"
                          to={`/${props.language}/product/${encodeURIComponent(
                            x.route
                          )}`}
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
                                  props.language
                                }/product/${encodeURIComponent(x.route)}`
                              );
                              // window.location.reload();
                            }}
                          >
                            {props.language == "en"
                              ? "View Details"
                              : "عرض التفاصيل"}
                          </ButtonTheme>
                        </Link>
                        <Image
                          src={
                            process.env.REACT_APP_IMAGE_BASE_URL +
                            x.featured_img
                          }
                          hasMasterSpinner={true}
                        />
                        <p className="slide-title mb-0">
                          {props.isArabic ? x.arabic?.name || "" : x.name || ""}
                        </p>
                        <div className="pt-0 mb-2 d-flex align-items-center justify-content-center">
                          {/* <ReactStars
                        count={5}
                        value={
                          Math.round(x.avg_rating * 2) / 2
                        }
                        size={18}
                        activeColor="gold"
                        edit={false}
                        color="#eaeaea"
                        isHalf
                      />
                      {props.rating_count > 0 && (
                        <span className="text-secondary small">
                          ({x.reviews?.length || 0})
                        </span>
                      )} */}
                        </div>
                      </Link>
                    </div>
                  </Slide>
                )
            )}
          </Slider>
          {props.products?.length > 4 && (
            <div>
              <ButtonBack className="ctrl-button prev">
                <span className="button-svg"></span>
              </ButtonBack>
              <ButtonNext className="ctrl-button next">
                <span className="button-svg"></span>
              </ButtonNext>
            </div>
          )}
        </Container>
      </CarouselProvider>
    </div>
  );
}

export default windowSize(RecommendedSlider);
