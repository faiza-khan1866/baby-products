import React, { Component } from "react";
import AboutTabsContainer from "../sections/About/AboutTabsContainer/AboutTabsContainer";
import BreadCrumbs from "../components/BreadCrumbs";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class About extends Component {
  state = {
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "من نحن",
        active: false,
        link: `/${this.props.global?.activeLanguage}/about`,
      },
      {
        text: "بيجون",
        active: true,
        link: `/${this.props.global?.activeLanguage}/about`,
      },
    ],

    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "About",
        active: false,
        link: `/${this.props.global?.activeLanguage}/about`,
      },
      {
        text: "Pigeon",
        active: true,
        link: `/${this.props.global?.activeLanguage}/about`,
      },
    ],

    activeTab: null,
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    this.setState({ activeTab: query.get("active") });
  }

  setBreadCrumbs = (text, link) => {
    let breadCrumbItemsEnglish = [...this.state.breadCrumbItemsEnglish];
    breadCrumbItemsEnglish[breadCrumbItemsEnglish.length - 1].text = text;
    breadCrumbItemsEnglish[
      breadCrumbItemsEnglish.length - 1
    ].link = `/${this.props.global?.activeLanguage}${link}`;
    this.setState({ breadCrumbItemsEnglish });

    let breadCrumbItemsArabic = [...this.state.breadCrumbItemsArabic];
    breadCrumbItemsArabic[breadCrumbItemsArabic.length - 1].text = text;
    breadCrumbItemsArabic[
      breadCrumbItemsArabic.length - 1
    ].link = `/${this.props.global?.activeLanguage}${link}`;

    this.setState({ breadCrumbItemsArabic });
  };

  render() {
    const { global } = this.props;
    return (
      <div className="about-page">
        <Helmet>
          <title>
            {global?.activeLanguage === "ar"
              ? "حول| بيجون| منتجات العناية بالأم والطفل"
              : "About | Pigeon Arabia | Mother and Baby Care Products"}
          </title>
          <meta
            name="description"
            content={
              global?.activeLanguage === "ar"
                ? "حل شامل لتلبية جميع احتياجاتك من الأمومة إلى رعاية الأطفال. تصفح مجموعتنا الواسعة من المنتجات التي تتراوح من شافطات حليب الأم ، والزجاجات ، والحلمات ، وسادات الثدي والمزيد."
                : "A one-stop solution to meet all your needs from maternity to childcare. Browse our wide range of products ranging from breast pumps, bottles, teats, breast pads and more."
            }
          />
        </Helmet>
        <BreadCrumbs
          breadCrumbItems={
            global?.activeLanguage === "en"
              ? this.state.breadCrumbItemsEnglish
              : this.state.breadCrumbItemsArabic
          }
          language={global?.activeLanguage}
        />
        <AboutTabsContainer
          activeTab={this.state.activeTab}
          setBreadCrumbs={this.setBreadCrumbs}
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

export default connect(mapStateToProps)(About);
