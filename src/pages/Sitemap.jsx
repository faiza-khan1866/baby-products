import React, { Component } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import MainTitle from "../components/MainTitle";
import Sitemap from "../sections/Sitemap/Sitemap";
import { connect } from "react-redux";

class SitemapPage extends Component {
  state = {
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Sitemap",
        active: true,
        link: `/${this.props.global?.activeLanguage}/sitemap`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "خريطة الموقع",
        active: true,
        link: `/${this.props.global?.activeLanguage}/sitemap`,
      },
    ],
  };
  render() {
    return (
      <div className="sitemap-page">
        <MainTitle text={this.props.global?.activeLanguage === "ar" ? "خريطة الموقع" : "Sitemap" } />
        <BreadCrumbs
          breadCrumbItems={
            this.props.global?.activeLanguage === "en"
            ? this.state.breadCrumbItemsEnglish
            : this.state.breadCrumbItemsArabic
            }
            language = {this.props.global?.activeLanguage}
        />
        <Sitemap />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};
export default connect(mapStateToProps)(SitemapPage);
