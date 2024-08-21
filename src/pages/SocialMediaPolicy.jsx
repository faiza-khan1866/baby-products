import React, { Component } from "react";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import MainTitle from "../components/MainTitle";
import SocialMediaPolicy from "../sections/Policies/SocialMediaPolicy";

class SocialMediaPolicyPage extends Component {
  state = {
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Social Media Policy",
        active: true,
        link: `/${this.props.global?.activeLanguage}/social-media-policy`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "سياسة وسائل التواصل الإجتماعي",
        active: true,
        link: `/${this.props.global?.activeLanguage}/social-media-policy`,
      },
    ],
  };
  render() {
    return (
      <div className="social-media-policy-page">
        <MainTitle text={this.props.global?.activeLanguage === "ar" ? "سياسة وسائل التواصل الإجتماعي" : "Social Media Policy"} />
        <BreadCrumbs
          breadCrumbItems={
            this.props.global?.activeLanguage === "en"
            ? this.state.breadCrumbItemsEnglish
            : this.state.breadCrumbItemsArabic
            }
            language = {this.props.global?.activeLanguage}
        />
        <SocialMediaPolicy />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};
export default connect(mapStateToProps)(
  SocialMediaPolicyPage
);
