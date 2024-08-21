import React from "react";
import { Container, Row } from "react-bootstrap";
import VideoItem from "../../components/VideoItem";
import { constants } from "../../utils/constants";
import { videoGrid } from "../../utils/data";

const VideoGrid = (props) => {
  return (
    <div className="videos-section">
      <Container>
        <h1>
          {
            constants?.site_content?.videos_page_heading[
              props.language
            ]
          }
        </h1>
        <Row>
          {props.videos?.map((x, index) => (
            <VideoItem
              key={index + x.title}
              src={x.url}
              title={
                props.isArabic ? x.arabic?.title : x.title
              }
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default VideoGrid;
