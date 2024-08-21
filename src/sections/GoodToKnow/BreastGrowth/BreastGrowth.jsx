import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import goodToKnow4 from "../../../assets/images/good-to-know/goodToKnow04.jpg";

const BreastGrowth = () => {
  return (
    <div className="breast-growth-section">
      <Container>
        <Row className="flex-column-reverse flex-lg-row">
          <Col md={7}>
            <div className="text-wrap">
              <h5>
                Pregnancy causes breast growth. That is to
                meet the coming baby’s requirements
              </h5>
              <p>
                During pregnancy, you might notice growth in
                your breasts. This is to be able to produce
                milk for the baby. Moreover, the darkness in
                areolas, sensitive nipples, and even a bit
                of growth in nipples is a known consequence.
                Growth in breasts varies in women. Some
                pregnant women might two cup sizes by the
                eighth month. However, no direct
                relationship has been found between breast
                growth and milk production. Milk requirement
                can be fulfilled even by smaller breasts.
                Breasts generally start producing a bit of
                milk after the Second Trimester. Some
                leakage is also common at full term.
              </p>
            </div>
          </Col>
          <Col md={5}>
            <div className="image-wrap">
              <img
                src={goodToKnow4}
                alt="breastGrowth"
                className="image"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BreastGrowth;
