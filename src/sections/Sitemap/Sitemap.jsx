import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import {
  aboutPigeonLinks,
  sustainabilityLinks,
  investorRelationsLinks,
} from "../../utils/data";
import { connect } from "react-redux";

const Sitemap = (props) => {
  const { global } = props;
  return (
    <div className="sitemap-section">
      <Container>
        {/* //!----------About Pigeon--------- */}
        <div className="section-wrap">
          <h5>
            <Link to={`/${global.activeLanguage}/about`}>
              {global.activeLanguage === "en" ? "About Pigeon" : "حول بيجون"}
              <IoIosArrowDroprightCircle className="icon" />
            </Link>
          </h5>
          <div className="inner-links-wrap">
            <Row>
              {aboutPigeonLinks?.map((x) => (
                <Col key={x.name} xs={12} md={6} lg={4} className="my-1">
                  <Link to={`/${global.activeLanguage}${x.path}`}>
                    {global.activeLanguage === "en" ? x.name : x.arabic.name}
                    {/* <IoIosArrowDroprightCircle className="icon" /> */}
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        {/*//! ----------Sustainability--------- */}
        {/*//! ----------Products--------- */}
        <div className="section-wrap">
          <h5>
            <Link to={`/${global.activeLanguage}/mother-baby-products`}>
              {global.activeLanguage === "en" ? "Products" : "المنتجات"}
              <IoIosArrowDroprightCircle className="icon" />
            </Link>
          </h5>
        </div>
        {/*//! ----------Mother & Baby World--------- */}
        <div className="section-wrap">
          <h5>
            <Link to={`/${global.activeLanguage}/mother-baby-world`}>
              {global.activeLanguage === "en"
                ? "Mother & Baby World"
                : "عالم الأم والطفل"}
              <IoIosArrowDroprightCircle className="icon" />
            </Link>
          </h5>
        </div>
        {/*//! ----------Good To Know--------- */}
        <div className="section-wrap">
          <h5>
            <Link to={`/${global.activeLanguage}/good-to-know`}>
              {global.activeLanguage === "en"
                ? "Good To Know"
                : "من الجيد معرفة"}
              <IoIosArrowDroprightCircle className="icon" />
            </Link>
          </h5>
        </div>
        {/*//! ----------Breast Feeding Advisor--------- */}
        <div className="section-wrap">
          <h5>
            <Link to={`/${global.activeLanguage}/breastfeeding-advisor`}>
              {global.activeLanguage === "en"
                ? "BreastFeeding Advisor"
                : "مستشار الرضاعة الطبيعية"}
              <IoIosArrowDroprightCircle className="icon" />
            </Link>
          </h5>
        </div>
        {/*//! ----------Vidoes--------- */}
        <div className="section-wrap">
          <h5>
            <Link to={`/${global.activeLanguage}/video`}>
              {global.activeLanguage === "en" ? "Video" : "فيديوهات"}
              <IoIosArrowDroprightCircle className="icon" />
            </Link>
          </h5>
        </div>
        {/*//! ----------Policy on Private Protection--------- */}
        <div className="section-wrap">
          <h5>
            <Link to={`/${global.activeLanguage}/privacy-protection-policy`}>
              {global.activeLanguage === "en"
                ? "Policy on Private Protection"
                : "سياسة حماية الخصوصية"}
              <IoIosArrowDroprightCircle className="icon" />
            </Link>
          </h5>
        </div>
        {/*//! ----------Terms of Use--------- */}
        <div className="section-wrap">
          <h5>
            <Link to={`/${global.activeLanguage}/term-of-use`}>
              {global.activeLanguage === "en"
                ? "Terms of Use"
                : "شروط الإستخدام"}
              <IoIosArrowDroprightCircle className="icon" />
            </Link>
          </h5>
        </div>
        {/*//! ----------Disclosure Policy--------- */}
        <div className="section-wrap">
          <h5>
            <Link to={`/${global.activeLanguage}/disclosure-policy`}>
              {global.activeLanguage === "en"
                ? "Disclosure Policy"
                : "سياسة الإفصاح عن المعلومات"}
              <IoIosArrowDroprightCircle className="icon" />
            </Link>
          </h5>
        </div>
        {/* ----------Social Media Policy--------- */}
        <div className="section-wrap">
          <h5>
            <Link to={`/${global.activeLanguage}/social-media-policy`}>
              {global.activeLanguage === "en"
                ? "Social Media Policy"
                : "سياسة وسائل التواصل الإجتماعي"}
              <IoIosArrowDroprightCircle className="icon" />
            </Link>
          </h5>
        </div>
        {/*//! ----------Subsidiaries--------- */}
        <div className="section-wrap">
          <h5>
            <Link to={`/${global.activeLanguage}/subsidiaries`}>
              {global.activeLanguage === "en" ? "Subsidiaries" : "الفروع"}
              <IoIosArrowDroprightCircle className="icon" />
            </Link>
          </h5>
        </div>
        {/*//! ----------Contact--------- */}
        <div className="section-wrap">
          <h5>
            <Link to={`/${global.activeLanguage}/contact`}>
              {global.activeLanguage === "en" ? "Contact" : "اتصل بنا"}
              <IoIosArrowDroprightCircle className="icon" />
            </Link>
          </h5>
        </div>
      </Container>
    </div>
  );
};

// export default Sitemap;

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(Sitemap);
