import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import SimpleButton from "../../../components/SimpleButton/SimpleButton";
import { babyCare } from "./../../../utils/data";
import { constants } from "./../../../utils/constants";

const BabyCare = ({ language }) => {
  const history = useHistory();

  return (
    <div className="baby-care-section">
      <Container>
        <Row>
          {constants?.site_content?.babyCare?.map(
            (x, index) => (
              <React.Fragment key={index + x.title}>
                <Col sm={12} md={4}>
                  <div className="baby-care-content">
                    <div className="baby-care-image-wrap">
                      <img
                        src={x.image}
                        alt={x.title[language]}
                        className="baby-care-image"
                      />
                    </div>
                    <div className="baby-care-text">
                      {/* <h6>{x.title}</h6> */}
                      <h6>{x.title[language]}</h6>
                      <p>{x.description[language]}</p>
                      {/* <h6
                      className="read-more"
                      onClick={() =>
                        history.push(`${x.link}`)
                      }
                    >
                      Read more{" "}
                      <FaLongArrowAltRight size="20px" />
                    </h6> */}
                      {/* <div
                      className="m-btn-simple"
                      onClick={() => history.push(`${x.link}`)}
                    >
                      <span>Learn More</span>
                    </div> */}
                      <SimpleButton
                        onClick={() =>
                          history.push(
                            `/${language}${x.link}`
                          )
                        }
                      >
                        {
                          constants?.site_content
                            ?.learn_more[language]
                        }
                      </SimpleButton>
                    </div>
                  </div>
                </Col>
              </React.Fragment>
            )
          )}
        </Row>
      </Container>
    </div>
  );
};

export default BabyCare;
