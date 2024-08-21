import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { privacyProtectionData } from "../../../utils/data_policy";
import privacyImage from "../../../assets/images/policy/privacy_image.png";
import { RiShareBoxLine } from "react-icons/ri";

const PrivacyProtection = () => {
  return (
    <div className="privacy-protection-section">
      <Container>
        {privacyProtectionData?.map((x, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: x.content }}
            className="content-wrap"
          ></div>
        ))}
        <Row>
          <Col sm={4}>
            <div className="image-wrap">
              <img
                src={privacyImage}
                alt="privacyImage"
                className="image"
              />
              <RiShareBoxLine className="share-icon" />
            </div>
          </Col>
          <Col sm={8}>
            <div className="text-wrap">
              <p>
                From July 5, 2005, Pigeon also has been
                licensed from JIPDEC the “Privacy Mark”, as
                an acknowledged corporation by JIPDEC, in
                properly managing Personal Information
                according to “Requirements on Personal
                Information Protection Management System”,
                namely JIS Q 15001.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PrivacyProtection;
