import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { socialMediaData } from "../../../utils/data_policy";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { connect } from "react-redux";

const SocialMediaPolicy = (props) => {
  return (
    <div className="social-media-policy-section">
      <Container>
        {socialMediaData?.map((x, index) => (
          <div
            key={index}
            className="content-wrap"
            dangerouslySetInnerHTML={{ __html: x.content }}
          ></div>
        ))}
        <div className="social-media-link-wrap">
          <Link
            to={`/${props.global.activeLanguage}/official-social-media-list`}
          >
            Official Social Media List
            <IoIosArrowDroprightCircle className="icon" />
          </Link>
        </div>
      </Container>
    </div>
  );
};

// export default SocialMediaPolicy;

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(SocialMediaPolicy);
