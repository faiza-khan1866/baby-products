import React, { Component } from "react";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import MainTitle from "../components/MainTitle";
import DisclosurePolicy from "../sections/Policies/DisclosurePolicy";

class DisclosurePolicyPage extends Component {
  state = {
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Disclosure Policy",
        active: true,
        link: `/${this.props.global.activeLanguage}/disclosure-policy`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "سياسة الإفصاح عن المعلومات",
        active: true,
        link: `/${this.props.global.activeLanguage}/disclosure-policy`,
      },
    ],
  };
  render() {
    return (
      <div className="disclosure-policy-page">
        <MainTitle text={this.props.global?.activeLanguage === "ar" ? "سياسة الإفصاح عن المعلومات" : "Disclosure Policy" } />
        <BreadCrumbs
          breadCrumbItems={
            this.props.global.activeLanguage === "en"
            ? this.state.breadCrumbItemsEnglish
            : this.state.breadCrumbItemsArabic
            }
            language = {this.props.global?.activeLanguage}
        />
        <DisclosurePolicy />
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
  DisclosurePolicyPage
);
