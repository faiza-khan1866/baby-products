import React, { useState, useEffect } from "react";
import VideoGrid from "../sections/VideoGrid";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import { Helmet } from "react-helmet";
import { constants } from "../utils/constants";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";


const Video = () => {

  const [currentPage, setCurrentPage] = useState(null);

  const pages = useSelector((state) => state.allPages.pages);
  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find(
        (x) => x.slug === "video"
      );
      setCurrentPage(pageData);
    }
  }, [pages]);

  const [videos, setVideos] = useState([]);

  const getVideosData = () => {
    API.get("auth/video").then(response => {
      const allData = response.data;
      setVideos(allData);
    })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getVideosData();
  }, []);

  const global = useSelector((state) => state.globalReducer);

  const breadCrumbItemsEnglish = [
    {
      text: "Home",
      active: false,
      link: "/",
    },
    {
      text: "Video",
      active: true,
      link: `/${global?.activeLanguage}/video`,
    },
  ];
  const breadCrumbItemsArabic = [
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "فيديوهات",
      active: true,
      link: `/${global?.activeLanguage}/video`,
    },
  ]
  return (
    <div className="video-page">
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
      <VideoGrid
        videos={videos}
        isArabic={
          global?.activeLanguage === "ar"
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

export default Video;
