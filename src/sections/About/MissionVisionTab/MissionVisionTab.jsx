import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { API } from "../../../http/API";
import { connect } from "react-redux";

function MissionVisionTab(props) {
  const [missionData, setMissionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    if (props.currentPage._id) {
      setCurrentPage(props.currentPage);
      API.get(`auth/all_widgets/${props.currentPage._id}`)
        .then((res) => {
          let widget_content =
            res.data[res.data.length - 1]
              .widget_content;
          setMissionData(widget_content);
        })
        .catch((err) => console.log(err));
    }
  }, [props.currentPage]);
  const { global } = props;
  return (
    <div className="mission-vision-tab">
      <Container>
        {/* <div className="section-title-underlined">
          <h2>Mission and Vision</h2>
        </div> */}
        <Row>
          <Col sm={6}>
            <div className="mission">
              <h2>
                {global?.activeLanguage === "ar"
                  ? missionData?.arabic?.sectionOne?.title
                  : missionData?.sectionOne?.title}
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: `${global?.activeLanguage === "ar"
                      ? missionData?.arabic?.sectionOne
                        ?.content
                      : missionData?.sectionOne?.content
                    }`,
                }}
              ></p>
            </div>
          </Col>
          <Col sm={6}>
            <div className="vision">
              <h2>
                {global?.activeLanguage === "ar"
                  ? missionData?.arabic?.sectionTwo?.title
                  : missionData?.sectionTwo?.title}
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: `${global?.activeLanguage === "ar"
                      ? missionData?.arabic?.sectionTwo
                        ?.content
                      : missionData?.sectionTwo?.content
                    }`,
                }}
              ></p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(MissionVisionTab);
