import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import facebookImage from "../../assets/images/social-media/facebook-icon.jpg";
import twitterImage from "../../assets/images/social-media/twitter-icon.jpg";
import lineImage from "../../assets/images/social-media/line-icon.png";
import weiboImage from "../../assets/images/social-media/weibo-icon.png";
import instagramImage from "../../assets/images/social-media/instagram-icon.png";
import youtubeImage from "../../assets/images/social-media/youtube-icon.jpg";
import {
  facebookLink,
  twitterLinks,
  lineLinks,
  weiboLinks,
  instagramLinks,
  youtubeLinks,
} from "../../utils/data";
import { RiShareBoxLine } from "react-icons/ri";

const OfficialSocialMedia = () => {
  return (
    <div className="official-social-media-section">
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <h4>Facebook</h4>
            <Row>
              <Col xs={3} sm={2} md={3} lg={2}>
                <div className="image-wrap">
                  <img
                    src={facebookImage}
                    alt="facebook"
                    className="image"
                  />
                </div>
              </Col>
              <Col>
                {facebookLink?.map((x) => (
                  <div key={x.text} className="links-wrap">
                    <a href={x.path} target="blank">
                      {x.text}
                      <RiShareBoxLine className="icon" />
                    </a>
                  </div>
                ))}
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={6}>
            <h4>Twitter</h4>
            <Row>
              <Col xs={3} sm={2} md={3} lg={2}>
                <div className="image-wrap">
                  <img
                    src={twitterImage}
                    alt="twitter"
                    className="image"
                  />
                </div>
              </Col>
              <Col>
                {twitterLinks?.map((x) => (
                  <div key={x.text} className="links-wrap">
                    <a href={x.path} target="blank">
                      {x.text}
                      <RiShareBoxLine className="icon" />
                    </a>
                  </div>
                ))}
              </Col>
            </Row>
            {/* Line-------------- */}
            <h4>Line</h4>
            <Row>
              <Col xs={3} sm={2} md={3} lg={2}>
                <div className="image-wrap">
                  <img
                    src={lineImage}
                    alt="line"
                    className="image"
                  />
                </div>
              </Col>
              <Col>
                {lineLinks?.map((x) => (
                  <div key={x.text} className="links-wrap">
                    <a href={x.path} target="blank">
                      {x.text}
                      <RiShareBoxLine className="icon" />
                    </a>
                  </div>
                ))}
              </Col>
            </Row>
            {/* Weibo-------------- */}
            <h4>Weibo</h4>
            <Row>
              <Col xs={3} sm={2} md={3} lg={2}>
                <div className="image-wrap">
                  <img
                    src={weiboImage}
                    alt="weibo"
                    className="image"
                  />
                </div>
              </Col>
              <Col>
                {weiboLinks?.map((x) => (
                  <div key={x.text} className="links-wrap">
                    <a href={x.path} target="blank">
                      {x.text}
                      <RiShareBoxLine className="icon" />
                    </a>
                  </div>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <h4>Instagram</h4>
            <Row>
              <Col xs={3} sm={2} md={3} lg={2}>
                <div className="image-wrap">
                  <img
                    src={instagramImage}
                    alt="instagram"
                    className="image"
                  />
                </div>
              </Col>
              <Col>
                {instagramLinks?.map((x) => (
                  <div key={x.text} className="links-wrap">
                    <a href={x.path} target="blank">
                      {x.text}
                      <RiShareBoxLine className="icon" />
                    </a>
                  </div>
                ))}
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={6}>
            <h4>YouTube</h4>
            <Row>
              <Col xs={3} sm={2} md={3} lg={2}>
                <div className="image-wrap">
                  <img
                    src={youtubeImage}
                    alt="youtube"
                    className="image"
                  />
                </div>
              </Col>
              <Col>
                {youtubeLinks?.map((x) => (
                  <div key={x.text} className="links-wrap">
                    <a href={x.path} target="blank">
                      {x.text}
                      <RiShareBoxLine className="icon" />
                    </a>
                  </div>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OfficialSocialMedia;
