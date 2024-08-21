import React, { Component } from "react";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import MainTitle from "../components/MainTitle";
import Subsidiaries from "../sections/Subsidiaries/Subsidiaries";

class SubsidiariesPage extends Component {
  state = {
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Subsidiaries",
        active: true,
        link: `/${this.props.global?.activeLanguage}/subsidiaries`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "الفروع",
        active: true,
        link: `/${this.props.global?.activeLanguage}/subsidiaries`,
      },
    ],
  };
  render() {
    return (
      <div className="subsidiaries-page">
        <MainTitle text={this.props.global?.activeLanguage === "ar" ? "الفروع " : "Subsidiaries"} />
        <BreadCrumbs
          breadCrumbItems={
            this.props.global?.activeLanguage === "en"
            ? this.state.breadCrumbItemsEnglish
            : this.state.breadCrumbItemsArabic
            }
            language = {this.props.global?.activeLanguage}
        />
        <Subsidiaries />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};
export default connect(mapStateToProps)(SubsidiariesPage);
