import React, { Component } from "react";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import MainTitle from "../components/MainTitle";
import PrivacyProtection from "../sections/Policies/PrivacyProtection";

class PrivacyProtectionPage extends Component {
  state = {
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Policy on Privacy Protection",
        active: true,
        link: `/${this.props.global?.activeLanguage}/privacy-protection-policy`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Policy on Privacy Protection",
        active: true,
        link: `/${this.props.global?.activeLanguage}/privacy-protection-policy`,
      },
    ],
  };
  render() {
    return (
      <div className="privacy-protection-page" dir="ltr">
        <MainTitle text="Personal Information Protection Policy and Personal Information Management Guidelines of Pigeon Corporation" />
        <BreadCrumbs
          breadCrumbItems={
            this.props.global?.activeLanguage === "en"
            ? this.state.breadCrumbItemsEnglish
            : this.state.breadCrumbItemsArabic
            }
            language = {global?.activeLanguage}
        />
        <PrivacyProtection />
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
  PrivacyProtectionPage
);
