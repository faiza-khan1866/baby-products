import React, { useState, useEffect } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import GoodToKnowCard from "../sections/GoodToKnow/GoodToKnowCard";
import { API } from "../http/API";
import { Helmet } from "react-helmet";
import { constants } from "../utils/constants";
import ClipLoader from "react-spinners/BounceLoader";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const GoodToKnow = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const pages = useSelector((state) => state.allPages.pages);

  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find(
        (x) => x.slug === "good-to-know"
      );
      setCurrentPage(pageData);
    }
  }, [pages]);

  const [goodToKnowData, setGoodToKnowData] = useState([]);

  const getGoodtoKnowsData = () => {
    API.get(`auth/good_to_know`).then(response => {
      const allData = response.data;
      setGoodToKnowData(allData);
    })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getGoodtoKnowsData();
  }, []);

  const global = useSelector((state) => state.globalReducer);

  const breadCrumbItemsEnglish = [

    {
      text: "Home",
      active: false,
      link: "/",
    },
    {
      text: "Good to Know",
      active: true,
      link: `/${global.activeLanguage}/good-to-know`,
    },
  ];
  const breadCrumbItemsArabic = [
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "من الجيد معرفة",
      active: true,
      link: `/${global.activeLanguage}/good-to-know`,
    },

  ]
  return (
    <div className="good-to-know-page">
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
      <BreadCrumbs
        breadCrumbItems={
          global?.activeLanguage === "en"
            ? breadCrumbItemsEnglish
            : breadCrumbItemsArabic
        }
        language={global?.activeLanguage}
      />
      <Container>
        <h1>
          {
            constants.site_content.good_to_know[
            global?.activeLanguage
            ]
          }
        </h1>
      </Container>
      {goodToKnowData.length > 0 ?
        goodToKnowData?.map((x, index) => (
          <GoodToKnowCard
            textOrder={index % 2}
            goodToKnowData={
              global?.activeLanguage === "ar"
                ? { ...x }.arabic
                : { ...x }
            }
          />
        ))

        :
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          height: '300px',
          width: "100%",
          alignItems: 'center'
        }}
        >
          <ClipLoader
            color={"#e65550"}
            loading={true}
            size={80}
          />
        </div>
      }

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

export default GoodToKnow;
