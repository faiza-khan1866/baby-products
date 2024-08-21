import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { pregnancy } from "./../../../utils/data";
import { constants } from "./../../../utils/constants";
import { connect } from "react-redux";
const Pregnancy = ({ language }) => {
  const history = useHistory();

  return (
    <div className="pregnancy-section">
      <Container>
        <Row>
          {constants?.site_content?.pregnancy?.map((x, index) => (
            <React.Fragment key={index + x.title}>
              <Col sm={12} md={6}>
                <div
                  className="pregnancy-content"
                  onClick={() => history.push(`/${language}${x.link}`)}
                >
                  <div className="preg-text-wrap">
                    <h2>{x.title[language]}</h2>
                  </div>
                  <div className="preg-image-wrap">
                    <img
                      src={x.image}
                      alt={x.title[language]}
                      className="image"
                    />
                  </div>
                </div>
              </Col>
            </React.Fragment>
          ))}
        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(Pregnancy);
