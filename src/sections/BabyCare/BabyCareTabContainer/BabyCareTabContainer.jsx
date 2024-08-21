import React, { useEffect, useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import {
  HiOutlineArrowCircleLeft,
  HiOutlineArrowCircleRight,
} from "react-icons/hi";
import BabyCareTab from "../../../components/BabyCareTab";
import { constants } from "../../../utils/constants";
import { babyCareTabsData } from "../../../utils/data";
import babyCareImage from "./../../../assets/images/mother-baby-images/ba_04.svg";

function BabyCareTabContainer(props) {
  const [tabKeys, setTabKeys] = useState([]);
  const [activeTab, setActiveTab] = useState("0th-Month");

  useEffect(() => {
    let tabKeys = props.babyCareData?.babyCare?.map((x) => {
      return x.tabName?.replace(/\s+/g, "-");
    });
    setTabKeys(tabKeys);
    setActiveTab(tabKeys?.[0]);
  }, [props.babyCareData?.babyCare]);

  useEffect(() => {
    if (props.language === "en") {
      setActiveTab(tabKeys?.[0]);
    } else {
      setActiveTab(tabKeys?.[0]);
    }
  }, [props.language, tabKeys]);

  const setNextKey = () => {
    //debugger;
    window.scrollTo({ top: 0, behavior: "smooth" });
    let currentIndex = tabKeys.findIndex((x) => x === activeTab);
    let futureKey = tabKeys[(currentIndex + 1) % tabKeys.length];
    setActiveTab(futureKey);
  };
  const setBackKey = () => {
    //debugger;
    window.scrollTo({ top: 0, behavior: "smooth" });
    let currentIndex = tabKeys.findIndex((x) => x === activeTab);
    let futureKey = tabKeys[(currentIndex - 1) % tabKeys.length];
    setActiveTab(futureKey);
  };
  return (
    <div className="baby-care-tab-container">
      <Container>
        <Row>
          <Col sm={10}>
            <div className="section-title-underlined">
              <h1>
                {constants?.site_content?.baby_care_title[props.language]}
              </h1>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: props.babyCareData?.babyCareTitle,
              }}
            ></div>
          </Col>
          <Col sm={2}>
            <div className="image-wrapper">
              <img
                src={process.env.REACT_APP_IMAGE_BASE_URL + props.image}
                alt="Baby Care"
              />
            </div>
          </Col>
        </Row>
      </Container>
      <div className="baby-care-tabs">
        <Tabs
          defaultActiveKey={
            props.language === "en" ? "0th-Month" : "-الشهر-صفر"
          }
          activeKey={activeTab}
          onSelect={(name) => setActiveTab(name)}
        >
          {props.babyCareData?.babyCare?.map((x) => (
            <Tab eventKey={x.tabName.replace(/\s+/g, "-")} title={x.tabName}>
              <BabyCareTab {...x} language={props.language} />
            </Tab>
          ))}
        </Tabs>
      </div>
      <div className="tabs-navigation">
        <Container>
          <div className="dots-section d-none">
            <span
              className={`circle ${activeTab === "month-ne" ? "active" : ""}`}
            ></span>
            <span
              className={`circle ${activeTab === "month-ne" ? "active" : ""}`}
            ></span>
            <span
              className={`circle ${activeTab === "month-ne" ? "active" : ""}`}
            ></span>
            <span
              className={`circle ${activeTab === "month-ne" ? "active" : ""}`}
            ></span>
            <span
              className={`circle ${activeTab === "month-ne" ? "active" : ""}`}
            ></span>
            <span
              className={`circle ${activeTab === "month-ne" ? "active" : ""}`}
            ></span>
            <span
              className={`circle ${activeTab === "month-ne" ? "active" : ""}`}
            ></span>
            <span
              className={`circle ${activeTab === "month-ne" ? "active" : ""}`}
            ></span>
            <span
              className={`circle ${activeTab === "month-ne" ? "active" : ""}`}
            ></span>
            <span
              className={`circle ${activeTab === "month-ne" ? "active" : ""}`}
            ></span>
          </div>

          {/* ENGLISH ARROWS */}

          {props.language === "en" && (
            <div className="arrows-section">
              <span
                className="nav-icon-left"
                onClick={
                  activeTab === "0th-Month" ? () => {} : () => setBackKey()
                }
              ></span>
              <span
                className="nav-icon-right"
                onClick={
                  activeTab === "1Year-and-1M" ? () => {} : () => setNextKey()
                }
              ></span>
            </div>
          )}

          {/* ARABIC ARROWS  */}

          {props.language === "ar" && (
            <div className={`arrows-section arabic-arrows-section`}>
              <span
                className={`nav-icon-left nav-icon-left-Arabic`}
                onClick={
                  activeTab === "-سنة-وشهر‎" ? () => {} : () => setNextKey()
                }
              ></span>
              <span
                className={`nav-icon-right nav-icon-right-Arabic`}
                onClick={
                  activeTab === "-الشهر-صفر" ? () => {} : () => setBackKey()
                }
              ></span>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default BabyCareTabContainer;
