import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const SecondTrimester = ({ data }) => {
  return (
    <div className="second-trimester-section">
      <Container>
        {/* <Row className="flex-column-reverse flex-lg-row"> */}
        <Row className="row-reverse-wrap">
          <Col sm={7}>
            <div className="text-wrap">
              {/* <h5>Toward Mid-pregnancy</h5>
              <p>
                This is more of a stable stage when the
                mother has settled herself and she is at
                ease. The pregnancy will definitely be more
                visible now. She won’t be able to do a lot
                of things so stress may take a hold of her,
                so you should be willing to spend more time
                with her. Maybe take her out for shopping or
                walks to cheer her up. Choose the venues
                where she can relax and spend some leisure
                time. It might be a good idea to join her in
                childcare-related classes. You may learn and
                understand the process better and also bond
                closer with your partner.
              </p> */}
              <h5>{data?.title}</h5>
              <div
                dangerouslySetInnerHTML={{ __html: data?.short_description }}
              ></div>
            </div>
          </Col>
          <Col sm={5}>
            <div className="image-wrap">
              <img src={data?.featured_img} alt="Sickness" className="image" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SecondTrimester;
