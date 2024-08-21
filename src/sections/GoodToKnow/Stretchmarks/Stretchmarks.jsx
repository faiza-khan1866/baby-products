import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import goodToKnow3 from "../../../assets/images/good-to-know/goodToKnow03.jpg";

const Stretchmarks = () => {
  return (
    <div className="stretchmarks-section">
      <Container>
        <Row>
          <Col md={5}>
            <div className="image-wrap">
              <img
                src={goodToKnow3}
                alt="stretchmarks"
                className="image"
              />
            </div>
          </Col>
          <Col md={7}>
            <div className="text-wrap">
              <h5>Baby’s growth causes stretchmarks</h5>
              <p>
                Pregnancy causes your abdomen to get bigger
                and as a result, your skin stretches to put
                up with this growth. This extensive
                stretching of the tissue causes marks,
                generally termed as stretch marks. Stretch
                marks are those purplish-red lines that you
                see around your abdominal area. You might
                not like them but they are an indication
                that the baby is growing well so they’re not
                all bad.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Stretchmarks;
