import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs";
import AdvisorCategoryGrid from "../sections/BreastFeedingAdvisor/AdvisorCategoryGrid/AdvisorCategoryGrid";
import AdvisorHeader from "../sections/BreastFeedingAdvisor/AdvisorHeader";
import { constants } from "../utils/constants";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const BreastFeedingAdvisor = () => {

  const [currentPage, setCurrentPage] = useState(null);

  const pages = useSelector((state) => state.allPages.pages);
  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find(
        (x) => x.slug === "breastfeeding-advisor"
      );
      setCurrentPage(pageData);
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
      text: "Breastfeeding Advisor",
      active: true,
      link: `/${global?.activeLanguage}/breastfeeding-advisor`,
    },
  ];
  const breadCrumbItemsArabic = [
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "مستشار الرضاعة الطبيعية",
      active: true,
      link: `/${global.activeLanguage}/breastfeeding-advisor`,
    },

  ]
  return (
    <div className="breast-feeding-advisor-page" >
      <Helmet>
        <title>
          {currentPage?.meta_details?.title ||
            constants.site_name}
        </title>
        <meta
          name="description"
          content={
            currentPage?.meta_details
              ?.description || constants.seo_description
          }
        />
      </Helmet>
      <AdvisorHeader language={global?.activeLanguage} />
      <BreadCrumbs
        breadCrumbItems={
          global?.activeLanguage === "en"
            ? breadCrumbItemsEnglish
            : breadCrumbItemsArabic
        }
        language={global?.activeLanguage}
      />
      <AdvisorCategoryGrid
        language={global?.activeLanguage}
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
    </div >
  );
}

export default BreastFeedingAdvisor;
