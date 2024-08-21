import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { constants } from "../../utils/constants";

function BabyCareTab(props) {
  return (
    <div className="tab-item baby-care-tab">
      <Container>
        <Row>
          <Col sm={12}>
            <h2>
              {
                constants?.site_content?.baby_feeding[
                  props.language
                ]
              }
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: props.feedingText,
              }}
            ></div>
            <div className="detailed-content">
              <Row>
                <Col sm={6}>
                  {/* <h4>Development and Growth</h4> */}
                  <h4>
                    {
                      constants?.site_content
                        ?.baby_development[props.language]
                    }
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.growthText,
                    }}
                  ></div>
                </Col>
                <Col sm={6}>
                  <h4>
                    {
                      constants?.site_content?.baby_caring[
                        props.language
                      ]
                    }
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.caringText,
                    }}
                  ></div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BabyCareTab;
