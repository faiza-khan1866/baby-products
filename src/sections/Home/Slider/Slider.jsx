import React, { Component } from "react";
import { FullpageAccordion, Panel } from "react-fullpage-accordion";
import "react-fullpage-accordion/dist/react-fullpage-accordion.css";
import { Accordion, Card } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import slider1 from "./../../../assets/images/slider/slider_01.jpg";
import slider2 from "./../../../assets/images/slider/slider_02.jpg";
import slider3 from "./../../../assets/images/slider/slider_03.jpg";
import { constants } from "../../../utils/constants";

export default class Slider extends Component {
  parentRef = React.createRef();

  state = {
    activeClasses: "open open-active",
    language: "arabic",
  };

  componentDidMount() {
    this.parentRef.current.addEventListener(
      "click",
      function (event) {
        if (this.parentRef?.current !== event.target) {
          return;
        } else {
        }
      },
      false
    );
  }

  render() {
    return (
      <>
        <div
          ref={this.parentRef}
          className={`accordion-slider ${
            this.props.activeLanguage === "ar" ? "arabic-text" : "english-text"
          }`}
          onClick={(e) => {
            if (e.target === this.parentRef.current) {
              e.stopPropagation();
            } else {
              e.stopPropagation();
            }
          }}
        >
          <FullpageAccordion panelClick={() => null}>
            <Panel itemId="0" background={slider1}>
              <h3 className="main-heading">
                <a className="accordion-link" href="#">
                  {
                    constants?.site_content?.slider_content?.slider_one?.title[
                      this.props.activeLanguage
                    ]
                  }
                </a>
              </h3>
              <div className="content">
                <h3>
                  <a className="accordion-link" href="#">
                    {
                      constants?.site_content?.slider_content?.slider_one
                        ?.title[this.props.activeLanguage]
                    }
                  </a>
                </h3>
                <span
                >
                  {
                    constants?.site_content?.slider_content?.slider_one
                      ?.description[this.props.activeLanguage]
                  }
                </span>
              </div>
            </Panel>
            <Panel itemId="1" background={slider2}>

              <h3 className="main-heading">
                <a className="accordion-link" href="/">
                  {
                    constants?.site_content?.slider_content?.slider_Two?.title[
                      this.props.activeLanguage
                    ]
                  }
                </a>
              </h3>
              <div className="content">
                <h3>
                  <a className="accordion-link" href="/">
                    {
                      constants?.site_content?.slider_content?.slider_Two
                        ?.title[this.props.activeLanguage]
                    }
                  </a>
                </h3>
                <span>
                  {
                    constants?.site_content?.slider_content?.slider_Two
                      ?.description[this.props.activeLanguage]
                  }
                </span>
              </div>
            </Panel>
            <Panel itemId="2" background={slider3}>
              <h3 className="main-heading">
                <a className="accordion-link" href="/">
                  {
                    constants?.site_content?.slider_content?.slider_Three
                      ?.title[this.props.activeLanguage]
                  }
                </a>
              </h3>
              <div className="content">
                <h3>
                  <a className="accordion-link" href="/">
                    {
                      constants?.site_content?.slider_content?.slider_Three
                        ?.title[this.props.activeLanguage]
                    }
                  </a>
                </h3>
                <div
                  className="story-text">
                  <p>
                    {
                      constants?.site_content?.slider_content?.slider_Three
                        ?.description1[this.props.activeLanguage]
                    }
                    </p>
                    <p>
                      {
                      constants?.site_content?.slider_content?.slider_Three
                        ?.description2[this.props.activeLanguage]
                    }
                  </p>
                  <p>
                    {
                      constants?.site_content?.slider_content?.slider_Three
                        ?.description3[this.props.activeLanguage]
                    }
                   
                  </p>
                  <p>
                    {
                      constants?.site_content?.slider_content?.slider_Three
                        ?.description4[this.props.activeLanguage]
                    }
                  </p>
                  <p>
                    {
                      constants?.site_content?.slider_content?.slider_Three
                        ?.description5[this.props.activeLanguage]
                    }
                  </p>
                </div>
              </div>
            </Panel>
          </FullpageAccordion>
        </div>
        <div className="accordian-mobile">
          <ul>
            <li style={{ backgroundImage: `url(${slider1})` }}>
              <a href="#">
                <Accordion key="purpose">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      <div className="d-flex justify-content-between align-items-center">
                        <h3>
                          {
                            constants?.site_content?.slider_content?.slider_one
                              ?.title[this.props.activeLanguage]
                          }
                        </h3>
                        <IoAdd fontSize="36px" />
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <p>
                          {
                            constants?.site_content?.slider_content?.slider_one
                              ?.description[this.props.activeLanguage]
                          }
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </a>
            </li>
            <li style={{ backgroundImage: `url(${slider2})` }}>
              <a href="#">
                <Accordion key="promise">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      <div className="d-flex justify-content-between align-items-center">
                        <h3>
                          {
                            constants?.site_content?.slider_content?.slider_Two
                              ?.title[this.props.activeLanguage]
                          }
                        </h3>
                        <IoAdd fontSize="36px" />
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <p>
                          {
                            constants?.site_content?.slider_content?.slider_Two
                              ?.description[this.props.activeLanguage]
                          }
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </a>
            </li>
            <li style={{ backgroundImage: `url(${slider3})` }}>
              <a href="#">
                <Accordion key="promise">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      <div className="d-flex justify-content-between align-items-center">
                        <h3>
                          {
                            constants?.site_content?.slider_content
                              ?.slider_Three?.title[this.props.activeLanguage]
                          }
                        </h3>
                        <IoAdd fontSize="36px" />
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <p>
                          {
                            constants?.site_content?.slider_content
                              ?.slider_Three?.description1[
                              this.props.activeLanguage
                            ]
                          }
                          <br />
                          <br />
                          {
                            constants?.site_content?.slider_content
                              ?.slider_Three?.description2[
                              this.props.activeLanguage
                            ]
                          }
                          <br />
                          <br />
                          {
                            constants?.site_content?.slider_content
                              ?.slider_Three?.description3[
                              this.props.activeLanguage
                            ]
                          }
                          <br />
                          <br />
                          {
                            constants?.site_content?.slider_content
                              ?.slider_Three?.description4[
                              this.props.activeLanguage
                            ]
                          }
                          <br />
                          <br />
                          {
                            constants?.site_content?.slider_content
                              ?.slider_Three?.description5[
                              this.props.activeLanguage
                            ]
                          }
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </a>
            </li>
          </ul>
        </div>
      </>
    );
  }
}
