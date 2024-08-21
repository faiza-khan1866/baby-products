import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function GraphicInfo({ data }) {
  return (
    <div className="post-graphic-info">
      <Container>
        <Row>
          {data?.map((x) => (
            <Col sm={4}>
              <div className="inner-section">
                <h5>{x.title}</h5>
                <div dangerouslySetInnerHTML={{ __html: x?.description }}></div>
                <img
                  src={process.env.REACT_APP_IMAGE_BASE_URL + x?.featured_img}
                  alt={x.title}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default GraphicInfo;
