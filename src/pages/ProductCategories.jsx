import React, { Component } from "react";
import "react-dropdown/style.css";
import ProductSlider from "../sections/Home/ProductSlider/ProductSlider";
import BreadCrumbs from "../components/BreadCrumbs";
import ProductHeader from "../sections/Products/ProductHeader";
import { defaultContentProducts } from "../utils/data";
import { connect } from "react-redux";
import {
  getCategories,
  getCategoryProducts,
  getProducts,
} from "../redux/products";
import { API } from "../http/API";
import ProductsGrid from "../sections/Home/ProductsGrid/ProductsGrid";
import { Helmet } from "react-helmet";
import { constants } from "../utils/constants";

class ProductCategories extends Component {
  productsGridRef = React.createRef();
  state = {
    categoryProducts: [],
    recommendedProducts: [],
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Our Products",
        active: true,
        link: `/${this.props.global.activeLanguage}/mother-baby-products`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "منتجاتنا",
        active: true,
        link: `/${this.props.global.activeLanguage}/mother-baby-products`,
      },
    ],
  };

  componentDidMount() {
    API.get(`/auth/product_list/${null}/${null}/${"Recommended"}?page=all`)
      .then((response) => {
        this.setState({
          recommendedProducts: response.data?.data,
        });
      })
      .catch((err) => console.log(err));
  }

  getPropertyValue(key) {
    return defaultContentProducts[key];
  }

  render() {
    return (
      <div className="products-page">
        <Helmet>
          <title>
            {this.state.currentPage?.meta_details?.title || constants.site_name}
          </title>
          <meta
            name="description"
            content={
              this.state.currentPage?.meta_details?.description ||
              constants.seo_description
            }
          />
          <script type="application/ld+json">
            {this.state.currentPage?.meta_details?.schema_markup}
          </script>
        </Helmet>
        <ProductHeader />
        <BreadCrumbs
          breadCrumbItems={
            this.props.global?.activeLanguage === "en"
              ? this.state.breadCrumbItemsEnglish
              : this.state.breadCrumbItemsArabic
          }
          language={this.props.global?.activeLanguage}
        />
        <ProductsGrid
          categories={this.props.categories?.filter(
            (x) => x.parent_id === null
          )}
          isArabic={this.props.global?.activeLanguage === "ar"}
          hideTitle={true}
        />
        <ProductSlider
          products={this.state.recommendedProducts}
          language={this.props.global?.activeLanguage}
          isArabic={this.props.global?.activeLanguage === "ar"}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state?.productReducer?.products,
    categoryProducts: state?.productReducer?.categoryProducts,
    totalProducts: state?.productReducer?.totalProducts,
    categories: state?.productReducer?.categories,
    // showSpinner: state?.globalReducer?.showSpinner,
    global: state?.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (page) => dispatch(getProducts(page)),
    getCategories: () => dispatch(getCategories()),
    getCategoryProducts: (category, page, subcategory, filter) =>
      dispatch(getCategoryProducts(category, page, subcategory, filter)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories);
