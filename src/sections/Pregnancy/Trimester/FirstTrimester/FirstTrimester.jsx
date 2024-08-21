import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TrimesterCard from "../../../../components/TrimesterCard";
import mainImage from "./../../../../assets/images/trimester/trimester1.png";
import { firstTrimesterPregnancy } from "../../../../utils/data";
import { constants } from "./../../../../utils/constants";

const FirstTrimester = (props) => {
  return (
    <div className="first-trimester-pregnancy-section">
      <Container>
        <Row>
          <Col xs={12} sm={3} className="d-none d-sm-block">
            <div className="image-wrap">
              <img
                src={process.env.REACT_APP_IMAGE_BASE_URL + props.image}
                alt=""
                className="image"
              />
            </div>
          </Col>
          <Col xs={12} sm={9}>
            <div className="heading-wrap">
              {/* {props.language === "ar"
                  ? `${constants?.site_content?.firstTrimester?.ar}`
                  : `${constants?.site_content?.firstTrimester?.en}`} */}

              {props.language === "ar" ? (
                <h2>
                  {" "}
                  الفصل <span> الأول </span>
                </h2>
              ) : (
                <h2>
                  <span>1st</span> Trimester
                </h2>
              )}
            </div>
            <TrimesterCard
              content={props.trimesterData?.content}
              bgColor="#fedddc"
            />
            {/* {firstTrimesterPregnancy?.map((x) => (
              <TrimesterCard
                key={x.title}
                title={x.title}
                details={x.details}
                bgColor="#fedddc"
              />
            ))} */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FirstTrimester;
