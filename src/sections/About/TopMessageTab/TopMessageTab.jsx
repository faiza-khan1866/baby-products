import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { API } from "../../../http/API";
import ceoCard from "./../../../assets/images/ceo_card.jpeg";
import { connect } from "react-redux";

function TopMessageTab(props) {
  const [topMessageData, setTopMessageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    if (props.currentPage._id) {
      setCurrentPage(props.currentPage);
      API.get(`auth/all_widgets/${props.currentPage._id}`)
        .then((res) => {
          let widget_content = res.data[res.data.length - 1].widget_content;
          setTopMessageData(widget_content);
        })
        .catch((err) => console.log(err));
    }
  }, [props.currentPage]);

  const { global } = props;

  return (
    <div className="top-message-tab">
      {/* <div className="top-title">
        <Container>
          <h2>Top Message</h2>
        </Container>
      </div> */}
      <div className="ceo-message-wrapper d-none d-sm-block">
        <Container>
          <div className="ceo-message">
            <div
              className={`graphic-section ${
                props.language === "ar" ? "graphic-section-Arabic" : ""
              }`}
              // className="graphic-section"
            >
              <img
                src={
                  process.env.REACT_APP_IMAGE_BASE_URL + topMessageData?.image
                }
                alt="CEO Intro"
              />
            </div>
            <div className="text-section">
              <div
                className={`message-body ${
                  props.language === "ar" ? "message-body-Arabic" : ""
                }`}
                // className="message-body"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${
                      global?.activeLanguage === "ar"
                        ? topMessageData?.arabic?.first_content
                        : topMessageData?.first_content
                    }`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="ceo-message-wrapper-mobile d-block d-sm-none"></div>
      <div className="detailed-message">
        <Container>
          <h4>
            {global?.activeLanguage === "ar"
              ? topMessageData?.arabic?.second_title
              : topMessageData?.second_title}
          </h4>
          <p
            dangerouslySetInnerHTML={{
              __html: `${
                global?.activeLanguage === "ar"
                  ? topMessageData?.arabic?.second_content
                  : topMessageData?.second_content
              }`,
            }}
          ></p>
        </Container>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(TopMessageTab);
