import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TrimesterCard from "../../../../components/TrimesterCard";
import mainImage from "./../../../../assets/images/trimester/trimester2.png";
import { secondTrimesterPregnancy } from "../../../../utils/data";

const SecondTrimester = (props) => {
  return (
    <div className="second-trimester-pregnancy-section">
      <Container>
        <Row className="">
          <Col sm={9}>
            <div className="heading-wrap">
            {
                props.language 
                 === "ar" 
                 ? <h2> الفصل <span> الثاني </span></h2>
                 : <h2><span>2nd</span> Trimester</h2>
                 
                 }
            </div>
            <TrimesterCard
              content={props.trimesterData?.content}
              bgColor="#ffe5d4"
            />
            {/* {secondTrimesterPregnancy?.map((x) => (
              <TrimesterCard
                key={x.title}
                title={x.title}
                details={x.details}
                // bgColor="#e1d7d7"
                bgColor="#fff6da"
                // bgColor="#ffe5d4"
              />
            ))} */}
          </Col>
          <Col sm={3} className="d-none d-sm-block">
            <div className="image-wrap">
              <img
                src={mainImage}
                alt=""
                className="image"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SecondTrimester;
