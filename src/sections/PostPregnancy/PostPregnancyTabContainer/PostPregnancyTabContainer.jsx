import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import {
  HiOutlineArrowCircleLeft,
  HiOutlineArrowCircleRight,
} from "react-icons/hi";
import { postPregnancyTabsData } from "../../../utils/data";

function PostPregnancyTabContainer() {
  const tabsRef = React.useRef(null);
  const tabKeys = ["tab-one", "tab-two", "tab-three", "tab-four"];
  const [activeTab, setActiveTab] = useState("tab-one");

  const setNextKey = () => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    tabsRef.current.scrollIntoView({
      behavior: "smooth",
    });
    let currentIndex = tabKeys.findIndex((x) => x === activeTab);
    let futureKey = tabKeys[(currentIndex + 1) % tabKeys.length];
    setActiveTab(futureKey);
  };
  const setBackKey = () => {
    // window.scrollTo({ top: 200, behavior: "smooth" });
    tabsRef.current.scrollIntoView({
      behavior: "smooth",
    });
    let currentIndex = tabKeys.findIndex((x) => x === activeTab);
    let futureKey = tabKeys[(currentIndex - 1) % tabKeys.length];
    setActiveTab(futureKey);
  };
  return (
    <div className="post-pregnancy-tab-container" ref={tabsRef}>
      {/* <Container>
        <div className="section-title-underlined">
          <h1>Pregnancy</h1>
        </div>
      </Container> */}
      <div className="post-pregnancy-tabs">
        <Tabs
          defaultActiveKey="tab-one"
          activeKey={activeTab}
          onSelect={(name) => setActiveTab(name)}
        >
          {postPregnancyTabsData?.map((x) => (
            <Tab eventKey={x.key} title={x.tabTitle}>
              <div className="tab-wrapper py-4">
                <Container>
                  <img src={x.firstImage} style={{ width: "100%" }} alt="" />
                  <p className="mt-4">{x.feedingText}</p>
                </Container>
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
      <Container>
        <div className="tabs-navigation">
          <div className="dots-section">
            <span
              className={`circle ${activeTab === "tab-one" ? "active" : ""}`}
            ></span>
            <span
              className={`circle ${activeTab === "tab-two" ? "active" : ""}`}
            ></span>
            <span
              className={`circle ${activeTab === "tab-three" ? "active" : ""}`}
            ></span>
            <span
              className={`circle ${activeTab === "tab-four" ? "active" : ""}`}
            ></span>
          </div>
          <div className="arrows-section">
            {/* <HiOutlineArrowCircleLeft
              className={`nav-icon ${
                activeTab === "tab-one"
                  ? "disabled"
                  : "active"
              }`}
              onClick={
                activeTab === "tab-one"
                  ? () => {}
                  : () => setBackKey()
              }
            />
            <HiOutlineArrowCircleRight
              className={`nav-icon ${
                activeTab === "tab-four"
                  ? "disabled"
                  : "active"
              }`}
              onClick={
                activeTab === "tab-four"
                  ? () => {}
                  : () => setNextKey()
              }
            /> */}
            <span
              className="nav-icon-left"
              onClick={activeTab === "tab-one" ? () => {} : () => setBackKey()}
            ></span>
            <span
              className="nav-icon-right"
              onClick={activeTab === "tab-four" ? () => {} : () => setNextKey()}
            ></span>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default PostPregnancyTabContainer;
