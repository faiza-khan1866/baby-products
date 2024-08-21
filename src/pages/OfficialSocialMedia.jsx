import React, { Component } from "react";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import MainTitle from "../components/MainTitle";
import OfficialSocialMedia from "../sections/OfficialSocialMedia";

class OfficialSocialMediaPage extends Component {
  state = {
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Official Social Media List",
        active: true,
        link: `/${this.props.global.activeLanguage}/official-social-media-list`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "قائمة مواقع التواصل الاجتماعي الرسمية",
        active: true,
        link: `/${this.props.global.activeLanguage}/official-social-media-list`,
      },
    ],
  };
  render() {
    return (
      <div>
        <MainTitle text="Official Social Media List" />
        <BreadCrumbs
          breadCrumbItems={
            this.props.global?.activeLanguage === "en"
            ? this.state.breadCrumbItemsEnglish
            : this.state.breadCrumbItemsArabic
            }
            language = {this.props.global?.activeLanguage}
        />
        <OfficialSocialMedia />
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
  OfficialSocialMediaPage
);
