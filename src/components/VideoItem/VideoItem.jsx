import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ModalVideo from "react-modal-video";

const VideoItem = ({ src, title }) => {
  const history = useHistory();
  const [openVideo, setOpenVideo] = useState(false);
  const [videoSrc, setvideoSrc] = useState("");
  const splitSrc = src.split("/");

  useEffect(() => {
    if(splitSrc.length > 0){
      if(splitSrc[4]){
        setvideoSrc(splitSrc[4])
      } else if(splitSrc[3]) {
        setvideoSrc(splitSrc[3])
      }

    }
  }, []);

  return (
    <Col md={4} className="productVideoWidth">
      <div className="video-item-wrap">
        <div
          className="wrap-iframe"
          onClick={() => setOpenVideo(true)}
        >
          <div className="empty-div" onClick={() => setOpenVideo(true)}> </div>
          <iframe
            // src={`https://player.vimeo.com/video/${splitSrc[3]}?title=0&byline=0&portrait=0`}
            src={`https://www.youtube.com/embed/${videoSrc}?title=0&byline=0&portrait=0`}
            // src={`https://www.youtube.com/embed/${splitSrc[4]}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            // allow="autoplay; fullscreen; picture-in-picture"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
            className="video-ifram"
          ></iframe>
          {/* <script src="https://player.vimeo.com/api/player.js"></script> */}
        </div>
        <h6>{title}</h6>
      </div>
      <ModalVideo
        // channel="vimeo"
        channel="youtube"
        isOpen={openVideo}
        videoId={videoSrc}
        onClose={() => setOpenVideo(false)}
      />
    </Col>
  );
};

export default VideoItem;
