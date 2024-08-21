import React from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import FeedingAdvisor from "../../../assets/images/feeding-advisor/feeding-advisor.jpeg";
import { FaRegEye, FaRegComments, FaRegCalendarAlt } from "react-icons/fa";

// const currentDate = new Date().toLocaleDateString();
const MilkDrinks = (props) => {
  return (
    <div className="milk-drinks-section">
      <Container>
        <div className="content-wrap">
          <div className="image-wrap">
            <img
              src={process.env.REACT_APP_IMAGE_BASE_URL + props.banner_img}
              alt="FeedingAdvisor"
              className="image"
            />
          </div>
          <div className="text-wrap">
            {/* <Row className="flex-column-reverse flex-sm-row"> */}
            <Row>
              <Col sm={8}>
                <Badge variant="secondary" className="mb-2">
                  {props.language === "en" ? "Article #" : "مقالة #"}{" "}
                  {props.index + 1}
                </Badge>
                <Badge variant="secondary" className="ml-2 mb-2">
                  {props.language === "en"
                    ? props?.categories?.title
                    : props?.arabiCatename?.categories?.arabic?.title}
                </Badge>
                <h2>{props.title}</h2>
                {props.content?.map((x) => (
                  <>
                    <div
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: x.description,
                      }}
                    ></div>
                    {x.image ? (
                      <img
                        src={process.env.REACT_APP_IMAGE_BASE_URL + x.image}
                        alt=""
                        style={{ marginBottom: "1rem" }}
                      />
                    ) : null}
                  </>
                ))}
              </Col>
              <Col sm={4}>
                <div className="detailed-image">
                  <img
                    src={
                      process.env.REACT_APP_IMAGE_BASE_URL + props.featured_img
                    }
                    alt=""
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MilkDrinks;
