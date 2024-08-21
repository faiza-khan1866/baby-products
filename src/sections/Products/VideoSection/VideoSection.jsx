import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ModalVideo from "react-modal-video";
import { AiFillPlayCircle } from "react-icons/ai";

import videoThumbnail from "./../../../assets/images/video-thumbnail.jpeg";
import { defaultContentProducts } from "../../../utils/data.js";

export default function VideoSection({
  videoLink,
  videoTitle,
  videoDescription,
  activeLanguage,
  productUrl,
}) {
  // console.log(videoLink);
  const [openVideo, setOpenVideo] = useState(false);
  return (
    <div className="video-section">
      <Container>
        <Row>
          <Col xs={12} sm={7}>
            <div className="description">
              {/* <h3 className="title">{videoTitle}</h3> */}
              {productUrl == window.location.pathname ? (
                activeLanguage == "en" ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: defaultContentProducts?.video_description,
                    }}
                  ></p>
                ) : (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: defaultContentProducts.arabic?.video_description,
                    }}
                  ></p>
                )
              ) : (
                <p dangerouslySetInnerHTML={{ __html: videoDescription }}></p>
              )}
            </div>
          </Col>
          <Col xs={12} sm={5}>
            <div className="video">
              <div
                className="video-thumbnail"
                style={{
                  backgroundImage: `url(${videoThumbnail})`,
                }}
              >
                {/* <p className="caption"></p> */}
                <AiFillPlayCircle
                  onClick={() => setOpenVideo(true)}
                  className="play-icon"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ModalVideo
        style={{ zIndex: "1" }}
        className="video-modal-wrap"
        channel="youtube"
        isOpen={openVideo}
        videoId={videoLink?.split("/")?.[3]}
        onClose={() => setOpenVideo(false)}
      />
    </div>
  );
}
