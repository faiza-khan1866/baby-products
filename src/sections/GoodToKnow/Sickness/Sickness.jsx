import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import goodToKnow2 from "../../../assets/images/good-to-know/goodToKnow02.jpg";

const Sickness = () => {
  return (
    <div className="sickness-section">
      <Container>
        <Row className="flex-column-reverse flex-lg-row">
          <Col md={7}>
            <div className="text-wrap">
              <h5>
                Go easy on yourself while having morning
                sickness. Looking for distractions works
                like a charm
              </h5>
              <p>
                Pregnant women have to endure morning
                sickness. It might make you feel nauseous,
                lose your appetite, or you might even feel
                like vomiting.
              </p>
              <p>
                The reason behind morning sickness is found
                to be hormonal imbalance because of
                pregnancy. However, be sure to see a doctor
                if you are facing difficulty putting up with
                it.
              </p>
              <p>
                Babies inside their mother’s womb do not
                need too much nutrition so don’t stress
                about it. Just eat as much as you like and
                rest as much as you can.
              </p>
              <p>
                Vomiting causes dehydration so you need to
                drink a lot of water. Drink as much as
                possible even with breaks.
              </p>
            </div>
          </Col>
          <Col md={5}>
            <div className="image-wrap">
              <img
                src={goodToKnow2}
                alt="Sickness"
                className="image"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sickness;
