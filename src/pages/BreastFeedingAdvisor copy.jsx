import React, { Component } from "react";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import AdvisorHeader from "../sections/BreastFeedingAdvisor/AdvisorHeader";
import FeedbackForm from "../sections/BreastFeedingAdvisor/FeedbackForm";
import MilkDrinks from "../sections/BreastFeedingAdvisor/MilkDrinks";
import MoreDetails from "../sections/BreastFeedingAdvisor/MoreDetails";

class BreastFeedingAdvisor extends Component {
  state = {
    breadCrumbItems: [
      {
        text: this.props.global?.activeLanguage == 'en' ? "Home" : "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: this.props.global?.activeLanguage == 'en' ? "Breastfeeding Advisor" : "مستشار الرضاعة الطبيعية",
        active: true,
        link: `/${this.props.global?.activeLanguage}/breast-milk-advisor`,
      },
    ],
  };
  render() {
    return (
      <div className="breast-feeding-advisor-page">
        <AdvisorHeader />
        <BreadCrumbs
          breadCrumbItems={this.state.breadCrumbItems}
          language = {this.props.global?.activeLanguage}
        />
        <MilkDrinks
        />
        <MoreDetails />
        <FeedbackForm />
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
  BreastFeedingAdvisor
);
