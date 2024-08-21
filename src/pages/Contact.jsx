import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import ContactForm from "../sections/Contact/ContactForm";
import OfficeInfo from "../sections/Contact/OfficeInfo";
import { constants } from "../utils/constants";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Contact = () => {

  const pages = useSelector((state) => state.allPages.pages);
  const [currentPage, setCurrentPage] = useState(null);
  const [officeInfo, setOfficeInfo] = useState(null);

  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find(
        (x) => x.slug === "office-info"
      );
      setCurrentPage(pageData);

      API.get(`auth/all_widgets/${pageData._id}`)
        .then((res) => {
          let widget_content =
            res.data?.[res.data?.length - 1]
              ?.widget_content;
          setOfficeInfo(widget_content);
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
      text: "Contact Us",
      active: true,
      link: `/${global.activeLanguage}/contact`,
    },
  ];
  const breadCrumbItemsArabic = [
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "اتصل بنا",
      active: true,
      link: `/${global.activeLanguage}/contact`,
    }
  ]
  return (
    <div className="contact-page">
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
      <ContactForm language={global.activeLanguage} />
      <OfficeInfo
        data={
          global?.activeLanguage === "ar"
            ? officeInfo?.arabic
            : officeInfo
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

export default Contact;
