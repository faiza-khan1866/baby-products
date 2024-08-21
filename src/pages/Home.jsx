import React, { Component } from "react";
import ImageMenu from "../sections/Home/ImageMenu/ImageMenu";
import ProductsGrid from "../sections/Home/ProductsGrid/ProductsGrid";
import PromoBanner from "../sections/Home/PromoBanner";
import Slider from "../sections/Home/Slider";
import RelatedArticle from "../sections/Products/RelatedArticle";
import Welcome from "../sections/Home/Welcome/Welcome";
import articleimage from "../assets/images/articleimage.jpeg";
import { connect } from "react-redux";
import {
  getCategories,
  getCategoryProducts,
  getProducts,
} from "../redux/products";

import Help from "../sections/Products/Help/Help";
import { Helmet } from "react-helmet";

class Home extends Component {
  state = {
    currentPage: null,
    products: [],
    currentArticleIndex: 0,
    categories: this.props.categories?.filter((x) => x.parent_id === null),
    widget_content: null,
    articles: [],
  };

  // componentDidMount() {

  // }

  componentDidUpdate(prevProps) {
    if (this.props.categories !== prevProps.categories) {
      let categories = [
        ...this.props.categories?.filter((x) => x.parent_id === null),
      ];
      this.setState({
        categories,
      });
    }
  }
  render() {
    const { global } = this.props;
    return (
      <div>
        <Helmet>
          <html lang="en" />
          <title>
            {global?.activeLanguage === "ar"
              ? "أفضل منتجات الأطفال| بيجون| العناية بالطفل"
              : "Best Baby Products | Pigeon Arabia | Baby Care"}
          </title>
          <meta
            property="og:title"
            content={
              global?.activeLanguage === "ar"
                ? "أفضل منتجات الأطفال| بيجون| العناية بالطفل"
                : "Best Baby Products | Pigeon Arabia | Baby Care"
            }
          />
          <meta
            name="description"
            content={
              global?.activeLanguage === "ar"
                ? "حل شامل لتلبية جميع احتياجاتك من الأمومة إلى رعاية الأطفال. تصفح مجموعتنا الواسعة من المنتجات التي تتراوح من شافطات حليب الأم ، والزجاجات ، والحلمات ، وسادات الثدي والمزيد."
                : "A one-stop solution to meet all your needs from maternity to childcare. Browse our wide range of products ranging from breast pumps, bottles, teats, breast pads and more."
            }
          />
          <script type="application/ld+json">
            {global?.activeLanguage === "ar" ? "" : ""}
          </script>
        </Helmet>
        <Slider activeLanguage={global?.activeLanguage} />
        <Welcome language={global?.activeLanguage} />
        <ImageMenu language={global?.activeLanguage} />
        <ProductsGrid
          categories={this.state.categories}
          isArabic={global?.activeLanguage === "ar"}
          language={global?.activeLanguage}
        />
        <PromoBanner language={global?.activeLanguage} />
        <RelatedArticle
          language={global?.activeLanguage}
          articleTitle={
            global?.activeLanguage === "ar"
              ? "النظام الغذائي للأم خلال فترة الرضاعة الطبيعية"
              : "Mother’s Diet During the Breastfeeding Period"
          }
          articleDescription={
            global?.activeLanguage === "ar"
              ? "<h3>اعتني بنظامك الغذائي من أجل طفلك</h3>\n\n<p>تحتاج الأمهات بعد الولادة إلى طاقة أكثر بكثير مما تتطلبه أثناء الحمل. والسبب أنهم ينتجون اللبن ويحتاجون إلى التغذية لذلك. علاوة على ذلك، فإن الأم تعتني بالطفل وتنام أقل بكثير. لهذا السبب من المهم الاهتمام بالنظام الغذائي للأم خلال هذا الوقت.</p>"
              : "<h3>Take care of your diet for your baby&rsquo;s sake</h3>\n\n<p>Postpartum mothers require far more energy than during pregnancy. The reason is that they are producing breast milk and they require nutrition for that. Moreover, the mother is also taking care of the baby and getting far less sleep. That is why it is important to take care of the mother&rsquo;s diet during this time.</p>"
          }
          articleImage={articleimage}
          articleRoute={`/${global?.activeLanguage}/breastfeeding-advisor/hints-for-continuing-to-breastfeed/mothers-diet-during-the-breastfeeding-period`}
        />
        <Help
          isArabic={global?.activeLanguage === "ar"}
          language={global?.activeLanguage}
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
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (page) => dispatch(getProducts(page)),
    getCategories: () => dispatch(getCategories()),
    getCategoryProducts: (category) => dispatch(getCategoryProducts(category)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
