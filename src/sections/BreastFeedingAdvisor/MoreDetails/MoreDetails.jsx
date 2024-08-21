import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import ButtonTheme from "../../../components/ButtonTheme";
// import { BiPlusMedical } from "react-icons/bi";
import {
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import {
  FacebookShareButton,
  PinterestShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
// import { AiFillPrinter } from "react-icons/ai";
import SimpleButton from "../../../components/SimpleButton/SimpleButton";
import { connect } from "react-redux";

const MoreDetails = (props) => {
  return (
    <div className="more-details-section">
      <Container>
        <div className="links-wrap">
          <SimpleButton
            className={`m-btn-simple-back ${!props.previousLink && "btn-hide"}`}
            onClick={() => props.handlePreviousClick(props.previousLink)}
          >
            {/* <div> */}
            {props.previousLink && (
              <Link
                to="#"
                // onClick={() => props.handlePreviousClick(props.previousLink)}
              >
                {/* <IoIosArrowBack className="icon" /> */}
                <text className="d-none d-md-inline">
                  {/* How Does a baby drink breast milk? */}
                  {props.previousTitle}
                </text>
              </Link>
            )}
          </SimpleButton>

          {/* </div> */}
          {/* <div> */}
          <SimpleButton
            className={`m-btn-simple-next ${!props.nextLink && "btn-hide"}`}
            onClick={() => props.handleNextClick(props.nextLink)}
          >
            {props.nextLink && (
              <Link
                to="#"
                // onClick={() => props.handleNextClick(props.nextLink)}
              >
                <text className="d-none d-md-inline">
                  {/* How Does a baby drink breast milk? */}
                  {props.nextTitle}
                </text>
                {/* <IoIosArrowForward className="icon" /> */}
              </Link>
            )}
          </SimpleButton>

          {/* </div> */}
        </div>

        <div className="article-button-wrap">
          <FacebookShareButton
            url={`https://www.pigeonarabia.com/${
              props.global?.activeLanguage
            }/breastfeeding-advisor/${
              props.currentCategorySlug
            }/${props.activeArticle?.title.replace(/\s+/g, "-")}`}
            quote={`
            ${props.activeArticle?.title}
            \n
            Check out our latest articles here:
                      \n
                      https://www.pigeonarabia.com/${props.global?.activeLanguage}/breastfeeding-advisor
                      `}
            hashtag={"#pigeon"}
          >
            <ButtonTheme className="facebook-button">
              <FaFacebookF className="facebook-icon" />
              <span className="d-none d-sm-block">
                {props.global?.activeLanguage === "en" ? "Facebook" : "فيسبوك"}
              </span>
            </ButtonTheme>
          </FacebookShareButton>
          <TwitterShareButton
            url={`https://www.pigeonarabia.com/${
              props.global?.activeLanguage
            }/breastfeeding-advisor/${
              props.currentCategorySlug
            }/${props.activeArticle?.title.replace(/\s+/g, "-")}`}
            title={props.activeArticle?.title || "Pigeon Global"}
            hashtags={["pigeon", "pigeon_arabia"]}
          >
            <ButtonTheme className="twitter-button">
              <FaTwitter className="twitter-icon" />
              <span className="d-none d-sm-block">
                {props.global?.activeLanguage === "en" ? "Twitter" : "تويتر"}
              </span>
            </ButtonTheme>
          </TwitterShareButton>
          <LinkedinShareButton
            url={`https://www.pigeonarabia.com/${props.global?.activeLanguage}/mother-baby-products`}
            title={"Pigeon Global"}
            source={`https://www.pigeonarabia.com/${props.global?.activeLanguage}/product/${props.activeArticle?._id}`}
            summary={`Check out our latest products here:
                      \n
                      https://www.pigeonarabia.com/${props.global?.activeLanguage}/mother-baby-products
                      `}
          >
            <ButtonTheme className="print-button">
              <FaLinkedinIn className="print-icon" />
              <span className="d-none d-sm-block">
                {props.global?.activeLanguage === "en"
                  ? "Linked-In"
                  : "لينكد إن"}
              </span>
            </ButtonTheme>
          </LinkedinShareButton>
          {/* {console.log("activeArticle ::",props.activeArticle)} */}
          <PinterestShareButton
            media={
              process.env.REACT_APP_IMAGE_BASE_URL +
              props.activeArticle?.featured_img
            }
            url={`https://www.pigeonarabia.com/${props.global?.activeLanguage}/product/${props.activeArticle?._id}`}
            description={`Check out our latest products here:
                    \n
                    https://www.pigeonarabia.com/${props.global?.activeLanguage}/mother-baby-products
                    `}
          >
            <ButtonTheme className="more-button">
              <FaPinterestP className="pinterest-icon" />
              <span className="d-none d-sm-block">
                {props.global?.activeLanguage === "en" ? "Pinterest" : "بنترست"}
              </span>
            </ButtonTheme>
          </PinterestShareButton>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreDetails);
