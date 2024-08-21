import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const ThirdTrimester = ({ data }) => {
  return (
    <div className="third-trimester-section">
      <Container>
        <Row>
          <Col sm={5}>
            <div className="image-wrap">
              <img
                src={data?.featured_img}
                alt="stretchmarks"
                className="image"
              />
            </div>
          </Col>
          <Col sm={7}>
            <div className="text-wrap">
              {/* <h5>
                Entering the Final Trimester of Pregnancy
              </h5>
              <p>
                This is the time when the mother has taken
                up a considerable size so she will face
                problems such as backache, swollen legs, and
                fatigue. It is time for you to support her
                both mentally and physically. Massaging her
                shoulders and back might be a good idea.
              </p> */}
              <h5>{data?.title}</h5>
              <div
                dangerouslySetInnerHTML={{ __html: data?.short_description }}
              ></div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ThirdTrimester;
