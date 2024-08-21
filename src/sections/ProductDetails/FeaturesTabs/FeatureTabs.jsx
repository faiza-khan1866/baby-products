import React from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
// import { GrDocumentDownload } from "react-icons/gr";
import { HiOutlineDocumentDownload } from "react-icons/hi";
// import fileDownload from "js-file-download";
// import userManual from "./../../../assets/files/user_manual.pdf";

// import banner1 from "./../../../assets/images/banner1.jpg";
// import feature from "./../../../assets/images/feature.png";
// import overview from "./../../../assets/images/overview.png";

// import icon1 from "./../../../assets/images/sterilization.png";
// import icon2 from "./../../../assets/images/material.png";
import VideoItem from "../../../components/VideoItem";

function FeatureTabs(props) {
  return (
    <div className="feature-tabs">
      <Container>
        <Tabs defaultActiveKey="description">
          <Tab
            eventKey="description"
            title={props.language == "en" ? "Description" : "الوصف"}
          >
            <div className="tab-item-wrapper">
              <div className="description content">
                {/* <h5>Product Information</h5> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.isArabic
                      ? props.arabic?.long_description
                      : props.long_description,
                  }}
                ></div>

                {/* <hr /> */}
                <div className="description-para"></div>
              </div>
            </div>
          </Tab>
          {props.specifications?.description && (
            <Tab
              eventKey="specification"
              title={props.language == "en" ? "Specification" : "المواصفات"}
            >
              <div className="tab-item-wrapper">
                {/* <h5 className="spec-title">Specification Details</h5> */}
                {/* <img src={icon1} alt="" /> */}
                <div className="spec-content">
                  <div
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: props.isArabic
                        ? props.arabic?.specifications?.description
                        : props.specifications?.description,
                    }}
                  ></div>
                </div>
                <div className="spec-content">
                  {/* <img src={icon2} alt="" /> */}
                  <div className=""></div>
                </div>
              </div>
            </Tab>
          )}
          {props?.video && (
            <Tab
              eventKey="video"
              title={props.language == "en" ? "Video" : "فيديو"}
            >
              <div className="tab-item-wrapper">
                {/* <h5 className="spec-title">Specification Details</h5> */}
                {/* <img src={icon1} alt="" /> */}
                <div className="spec-content">
                  <div className="productVideo">
                    <VideoItem
                      className={props?.video}
                      key={"123"}
                      src={props?.video}
                      title={props.video_title}
                    />
                  </div>
                </div>
                <div className="spec-content">
                  {/* <img src={icon2} alt="" /> */}
                  <div className=""></div>
                </div>
              </div>
            </Tab>
          )}
          {props.downloads && (
            <Tab
              eventKey="downloads"
              title={props.language == "en" ? "Downloads" : "تحميل"}
            >
              <div className="tab-item-wrapper">
                <div className="downloads">
                  {/* <h5>Downloads Details</h5> */}
                  <div
                    className="download-box"
                    onClick={() =>
                      // fileDownload(userManual, "Pigeon_Manual_2021.pdf")
                      window.open(props.downloads, "_blank").focus()
                    }
                  >
                    <HiOutlineDocumentDownload
                      color="#e65550"
                      className="download-icon"
                    />
                    <div className="pl-sm-2">
                      <p className="filename">
                        {props.isArabic ? "دليل المستخدم‎" : "User Manual"}
                      </p>
                      {/* <p className="date">{new Date().toLocaleDateString()}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          )}
        </Tabs>
      </Container>
    </div>
  );
}

export default FeatureTabs;
