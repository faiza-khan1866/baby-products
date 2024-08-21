import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { constants } from "../../utils/constants";

function MonthTab(props) {
  return (
    <div className="tab-item month-tab">
      <Container>
        <Row>
          <Col sm={3}>
            <div className="image-wrap">
              <img
                src={process.env.REACT_APP_IMAGE_BASE_URL + props.featured_img}
                alt=""
                className="first-image"
              />
            </div>
          </Col>
          <Col sm={9}>
            {/* <h2>Your Body</h2> */}
            <h2>
              {constants?.site_content?.pregnancy_first_title[props.language]}
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: props.bodyText,
              }}
            ></div>
            <div className="detailed-content">
              <Row>
                <Col sm={6}>
                  <h4>
                    {
                      constants?.site_content?.pregnancy_your_information[
                        props.language
                      ]
                    }
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.infoText,
                    }}
                  ></div>
                </Col>
                <Col sm={6}>
                  <h4>
                    {
                      constants?.site_content?.pregnancy_your_baby[
                        props.language
                      ]
                    }
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.babyText,
                    }}
                  ></div>
                  {/* <img src={props.secondImage} alt="" /> */}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MonthTab;
