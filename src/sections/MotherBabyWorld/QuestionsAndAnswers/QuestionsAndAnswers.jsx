import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import QuesAnsImage from "../../../assets/images/mother-baby-images/q_a_1_r.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import SimpleButton from "../../../components/SimpleButton/SimpleButton";
import { constants } from "../../../utils/constants";

const QuestionsAndAnswers = ({ language }) => {
  const history = useHistory();

  return (
    <div className="ques-ans-section">
      <Container>
        <div className="page-heading-wrapper">
          {/* <h1>Mother &amp; Baby World</h1> */}
          <h1>
            {
              constants?.site_content?.mother_baby_heading[
                language
              ]
            }
          </h1>
        </div>
        <div className="ques-ans-wrapper">
          <Container className="row-container">
            {/* <Row className="m-0">
              <Col sm={12} md={{ span: 8, offset: 4 }}>
                <h2 className="ques-ans-heading">Questions And Answers</h2>
              </Col>
            </Row> */}
            <Row className="m-0">
              <Col sm={12} md={4}>
                <div className="ques-ans-image-wrap">
                  <img
                    src={QuesAnsImage}
                    alt="Q_A_Image"
                    className="ques-ans-image"
                  />
                </div>
              </Col>
              <Col sm={12} md={8} lg={6}>
                <div className="ques-ans-content">
                  <h2 className="ques-ans-heading">
                    {
                      constants?.site_content
                        ?.question_title[language]
                    }
                  </h2>
                  <p className="ques-ans-text">
                    {
                      constants?.site_content
                        ?.question_description[language]
                    }
                  </p>
                  {/* <h6
                    className="read-more"
                    onClick={() => history.push("/faq")}
                  >
                    Read more <FaLongArrowAltRight size="20px" />
                  </h6> */}
                  {/* <div
                    className="m-btn-simple"
                    onClick={() => history.push("/faq")}
                  >
                    <span>Learn More</span>
                  </div> */}
                  <SimpleButton
                    onClick={() =>
                      history.push(`/${language}/faq`)
                    }
                  >
                    {
                      constants?.site_content?.learn_more[
                        language
                      ]
                    }
                  </SimpleButton>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default QuestionsAndAnswers;
