import React from "react";
import {constants} from "../../utils/constants";


import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import ScrollUpButton from "react-scroll-up-button";

function FooterUpper(props) {
  return (
    <div className="footer-upper">
      <ScrollUpButton
        StopPosition={0}
        ShowAtPosition={150}
        EasingType="easeOutCubic"
        AnimationDuration={500}
        ContainerClassName="ScrollUpButton__Container"
        TransitionClassName="ScrollUpButton__Toggled"
        style={{
          position: "absolute",
          top: "-5px",
          right: "125px",
        }}
        ToggledStyle={{}}
      >
        <span>
          <span className="ctrl-button">
            <span className="button-svg"></span>
          </span>
        </span>
      </ScrollUpButton>
      <div className="upper-inner">
        <p>
            {
                constants?.site_content?.FooterUpper?.title[
                    props.language
                    ]
            }
            {/*Celebrate babies the way they are*/}
        </p>
        <div className="social-icons-footer">
          <a
            href="https://web.facebook.com/pigeonmena/?_rdc=1&_rdr"
            target="blank"
          >
            <FaFacebookSquare color="#fff" fontSize={32} />
          </a>
          <a href="https://www.instagram.com/pigeonarabia/" target="blank">
            <FaInstagramSquare color="#fff" fontSize={32} className="mx-3" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCfI-xamtRK4LJ5ABg5msyeQ/about"
            target="blank"
          >
            <FaYoutubeSquare color="#fff" fontSize={32} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterUpper;
