import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { constants } from "../../../utils/constants";
import Title from "./Title";
import { connect } from "react-redux";
import {
  getCategories,
  getCategoryProducts,
  getProducts,
} from "../../../redux/products";

function Welcome(props) {
  const history = useHistory();
  const { global } = props;
  return (
    <div className="welcome">
      <Title
        language={global?.activeLanguage}
      />
      <div className="content-wrapper">
        <Container>
          <Row>
            <Col sm={4}>
              <div className="title-wrapper">
                <p>
                  {constants.site_content.history_since[props.language]}
                </p>
                <h2>
                  {constants.site_content.Well_Come[props.language]}
                </h2>
                <div
                  className="d-flex align-items-center py-3 about-us-link"
                  onClick={() => history.push(`/${props.language}/about`)}
                >
                  <span
                    className="pr-sm-4"
                    style={{
                      fontWeight: 500,
                      color: "#666",
                      cursor: "pointer",
                    }}
                  >
                    {constants?.site_content?.about_us?.[props.language]}
                  </span>
                  <HiOutlineArrowCircleRight
                    fontSize="24px"
                    color="#ff0000"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <span
                  className="d-flex align-items-center read-message"
                  style={{
                    color: "#ff0000",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                  onClick={() =>
                    history.push(`/${props.language}/about`)
                  }
                >
                  <span className="pr-sm-4">
                    {constants?.site_content?.ceo_message[props.language]}
                  </span>
                </span>
              </div>
            </Col>
            <Col sm={{ span: 6, offset: 2 }}>
              <div
                className="text-wrapper"
              >
                <p>
                  {
                    constants?.site_content?.welcomeSectionDescription[
                      props.language
                    ]
                  }
                </p>
                <p>
                  {
                    constants?.site_content?.welcomeSectionDescription2[
                      props.language
                    ]
                  }
                </p>
                <p>
                  <strong>
                    {constants?.site_content?.about_ceo[props.language]}
                  </strong>
                </p>
              </div>
            </Col>
          </Row>
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
const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (page) => dispatch(getProducts(page)),
    getCategories: () => dispatch(getCategories()),
    getCategoryProducts: (category) => dispatch(getCategoryProducts(category)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
