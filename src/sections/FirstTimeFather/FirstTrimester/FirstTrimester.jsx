import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const FirstTrimester = ({ data, textOrder }) => {
  return (
    <div className="first-trimester-section">
      <Container>
        <Row className="first-trimester-row">
          <Col sm={{ span: 7, order: textOrder || 0 }}>
            <div className="text-wrap">
              <h5>{data?.title}</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.short_description,
                }}
              ></div>
            </div>
          </Col>
          <Col sm={5}>
            <div className="image-wrap">
              <img
                src={process.env.REACT_APP_IMAGE_BASE_URL + data?.featured_img}
                alt="GoodToKnow"
                className="image"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FirstTrimester;
