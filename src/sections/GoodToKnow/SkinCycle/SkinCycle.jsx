import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import goodToKnow1 from "../../../assets/images/good-to-know/goodToKnow01.jpg";

const SkinCycle = () => {
  return (
    <div className="skin-cycle-section">
      <Container>
        <h1>Good to Know</h1>
        <Row className="skin-cycle-row">
          <Col sm={12} md={5}>
            <div className="image-wrap">
              <img
                src={goodToKnow1}
                alt="GoodToKnow"
                className="image"
              />
            </div>
          </Col>
          <Col sm={12} md={7}>
            <div className="text-wrap">
              <h5>
                Pregnancy causes skin changes - Keep that in
                mind
              </h5>
              <p>
                You might feel changes in your skin during
                pregnancy. Hormone imbalances are a common
                occurrence and skin loses its ability to
                revitalize. You should follow an effective
                skincare routine to be able to protect
                yourself.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SkinCycle;
