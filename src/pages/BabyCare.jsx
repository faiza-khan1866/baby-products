import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import BabyCareTabContainer from "../sections/BabyCare/BabyCareTabContainer";
import { constants } from "../utils/constants";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const BabyCare = () => {

  const pages = useSelector((state) => state.allPages.pages);
  const [currentPage, setCurrentPage] = useState(null);
  const [babyCareData, setBabyCareData] = useState(null);

  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find(
        (x) => x.slug === "baby-care"
      );
      setCurrentPage(pageData);

      API.get(`auth/all_widgets/${pageData._id}`)
        .then((res) => {
          let widget_content =
            res.data?.[res.data?.length - 1]
              ?.widget_content;
          setBabyCareData(widget_content);
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
      text: "Mother & Baby World",
      active: true,
      link: `/${global?.activeLanguage}/baby-care`,
    },
  ];

  const breadCrumbItemsArabic = [
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "عالم الأم والطفل",
      active: true,
      link: `/${global?.activeLanguage}/baby-care`,
    },
  ]

  return (
    <div className="baby-care-page">
      <Helmet>
        <title>
          {currentPage?.meta_details?.title ||
            constants.site_name}
        </title>
      </Helmet>
      <BreadCrumbs
        breadCrumbItems={
          global?.activeLanguage === "en"
            ? breadCrumbItemsEnglish
            : breadCrumbItemsArabic
        }
        language={global?.activeLanguage}
      />
      <BabyCareTabContainer
        image={babyCareData?.featured_img}
        babyCareData={
          global?.activeLanguage === "ar"
            ? babyCareData?.arabic
            : babyCareData
        }
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
    </div>
  );
}

export default BabyCare;
