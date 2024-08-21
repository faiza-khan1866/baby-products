import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./GoodToKnowCard.scss";

const GoodToKnowCard = (props) => {
  return (
    <div className="goodtoknow-card">
      <Container>
        <Row className="good-to-know-row-reverse">
          <Col sm={{ span: 7, order: props.textOrder || 0 }}>
            <div className="text-wrap-good">
              <h5>{props.goodToKnowData?.title}</h5>

              <div
                dangerouslySetInnerHTML={{
                  __html: props.goodToKnowData?.content,
                }}
              ></div>
            </div>
          </Col>
          <Col sm={5}>
            <div className="image-wrap-good">
              {props.goodToKnowData?.featured_img && (
                <img
                  src={
                    process.env.REACT_APP_IMAGE_BASE_URL +
                    props.goodToKnowData?.featured_img
                  }
                  alt=""
                  className="good-to-know-image"
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GoodToKnowCard;
