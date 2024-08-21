import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TrimesterCard from "../../../../components/TrimesterCard";
import mainImage from "./../../../../assets/images/trimester/trimester3.png";
import { thirdTrimesterPregnancy } from "../../../../utils/data";

const ThirdTrimester = (props) => {
  return (
    <div className="third-trimester-pregnancy-section">
      <Container>
        <Row>
          <Col xs={12} sm={3} className="d-none d-sm-block">
            <div className="image-wrap">
              <img src={mainImage} alt="" className="image" />
            </div>
          </Col>
          <Col xs={12} sm={9}>
            <div className="heading-wrap">
              {props.language === "ar" ? (
                <h2>
                  ‎ الفصل <span> الثالث</span>{" "}
                </h2>
              ) : (
                <h2>
                  <span>3rd</span> Trimester
                </h2>
              )}
            </div>
            <TrimesterCard
              content={props.trimesterData?.content}
              bgColor="#e1d7d7"
            />
            {/* {thirdTrimesterPregnancy?.map((x) => (
              <TrimesterCard
                key={x.title}
                title={x.title}
                details={x.details}
                bgColor="#e1d7d7"
              />
            ))} */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ThirdTrimester;
