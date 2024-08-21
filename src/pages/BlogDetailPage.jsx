import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import BlogItemDetails from "../sections/Blog/BlogItemDetails/BlogItemDetails";
import MoreDetails from "../sections/BreastFeedingAdvisor/MoreDetails";
import { constants } from "../utils/constants";
import { articleCategories, articleDetailsList } from "../utils/data";
import { articlesList } from "./../utils/data_articles";
import MainTitle from "./../components/MainTitle";

class ArticleDetailPage extends Component {
  scrollPosRef = React.createRef();
  state = {
    articleDetailsList: articleDetailsList,
    articleCategories: articleCategories,
    selectedCategory: null,
    currentCategorySlug: null,
    currentArticleIndex: 0,
    articles: [],
    activeArticle: null,
    breadCrumbItems: [
      {
        text: this.props.global?.activeLanguage == "en" ? "Home" : "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: this.props.global?.activeLanguage == "en" ? "Blog" : "المدونة",
        active: false,
        link: `/${this.props.global?.activeLanguage}/blog`,
      },

      {
        text: "",
        active: true,
        link: "/a",
      },
    ],
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Blog",
        active: false,
        link: `/${this.props.global?.activeLanguage}/blog`,
      },

      {
        text: "",
        active: true,
        link: "/a",
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "المدونة",
        active: false,
        link: `/${this.props.global?.activeLanguage}/blog`,
      },

      {
        text: "",
        active: true,
        link: "/a",
      },
    ],
  };

  async componentDidMount() {
    let blogRoute = this.props.match.params.id;
    const response = await API.get(`/auth/blogs/${blogRoute}`);
    const blog = response.data;
    this.setState({ activeArticle: blog });

    // setting up breadcrumb items
    let breadCrumbItemsEnglish = [...this.state.breadCrumbItemsEnglish];
    let breadCrumbItemsArabic = [...this.state.breadCrumbItemsArabic];

    breadCrumbItemsEnglish[2].link = blogRoute;
    breadCrumbItemsArabic[2].link = blogRoute;

    breadCrumbItemsEnglish[2].text = blog.title;
    breadCrumbItemsArabic[2].text = blog.arabic.title;

    this.setState({
      selectedCategory: blogRoute,
      breadCrumbItemsEnglish,
    });
    this.setState({
      selectedCategory: blogRoute,
      breadCrumbItemsArabic,
    });
  }

  render() {
    const { articles, currentArticleIndex } = this.state;
    const { global } = this.props;

    return (
      <div className="breast-feeding-advisor-page">
        <Helmet>
          <title>
            {this.state.activeArticle?.meta_title || constants.site_name}
          </title>
          <meta
            name="description"
            content={
              this.state.activeArticle?.meta_details ||
              constants.seo_description
            }
          />
          <script type="application/ld+json">
            {this.state.activeArticle?.schema_markup}
          </script>
        </Helmet>
        <MainTitle
          text={
            this.state?.activeArticle?.title
              ? this.state?.activeArticle?.title
              : "blogs"
          }
        />
        <BreadCrumbs
          breadCrumbItems={
            this.props.global?.activeLanguage === "en"
              ? this.state.breadCrumbItemsEnglish
              : this.state.breadCrumbItemsArabic
          }
          language={this.props.global?.activeLanguage}
        />
        <div ref={this.scrollPosRef} />
        <BlogItemDetails blogItem={articlesList} />
        <MoreDetails
          activeArticle={this.state.activeArticle}
          currentCategorySlug={this.state.currentCategorySlug}
          previousLink={
            currentArticleIndex - 1 >= 0
              ? articles[currentArticleIndex - 1]?.route
              : null
          }
          nextLink={
            currentArticleIndex + 1 < articles?.length
              ? articles[currentArticleIndex + 1]?.route
              : null
          }
          previousTitle={
            global?.activeLanguage === "ar"
              ? currentArticleIndex - 1 >= 0
                ? articles[currentArticleIndex - 1]?.arabic?.title
                : null
              : currentArticleIndex - 1 >= 0
              ? articles[currentArticleIndex - 1]?.title
              : null
          }
          nextTitle={
            global?.activeLanguage === "ar"
              ? currentArticleIndex + 1 < articles?.length
                ? articles[currentArticleIndex + 1]?.arabic?.title
                : null
              : currentArticleIndex + 1 < articles?.length
              ? articles[currentArticleIndex + 1]?.title
              : null
          }
          handlePreviousClick={(title) => {
            this.props.history.push(
              `/breastfeeding-advisor/${
                this.state.currentCategorySlug
              }/${title.replace(/\s+/g, "-")}`
            );
            this.scrollPosRef.current.scrollIntoView({
              behavior: "smooth",
            });
          }}
          handleNextClick={(title) => {
            this.props.history.push(
              `/breastfeeding-advisor/${
                this.state.currentCategorySlug
              }/${title.replace(/\s+/g, "-")}`
            );
            this.scrollPosRef.current.scrollIntoView({
              behavior: "smooth",
            });
          }}
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

export default connect(mapStateToProps)(ArticleDetailPage);
