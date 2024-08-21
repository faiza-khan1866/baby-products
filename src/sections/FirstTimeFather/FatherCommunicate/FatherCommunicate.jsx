import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const FatherCommunicate = ({ data }) => {
  return (
    <div className="father-communicate-section">
      <Container>
        <Row className="row-reverse-wrap">
          <Col sm={7}>
            <div className="text-wrap">
              {/* <h5>
                As a husband, as a father. Communicate with
                your wife
              </h5>
              <p>
                Once you bring your baby home for the first
                time, your life will definitely change. Your
                partner will take time recovering from the
                childbirth and coping up with the toll that
                breastfeeding takes on her body. Her life
                will completely revolve around the child so
                you as a husband might feel frustrated
                unknowingly.
              </p>
              <p>
                This is the first difficulty you’ll face. It
                doesn’t matter if your life is consumed by
                your work, you should take out time for your
                family as much as you can. You have now
                started raising a baby so you should not
                leave all the duties to the mother. Work as
                partners so you can enjoy it as well as
                build up experience as parents. Make sure
                you keep the new born babies items ready in
                case the need arises because this is the
                time when the baby needs extra care.
              </p> */}
              <h5>{data?.title}</h5>
              <div
                dangerouslySetInnerHTML={{ __html: data?.short_description }}
              ></div>
            </div>
          </Col>
          <Col sm={5}>
            <div className="image-wrap">
              <img src={data?.featured_img} alt="" className="image" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FatherCommunicate;
