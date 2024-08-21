import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import visionImage from "./../../../assets/images/vision.svg";
import Avatar from "@material-ui/core/Avatar";
import {constants} from "../../../utils/constants";

function PigeonWayTab(props) {
  return (
      <div className="pigeon-way-tab">
        <Container>
          <div className="header">
            {/* <h2 className="title">Pigeon Way</h2> */}
            {/* <h2 className="title">Pigeon Way</h2> */}
            {/* <h5 className="sub-title">
            What is the PIGEON Way ?
          </h5> */}
            <p className="description-text">
                {
                    constants?.site_content?.PigeonWay?.title[
                        props.language
                        ]
                }
              {/*Our basic ideology which is also termed ‘The Pigeon Way’ is the*/}
              {/*basis of all our strategies. It also represents exactly what we feel*/}
              {/*in heart and how we shape our actions.*/}
            </p>
          </div>
          <div className="content">
            <Container fluid>
              <Row>
                <Col sm={4}>
                  <div className="philosophy">
                    <h4 className="section-title d-flex justify-content-start align-items-center">
                      <Avatar className={"avatar"}>
                          {
                              constants?.site_content?.PigeonWay?.avatar1[
                                  props.language
                                  ]
                          }
                      </Avatar>
                        {
                            constants?.site_content?.PigeonWay?.description1[
                                props.language
                                ]
                        }
                    </h4>
                    <h5 className="love-text">" {
                        constants?.site_content?.PigeonWay?.point1[
                            props.language
                            ]
                    }"</h5>
                    <h5 className="credo-text">
                        {
                            constants?.site_content?.PigeonWay?.point2[
                                props.language
                                ]
                        }
                    </h5>
                    <p className="credo-line">“{
                        constants?.site_content?.PigeonWay?.point3[
                            props.language
                            ]
                    }
                        ”</p>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="values">
                    <h4 className="section-title d-flex justify-content-start align-items-center">
                      <Avatar className={"avatar"}>
                          {
                              constants?.site_content?.PigeonWay?.avatar2[
                                  props.language
                                  ]
                          }
                      </Avatar>{
                        constants?.site_content?.PigeonWay?.description2[
                            props.language
                            ]
                    }
                    </h4>
                    <div className="checklist">
                      <p>
                      <span
                          // className="icon-pebble"
                          className={`icon-pebble ${
                              props.language === "ar"
                                  ? "icon-pebble-Arabic"
                                  : ""
                          }`}
                      >
                        <BiCheck className="check-icon"/>
                      </span>
                        {/* <AiFillCheckCircle className="check-icon" /> */}
                        <span>
                            {
                                constants?.site_content?.PigeonWay?.point4[
                                    props.language
                                    ]
                            }
                        </span>
                      </p>
                      <p>
                        {/* <AiFillCheckCircle className="check-icon" /> */}
                        <span
                            // className="icon-pebble"
                            className={`icon-pebble ${
                                props.language === "ar"
                                    ? "icon-pebble-Arabic"
                                    : ""
                            }`}
                        >
                        <BiCheck className="check-icon"/>
                      </span>
                        <span>
                            {
                                constants?.site_content?.PigeonWay?.point5[
                                    props.language
                                    ]
                            }
                        </span>
                      </p>
                      <p>
                        {/* <AiFillCheckCircle className="check-icon" /> */}
                        <span
                            // className="icon-pebble"
                            className={`icon-pebble ${
                                props.language === "ar"
                                    ? "icon-pebble-Arabic"
                                    : ""
                            }`}
                        >
                        <BiCheck className="check-icon" />
                      </span>
                        <span>
                            {
                                constants?.site_content?.PigeonWay?.point6[
                                    props.language
                                    ]
                            }
                        </span>
                      </p>
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="vision">
                    <img src={visionImage} alt="pigeon vision" />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
      </div>
  );
}

export default PigeonWayTab;
