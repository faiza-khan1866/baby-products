import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import MonthTab from "../../../components/MonthTab/MonthTab";
import { pregnancyMonthTabsData } from "../../../utils/data";
import { constants } from "./../../../utils/constants";

function PregnancyTabContainer(props) {
  const [tabKeys, setTabKeys] = useState();
  const [activeTab, setActiveTab] = useState("1st-month");

  useEffect(() => {
    let tabKeys = props.data?.map((x) => {
      return x.tabName?.replace(/\s+/g, "-");
    });
    setTabKeys(tabKeys);
    setActiveTab(tabKeys?.[0]);
  }, [props.data]);

  useEffect(() => {
    if (props.language === "en") {
      setActiveTab(tabKeys?.[0]);
    } else {
      setActiveTab(tabKeys?.[0]);
    }
  }, [props.language, tabKeys]);

  const setNextKey = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let currentIndex = tabKeys.findIndex((x) => x === activeTab);
    // console.log("setNextKey",currentIndex);
    let futureKey = tabKeys[(currentIndex + 1) % tabKeys.length];
    setActiveTab(futureKey);
  };
  const setBackKey = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let currentIndex = tabKeys.findIndex((x) => x === activeTab);
    // console.log("setBackKey",currentIndex);
    let futureKey = tabKeys[(currentIndex - 1) % tabKeys.length];
    setActiveTab(futureKey);
  };

  return (
    <div className="pregnancy-tab-container">
      <Container>
        <div className="section-title-underlined">
          <h1>
            {
              constants?.site_content?.pregnancy_page_title[
              props.language
              ]
            }
          </h1>
        </div>
      </Container>
      <div className="pregnancy-tabs">
        <Tabs
          defaultActiveKey="about"
          activeKey={activeTab}
          onSelect={(name) => setActiveTab(name)}
        >
          {props.data?.map((x) => (
            
            <Tab
              eventKey={x.tabName.replace(/\s+/g, "-")}
              title={x.tabName}
            >
                <MonthTab {...x} language={props.language} />
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
                onClick={activeTab === "1st-month" ? () => { } : () => setBackKey()}
              ></span>
              <span
                className="nav-icon-right"
                onClick={activeTab === "10th-month" ? () => { } : () => setNextKey()}
              ></span>
            </div>
          )}

          {/* ARABIC ARROWS  */}

          {props.language === "ar" && (
            <div className={`arrows-section arabic-arrows-section`}>
              <span
                className={`nav-icon-left nav-icon-left-Arabic`}
                onClick={activeTab === "الشهر-العاشر" ? () => { } : () => setNextKey()}
              ></span>
              <span
                className={`nav-icon-right nav-icon-right-Arabic`}
                onClick={activeTab === "الشهر-الأول" ? () => { } : () => setBackKey()}
              ></span>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default PregnancyTabContainer;
