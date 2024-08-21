import React, { Component } from "react";
import { Helmet } from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import { API } from "../http/API";
import FeatureTabs from "../sections/ProductDetails/FeaturesTabs/FeatureTabs";
import Overview from "../sections/ProductDetails/Overview";
import ProductReviews from "../sections/ProductDetails/ProductReviews";
import RecommendedSlider from "../sections/ProductDetails/RecommendedSlider";
import { connect } from "react-redux";
import { getCategoryProducts } from "../redux/products";
import { constants } from "../utils/constants";
import { Container } from "react-bootstrap";

class ProductDetails extends Component {
  state = {
    id: "",
    product: "",
    currentPage: 1,
    products: this.props.products,
    showProduct: true,
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Products",
        active: false,
        link: "/en/mother-baby-products",
      },
      {
        text: "",
        active: false,
        link: "/category",
      },
      {
        text: "",
        active: false,
        link: "/category",
      },
      {
        text: "",
        active: true,
        link: "/en/mother-baby-products",
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "المنتجات",
        active: false,
        link: "/en/mother-baby-products",
      },
      {
        text: "",
        active: false,
        link: "/category",
      },
      {
        text: "",
        active: false,
        link: "/category",
      },
      {
        text: "",
        active: true,
        link: "/en/mother-baby-products",
      },
    ],
  };

  viewGAProduct = (response) => {
    if (response.status === 200 || response.status === 201) {
      let data = response.data;
      let price =
        data?.discounted_price > 0
          ? data?.discounted_price
          : data?.default_price;

      if (typeof window !== "undefined") {
        if (window.dataLayer != null) {
          window.dataLayer.push({
            event: "productClick",
            ecommerce: {
              detail: {
                actionField: { list: "Search Results" }, // Optional list property.
                products: [
                  {
                    name: `${data?.name}`, // Name or ID is required.
                    id: `${data?._id}`,
                    price: `${price}`,
                    brand: "Pigeon Arabia",
                    category: `${data?.category_data?.name}`,
                    variant: `${data?.tags[0]}`,
                    // 'position': productObj.position
                  },
                ],
              },
            },
          });
        }
      }
    }
  };

  componentDidMount() {
    if (this.props.match.params.id && this.props.match.params.id !== "") {
      API.get(`auth/products/${this.props.match.params.id}`)
        .then((response) => {
          this.viewGAProduct(response);
          let sizeArray = {};
          let sizeArrayArabic = {};
          // let data = {...response.data}
          let data = JSON.parse(JSON.stringify(response.data));

          // console.log("arabic variations", data)
          if (data?.variations.length > 0) {
            data?.variations.forEach((element) => {
              if (sizeArray[element.name]?.length > 0) {
                // console.log(sizeArray[element.name],"tha")
                // let a =
                sizeArray[element.name].push(element);
              } else {
                sizeArray[element.name] = [element];
              }
            });

            data?.arabic?.variations.forEach((element) => {
              if (sizeArrayArabic[element.arabic_name]?.length > 0) {
                // console.log(sizeArrayArabic[element.arabic_name],"tha")
                // let a =
                sizeArrayArabic[element.arabic_name].push(element);
              } else {
                sizeArrayArabic[element.arabic_name] = [element];
              }
            });
            // console.log("arabic variations 108", data)
            let sizearr = [];
            let tmpObj = {};

            Object.entries(sizeArray).forEach((entry) => {
              const [key, value] = entry;

              tmpObj.name = key;
              tmpObj.items = value;
              tmpObj.colors = [];
              tmpObj.decorations = [];

              value.forEach((val2) => {
                if (val2.color && !tmpObj.colors.includes(val2.color)) {
                  tmpObj.colors.push(val2.color);
                }
                if (
                  val2?.decoration &&
                  !tmpObj.decorations.includes(val2?.decoration)
                ) {
                  tmpObj.decorations.push(val2?.decoration);
                }
              });

              sizearr.push(tmpObj);
              tmpObj = {};
            });

            let sizearrArabic = [];
            let tmpObjArabic = {};

            Object.entries(sizeArrayArabic).forEach((entry) => {
              const [key, value] = entry;

              tmpObjArabic.name = key;
              tmpObjArabic.items = value;
              tmpObjArabic.colors = [];
              tmpObjArabic.decorations = [];

              value.forEach((val2) => {
                if (val2.color && !tmpObjArabic.colors.includes(val2.color)) {
                  tmpObjArabic.colors.push(val2.color);
                }
                if (
                  val2?.decoration &&
                  !tmpObjArabic?.decorations.includes(val2?.decoration)
                ) {
                  tmpObjArabic?.decorations.push(val2?.decoration);
                }
              });

              sizearrArabic.push(tmpObjArabic);
              tmpObjArabic = {};
            });

            data.variations = JSON.parse(JSON.stringify(sizearr));
            data.arabic.variations = JSON.parse(JSON.stringify(sizearrArabic));
          }

          if (response.status === 200 || response.status === 201) {
            this.setState({
              product: response.data,
              newProduct: data,
            });

            if (!this.state.showProduct) {
              this.setShowProduct();
            }

            this.props.getCategoryProducts(
              response.data?.categories?.route,
              "all",
              this.props.categories?.find(
                (x) => x._id === response.data?.sub_category
              )?.route,
              null
            );
            let breadCrumbItemsEnglish = [...this.state.breadCrumbItemsEnglish];
            let breadCrumbItemsArabic = [...this.state.breadCrumbItemsArabic];

            let prod_category = this.props.categories?.find(
              (x) => x._id === response.data.category
            );
            let prod_sub_category = prod_category?.children?.find(
              (x) => x._id === response.data.sub_category
            );

            //setting category name
            breadCrumbItemsEnglish[2].text = prod_category?.name;
            breadCrumbItemsEnglish[2].link = `/${this.props.global?.activeLanguage}/products/${prod_category?.route}`;

            breadCrumbItemsArabic[2].text = prod_category?.arabic.name;
            breadCrumbItemsArabic[2].link = `/${this.props.global?.activeLanguage}/products/${prod_category?.route}`;

            //setting subcategory name
            breadCrumbItemsEnglish[3].text = prod_sub_category?.name;
            breadCrumbItemsEnglish[3].link = `/${this.props.global?.activeLanguage}/products/${prod_category?.route}/${prod_sub_category?.route}`;

            breadCrumbItemsArabic[3].text = prod_sub_category?.arabic.name;
            breadCrumbItemsArabic[3].link = `/${this.props.global?.activeLanguage}/products/${prod_category?.route}/${prod_sub_category?.route}`;

            //setting product name
            breadCrumbItemsEnglish[4].text = response.data?.name;
            breadCrumbItemsEnglish[4].link =
              `/${this.props.global?.activeLanguage}/product/` +
              encodeURIComponent(response.data?.route);
            this.setState({ breadCrumbItemsEnglish });

            breadCrumbItemsArabic[4].text = response.data?.arabic?.name;
            breadCrumbItemsArabic[4].link =
              `/${this.props.global?.activeLanguage}/product/` +
              encodeURIComponent(response.data?.route);
            this.setState({ breadCrumbItemsArabic });
          }
        })
        .catch((error) => {
          console.log("Something went wrong");
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.products !== prevProps.products) {
      this.setState({
        products: this.props.products,
      });
    }
    if (this.props.categoryProducts !== prevProps.categoryProducts) {
      this.setState({
        products: this.props.products,
      });
    }
    if (this.props.match.params.id !== prevProps.match.params.id) {
      API.get(`auth/products/${this.props.match.params.id}`)
        .then((response) => {
          this.viewGAProduct(response);
          let sizeArray = {};
          let sizeArrayArabic = {};
          let data = JSON.parse(JSON.stringify(response.data));

          if (data?.variations.length > 0) {
            data?.variations.forEach((element) => {
              if (sizeArray[element.name]?.length > 0) {
                sizeArray[element.name].push(element);
              } else {
                sizeArray[element.name] = [element];
              }
            });

            data?.arabic?.variations.forEach((element) => {
              if (sizeArrayArabic[element.arabic_name]?.length > 0) {
                sizeArrayArabic[element.arabic_name].push(element);
              } else {
                sizeArrayArabic[element.arabic_name] = [element];
              }
            });
            let sizearr = [];
            let tmpObj = {};

            Object.entries(sizeArray).forEach((entry) => {
              const [key, value] = entry;

              tmpObj.name = key;
              tmpObj.items = value;
              tmpObj.colors = [];
              tmpObj.decorations = [];

              value.forEach((val2) => {
                if (val2.color && !tmpObj.colors.includes(val2.color)) {
                  tmpObj.colors.push(val2.color);
                }
                if (
                  val2?.decoration &&
                  !tmpObj?.decorations.includes(val2?.decoration)
                ) {
                  tmpObj?.decorations.push(val2?.decoration);
                }
              });

              sizearr.push(tmpObj);
              tmpObj = {};
            });

            let sizearrArabic = [];
            let tmpObjArabic = {};

            Object.entries(sizeArrayArabic).forEach((entry) => {
              const [key, value] = entry;

              tmpObjArabic.name = key;
              tmpObjArabic.items = value;
              tmpObjArabic.colors = [];
              tmpObjArabic.decorations = [];

              value.forEach((val2) => {
                if (val2.color && !tmpObjArabic.colors.includes(val2.color)) {
                  tmpObjArabic.colors.push(val2.color);
                }
                if (
                  val2.decoration &&
                  !tmpObjArabic?.decorations.includes(val2.decoration)
                ) {
                  tmpObjArabic?.decorations.push(val2.decoration);
                }
              });

              sizearrArabic.push(tmpObjArabic);
              tmpObjArabic = {};
            });

            data.variations = JSON.parse(JSON.stringify(sizearr));
            data.arabic.variations = JSON.parse(JSON.stringify(sizearrArabic));
          }

          if (response.status === 200 || response.status === 201) {
            this.setState({
              product: response.data,
              newProduct: data,
            });

            if (!this.state.showProduct) {
              this.setShowProduct();
            }
            this.props.getCategoryProducts(
              response.data?.categories?.route,
              "all",
              this.props.categories?.find(
                (x) => x._id === response.data?.sub_category
              )?.route,
              null
            );
            let breadCrumbItemsEnglish = [...this.state.breadCrumbItemsEnglish];
            let breadCrumbItemsArabic = [...this.state.breadCrumbItemsArabic];

            let prod_category = this.props.categories?.find(
              (x) => x._id === response.data.category
            );
            let prod_sub_category = prod_category?.children?.find(
              (x) => x._id === response.data.sub_category
            );

            //setting category name
            breadCrumbItemsEnglish[2].text = prod_category?.name;
            breadCrumbItemsEnglish[2].link = `/${this.props.global?.activeLanguage}/products/${prod_category?.route}`;

            breadCrumbItemsArabic[2].text = prod_category?.arabic.name;
            breadCrumbItemsArabic[2].link = `/${this.props.global?.activeLanguage}/products/${prod_category?.route}`;

            //setting subcategory name
            breadCrumbItemsEnglish[3].text = prod_sub_category?.name;
            breadCrumbItemsEnglish[3].link = `/${this.props.global?.activeLanguage}/products/${prod_category?.route}/${prod_sub_category?.route}`;

            breadCrumbItemsArabic[3].text = prod_sub_category?.arabic.name;
            breadCrumbItemsArabic[3].link = `/${this.props.global?.activeLanguage}/products/${prod_category?.route}/${prod_sub_category?.route}`;

            //setting product name
            breadCrumbItemsEnglish[4].text = response.data?.name;
            breadCrumbItemsEnglish[4].link =
              `/${this.props.global?.activeLanguage}/product/` +
              encodeURIComponent(response.data?.route);
            this.setState({ breadCrumbItemsEnglish });

            breadCrumbItemsArabic[4].text = response.data?.arabic?.name;
            breadCrumbItemsArabic[4].link =
              `/${this.props.global?.activeLanguage}/product/` +
              encodeURIComponent(response.data?.route);
            this.setState({ breadCrumbItemsArabic });
          }
        })
        .catch((error) => {
          console.log("Something went wrong");
        });
    }
  }

  setShowProduct = () => {
    this.setState({ showProduct: !this.state.showProduct });
  };
  render() {
    return (
      <div className="product-details-page">
        <Helmet>
          <title>
            {this.state.product?.meta_details?.title || constants.site_name}
          </title>
          <meta
            name="description"
            content={
              this.state.product?.meta_details?.description ||
              constants.seo_description
            }
          />
        </Helmet>
        <BreadCrumbs
          breadCrumbItems={
            this.props.global?.activeLanguage === "en"
              ? this.state.breadCrumbItemsEnglish
              : this.state.breadCrumbItemsArabic
          }
          language={this.props.global?.activeLanguage}
        />

        <Overview
          showProduct={this.state.showProduct}
          {...this.state.product}
          newStructure={this.state.newProduct}
          isArabic={this.props.global?.activeLanguage === "ar"}
          language={this.props.global?.activeLanguage}
        />
        <FeatureTabs
          {...this.state.product}
          isArabic={this.props.global?.activeLanguage === "ar"}
          language={this.props.global?.activeLanguage}
        />
        <RecommendedSlider
          setShowProduct={this.setShowProduct}
          currentProduct={this.state.product}
          products={this.props.categoryProducts}
          isArabic={this.props.global?.activeLanguage === "ar"}
          language={this.props.global?.activeLanguage}
        />
        {this.state.product?.reviews?.filter((x) => x.is_approved === true)
          ?.length > 0 && (
          <ProductReviews
            reviews={this.state.product?.reviews?.filter(
              (x) => x.is_approved === true
            )}
            language={this.props.global?.activeLanguage}
          />
        )}

        {(this.props.global?.activeLanguage == "en" &&
          this.state.product?.boiler_plate) ||
        (this.props.global?.activeLanguage == "ar" &&
          this.state.product?.arabic?.boiler_plate) ? (
          <div className="pregnancy-section">
            <Container>
              <div
                style={{
                  borderRadius: "6px",
                  boxShadow: "0 0 10px rgba(0,0,0,.07)",
                  padding: "2%",
                  marginBottom: "2rem",
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    this.props.global?.activeLanguage == "en"
                      ? this.state.product?.boiler_plate
                      : this.state.product?.arabic?.boiler_plate,
                }}
              ></div>
            </Container>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state?.productReducer?.products,
    categoryProducts: state?.productReducer?.categoryProducts,
    categories: state?.productReducer?.categories,
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryProducts: (category, page, subcategory, filter) =>
      dispatch(getCategoryProducts(category, page, subcategory, filter)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
