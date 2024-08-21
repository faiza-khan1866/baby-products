import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import first from "./../../../assets/images/pregnancy/1stmonth-1.png";
import second from "./../../../assets/images/pregnancy/1stmonth-2.png";

function MonthOne() {
  return (
    <div className="tab-item month-one-tab">
      <Container>
        <Row>
          <Col sm={3}>
            <img
              src={first}
              alt=""
              className="first-image"
            />
          </Col>
          <Col sm={9}>
            <h2>Your Body</h2>
            <p>
              Development during pregnancy is usually
              expressed in weeks. From the first day of your
              last menstrual period prior to conception to
              the sixth day following that is considered to
              be "week 0"; from the 7th day is counted as
              week 1 and so on. For this reason, the time
              prior to conception is included in the week
              count.
            </p>
            <div className="detailed-content">
              <Row>
                <Col sm={6}>
                  <h4>For your information</h4>
                  <p>
                    Development during pregnancy is usually
                    expressed in weeks. From the first day
                    of your last menstrual period prior to
                    conception to the sixth day following
                    that is considered to be "week 0"; from
                    the 7th day is counted as week 1 and so
                    on. For this reason, the time prior to
                    conception is included in the week
                    count.
                  </p>
                </Col>
                <Col sm={6}>
                  <h4>Your baby</h4>
                  <p>
                    Continuous cell division of the
                    fertilized egg takes place at a rapid
                    rate, and at 8 weeks the embryo becomes
                    a fetus.
                  </p>
                  <img src={second} alt="" />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MonthOne;
