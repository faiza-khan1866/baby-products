import React, { useEffect, useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { constants } from "../../../utils/constants";
import AboutUsTab from "../AboutUsTab";
import MissionVisionTab from "../MissionVisionTab";
import PigeonLogo from "../PigeonLogo";
import PigeonWayTab from "../PigeonWayTab";
import TopMessageTab from "../TopMessageTab";
import { useSelector } from "react-redux";

function AboutTabsContainer(props) {
  const tabKeys = ["about", "pigeon-way", "mission", "logo", "message"];
  const [activeTab, setActiveTab] = useState(props.activeTab || "about");
  const [currentTitle, setCurrentTitle] = useState("About Pigeon");
  const [showSpinner, setShowSpinner] = useState(false);
  const [tabData, setTabData] = useState({ aboutPage: "", missionVision: "", pigeonLogo: "", topMessage: "" });

  useEffect(() => {
    if (props.activeTab) {
      setActiveTab(props.activeTab);
    }
  }, [props.activeTab]);

  const pages = useSelector((state) => state.allPages.pages);
  useEffect(() => {
    setShowSpinner(true)
    if (pages && pages.length > 0) {
      let aboutPage = pages.find(
        (x) => x.slug === "about-us-active"
      );
      let missionVision = pages.find(
        (x) => x.slug === "mission-vision"
      );
      let pigeonLogo = pages.find(
        (x) => x.slug === "pigeon-logo"
      );
      let topMessage = pages.find(
        (x) => x.slug === "top-message"
      );
      setTabData({ aboutPage, missionVision, pigeonLogo, topMessage })
    }
  }, [pages]);

  const { global } = props;

  const setNextKey = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let currentIndex = tabKeys.findIndex((x) => x === activeTab);
    let futureKey = tabKeys[(currentIndex + 1) % tabKeys.length];
    setActiveTab(futureKey);
  };
  const setBackKey = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let currentIndex = tabKeys.findIndex((x) => x === activeTab);
    let futureKey = tabKeys[(currentIndex - 1) % tabKeys.length];
    setActiveTab(futureKey);
  };
  useEffect(() => {
    switch (activeTab) {
      case "about":
        // setCurrentTitle("What is Pigeon ?");
        setCurrentTitle(
          global?.activeLanguage === "ar"
            ? constants?.site_content?.about_us_tab_heading.ar
            : constants?.site_content?.about_us_tab_heading.en
        );
        props.setBreadCrumbs(global?.activeLanguage == 'en' ? 'Pigeon' : 'بيجون',
          "/about"
          //     `/${props.global.activeLanguage}/about`

        );
        break;
      case "pigeon-way":
        setCurrentTitle(
          global?.activeLanguage === "ar"
            ? constants?.site_content?.pigeon_way_tab_heading.ar
            : constants?.site_content?.pigeon_way_tab_heading.en
        );
        props.setBreadCrumbs(
          global?.activeLanguage == 'en' ? 'Pigeon Way' : 'أسلوب بيجون',
          "/about"
        );
        break;
      case "mission":
        setCurrentTitle(
          global?.activeLanguage === "ar"
            ? constants?.site_content?.mission_vision.ar
            : constants?.site_content?.mission_vision.en
        );
        props.setBreadCrumbs(
          global?.activeLanguage == 'en' ? 'Mission and Vision' : 'الرؤية والرسالة',
          "/about"
          //     `/${props.global.activeLanguage}/about?active=mission-vision`

        );
        break;
      case "logo":
        setCurrentTitle(
          global?.activeLanguage === "ar"
            ? constants?.site_content?.pigeon_logo_tab.ar
            : constants?.site_content?.pigeon_logo_tab.en
        );
        props.setBreadCrumbs(global?.activeLanguage == 'en' ? 'Pigeon Logo' : 'شعار بيجون',
          "/about"
          //     `/${props.global.activeLanguage}/about?active=logo`
        );
        break;
      case "message":
        setCurrentTitle(
          global?.activeLanguage === "ar"
            ? constants?.site_content?.top_message_tab.ar
            : constants?.site_content?.top_message_tab.en
        );
        props.setBreadCrumbs(global?.activeLanguage == 'en' ? 'Top Message' : 'رسالة مهمة',
          "/about"
          //     `/${props.global.activeLanguage}/about?active=message`
        );
        break;
      default:
        break;
    }
  }, [activeTab, global]);

  const changeSpinnerStatus = () => {
    setShowSpinner(false)
  }

  return (
    <div className="about-tab-container">

      <Container>
        <div className="section-title-underlined">
          <h1>{currentTitle}</h1>
        </div>
      </Container>
      <div className="feature-tabs">
        <Tabs
          defaultActiveKey="about"
          activeKey={activeTab}
          onSelect={(name) => setActiveTab(name)}
        >
          <Tab eventKey="about" title={global?.activeLanguage === "ar" ? "عن بيجون" : "About Us"} >
            <AboutUsTab language={global?.activeLanguage} activeTab={activeTab} currentPage={tabData.aboutPage} changeSpinnerStatus={changeSpinnerStatus} />
          </Tab>
          <Tab eventKey="pigeon-way" title={props.language === "ar" ? "أسلوب بيجون" : "Pigeon Way"}>
            <PigeonWayTab language={global?.activeLanguage} activeTab={activeTab} />
          </Tab>
          <Tab eventKey="mission" title={global?.activeLanguage === "ar" ? "الرؤية والرسالة" : "Mission & Vision "}>
            <MissionVisionTab language={global?.activeLanguage} currentPage={tabData.missionVision} activeTab={activeTab} />
          </Tab>
          <Tab eventKey="logo" title={global?.activeLanguage === "ar" ? "شعار بيجون" : "Pigeon Logo"}>
            <PigeonLogo language={global?.activeLanguage} currentPage={tabData.pigeonLogo} activeTab={activeTab} />
          </Tab>
          <Tab eventKey="message" title={global?.activeLanguage === "ar" ? "رسالة مهمة" : "Top Message"}>
            <TopMessageTab language={global?.activeLanguage} currentPage={tabData.topMessage} activeTab={activeTab} />
          </Tab>
        </Tabs>
      </div>
      <div
        // className="tabs-navigation"
        className={`tabs-navigation ${props.language === "ar" ? "tabs-navigation-Arabic" : ""
          }`}
      >
        <div className="dots-section">
          <span className={`circle ${activeTab === "about" ? "active" : ""}`}>
            {" "}
          </span>
          <span
            className={`circle ${activeTab === "pigeon-way" ? "active" : ""}`}
          >
            {" "}
          </span>
          <span className={`circle ${activeTab === "mission" ? "active" : ""}`}>
            {" "}
          </span>
          <span className={`circle ${activeTab === "logo" ? "active" : ""}`}>
            {" "}
          </span>
          <span className={`circle ${activeTab === "message" ? "active" : ""}`}>
            {" "}
          </span>
        </div>
        {/*<div className="arrows-section">*/}
        <div
          className={`arrows-section ${props.language === "ar" ? "arabic-arrows-section" : ""
            }`}
        >
          {/* <HiOutlineArrowCircleLeft
            className={`nav-icon ${
              activeTab === "about" ? "disabled" : "active"
            }`}
            onClick={activeTab === "about" ? () => {} : () => setBackKey()}
          />
          <HiOutlineArrowCircleRight
            className={`nav-icon ${
              activeTab === "message" ? "disabled" : "active"
            }`}
            onClick={activeTab === "message" ? () => {} : () => setNextKey()}
          /> */}
          <span
            className={`nav-icon-left ${props.language === "ar" ? "nav-icon-left-Arabic" : ""
              }`}
            // className="nav-icon-left"
            onClick={
              props.language === "en"
                ? activeTab === "about"
                  ? () => { }
                  : () => setBackKey()
                : activeTab === "message"
                  ? () => { }
                  : () => setNextKey()
            }
          // className="nav-icon-left"
          // onClick={
          //   activeTab === "about"
          //     ? () => {}
          //     : () => setBackKey()
          // }
          >
            {" "}
          </span>
          <span
            className={`nav-icon-right ${props.language === "ar" ? "nav-icon-right-Arabic" : ""
              }`}
            // className="nav-icon-right"
            onClick={
              props.language === "en"
                ? activeTab === "message"
                  ? () => { }
                  : () => setNextKey()
                : activeTab === "about"
                  ? () => { }
                  : () => setBackKey()
            }
          // className="nav-icon-right"
          // onClick={
          //   activeTab === "message"
          //     ? () => {}
          //     : () => setNextKey()
          // }
          >
            {" "}
          </span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(AboutTabsContainer);

