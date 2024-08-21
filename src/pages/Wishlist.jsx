import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import WishlistGrid from "../sections/Wishlist/WishlistGrid";
import WishlistHeader from "../sections/Wishlist/WishlistHeader";
import { constants } from "../utils/constants";
import BreadCrumbs from "./../components/BreadCrumbs";

class Wishlist extends Component {
  state = {
    breadCrumbItemsEnglish: [
      {
        text: this.props.global?.activeLanguage == 'en' ? "Home" : "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: this.props.global?.activeLanguage == 'en' ? "Wishlist" : "قائمة الأمنيات",
        active: true,
        link: `/${this.props.global?.activeLanguage}/wishlist`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: this.props.global?.activeLanguage == 'en' ? "Home" : "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: this.props.global?.activeLanguage == 'en' ? "Wishlist" : "قائمة الأمنيات",
        active: true,
        link: `/${this.props.global?.activeLanguage}/wishlist`,
      },
    ],
  };
  render() {
    return (
      <div className="wishlist-page">
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
        <BreadCrumbs
          breadCrumbItems={
            this.props.global?.activeLanguage === "en"
            ? this.state.breadCrumbItemsEnglish
            : this.state.breadCrumbItemsArabic
            }
            language = {this.props.global?.activeLanguage}
        />
        <WishlistHeader />
        <WishlistGrid />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};
export default connect(mapStateToProps)(Wishlist);
