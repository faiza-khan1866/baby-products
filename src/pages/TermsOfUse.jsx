import React, { Component } from "react";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import MainTitle from "../components/MainTitle";
import TermsOfUse from "../sections/Policies/TermsOfUse";

class TermsOfUsePage extends Component {
  state = {
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Term of Use",
        active: true,
        link: `/${this.props.global?.activeLanguage}/term-of-use`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "شروط الإستخدام",
        active: true,
        link: `/${this.props.global?.activeLanguage}/term-of-use`,
      },
    ],
  };
  render() {
    return (
      <div>
        <MainTitle text={this.props.global?.activeLanguage === "ar" ? "شروط الإستخدام" : "Terms of Use" } />
        <BreadCrumbs
          breadCrumbItems={
            this.props.global?.activeLanguage === "en"
              ? this.state.breadCrumbItemsEnglish
              : this.state.breadCrumbItemsArabic
          }
          language = {this.props.global?.activeLanguage}
        />
        <TermsOfUse />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};
export default connect(mapStateToProps)(TermsOfUsePage);
