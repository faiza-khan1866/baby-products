import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { constants } from "../utils/constants";
import CheckoutContainer from "../sections/Checkout/CheckoutContainer/CheckoutContainer";

class Checkout extends Component {
  state = {
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "الدفع والخروج",
        active: false,
        link: `/${this.props.global?.activeLanguage}/cart`,
      },
    ],

    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Checkout",
        active: false,
        link: `/${this.props.global?.activeLanguage}/cart`,
      },
    ],

  };

  componentDidMount() {

    <Helmet>
      <title>
        {this.state.currentPage?.meta_details?.title ||
          constants.site_name}
      </title>
      <meta
        name="description"
        content={
          this.state.currentPage?.meta_details
            ?.description || constants.seo_description
        }
      />
    </Helmet>
  }
  render() {
    const { global } = this.props;
    return (
      <div className="checkout-page">

        <BreadCrumbs
          breadCrumbItems={
            global?.activeLanguage === "en"
              ? this.state.breadCrumbItemsEnglish
              : this.state.breadCrumbItemsArabic
          }
          language={global?.activeLanguage}
        />
        <CheckoutContainer
          language={global?.activeLanguage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};
export default connect(mapStateToProps)(Checkout);
