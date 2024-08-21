import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import banner1 from "./../../../assets/images/promobanner/banner1.jpeg";
import banner4 from "./../../../assets/images/promobanner/banner4.jpg";
import banner5 from "./../../../assets/images/promobanner/banner5.jpg";
import ButtonTheme from "../../../components/ButtonTheme";
import { useHistory } from "react-router-dom";
import { constants } from "../../../utils/constants";
import { connect } from "react-redux";

function PromoBanner(props) {
  const history = useHistory();
  const src = props?.promo_details?.promoSection?.map((x) => x.video_link);

  return (
    <div className="promo-banner">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={40}
        totalSlides={2}
        infinite
        // isPlaying={true}
        isIntrinsicHeight
      >
        <Slider>
          <Slide index={0}>
            <div style={{cursor:"pointer"}} className="promo-item-image" onClick={() =>
                    history.push(
                      `/${props.global?.activeLanguage}/products/baby-skin-care`
                    )
                  }>
              <Image
                src={props.global?.activeLanguage == 'en' ? banner4 : banner5}
                hasMasterSpinner={true}
              />
              <div className="slider-text">
                {/* <h1>
                  {constants?.site_content?.Banner?.title[props.language]}
                </h1>
                <p>
                  {constants?.site_content?.Banner?.description[props.language]}
                </p> */}
                {/* <ButtonTheme
                  onClick={() =>
                    history.push(
                      `/${props.global?.activeLanguage}/product/liquid-cleanser`
                    )
                  }
                >
                  {
                    constants?.site_content?.Banner?.discover_button[
                      props.language
                    ]
                  }
                </ButtonTheme> */}
              </div>
            </div>
          </Slide>
          <Slide index={1}>
            <div className="promo-item-image">
              <Image
                src={banner1}
                hasMasterSpinner={true}
              />
              <div className="slider-text">
                <h1>
                  {constants?.site_content?.Banner?.title[props.language]}
                </h1>

                <p>
                  {constants?.site_content?.Banner?.description[props.language]}
                </p>
                <ButtonTheme
                  onClick={() =>
                    history.push(
                      `/${props.global?.activeLanguage}/product/liquid-cleanser`
                    )
                  }
                >
                  {
                    constants?.site_content?.Banner?.discover_button[
                      props.language
                    ]
                  }
                </ButtonTheme>
              </div>
            </div>
          </Slide>
        </Slider>
        <ButtonBack className="ctrl-button prev d-none d-md-block">
          <span className="button-svg"></span>
        </ButtonBack>
        <ButtonNext className="ctrl-button next d-none d-md-block">
          <span className="button-svg"></span>
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(PromoBanner);
