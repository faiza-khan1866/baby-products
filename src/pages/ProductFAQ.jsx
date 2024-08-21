import React, { useState, useEffect } from "react";
import ProductFAQList from "../sections/ProductFAQList";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import { Helmet } from "react-helmet";
import { constants } from "../utils/constants";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProductFAQ = () => {
  const pages = useSelector((state) => state.allPages.pages);
  const [currentPage, setCurrentPage] = useState(null);
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find(
        (x) => x.slug === "productfaqs"
      );
      setCurrentPage(pageData);

      API.get(`auth/all_widgets/${pageData._id}`)
        .then((res) => {
          let widget_content =
            res.data?.[res.data?.length - 1]
              ?.widget_content;
          // debugger;
          setFaqData(widget_content);
        })
        .catch((err) => console.log(err));
    }
  }, [pages]);

  const global = useSelector((state) => state.globalReducer);

  const breadCrumbItemsEnglish = [
    {
      text: "Home",
      active: false,
      link: "/",
    },
    {
      text: "Questions And Answers",
      active: true,
      link: `/${global.activeLanguage}/faq`,
    },
  ];
  const breadCrumbItemsArabic = [
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "أسئلة وأجوبة",
      active: true,
      link: `/${global.activeLanguage}/faq`,
    },
  ]
  return (
    <div className="faq-page">
      <Helmet>
        <title>
          {faqData?.meta_details?.title ||
            constants.site_name}
        </title>
        <meta
          name="description"
          content={
            faqData?.meta_details
              ?.description || constants.seo_description
          }
        />
      </Helmet>
      <BreadCrumbs
        breadCrumbItems={
          global.activeLanguage === "en"
            ? breadCrumbItemsEnglish
            : breadCrumbItemsArabic
        }
        language={global?.activeLanguage}
      />
      <ProductFAQList
        faqData={
          global?.activeLanguage === "ar"
            ? faqData?.arabic?.faq
            : faqData?.faq
        }
        language={global?.activeLanguage}
        isArabic={
          global?.activeLanguage === "ar"
        }
      />
      {global?.activeLanguage == 'en' && currentPage?.boiler_plate
        || global?.activeLanguage == 'ar' && currentPage?.arabic?.boiler_plate
        ?
        <div className="pregnancy-section">
          <Container>
            <div style={{ borderRadius: '6px', boxShadow: '0 0 10px rgba(0,0,0,.07)', padding: '2%', marginBottom: '2rem' }}
              dangerouslySetInnerHTML={{ __html: global?.activeLanguage == 'en' ? currentPage?.boiler_plate : currentPage?.arabic?.boiler_plate }}
            ></div>
          </Container>
        </div>
        : ""
      }
    </div>
  );
}

export default ProductFAQ;
