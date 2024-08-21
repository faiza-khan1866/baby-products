import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs";
import BabyCare from "../sections/MotherBabyWorld/BabyCare";
import Pregnancy from "../sections/MotherBabyWorld/Pregnancy";
import QuestionsAndAnswers from "../sections/MotherBabyWorld/QuestionsAndAnswers";
import { Container } from "react-bootstrap";
import { constants } from "../utils/constants";
import { useSelector } from "react-redux";

const MotherBabyWorld = () => {
    const [currentPage, setCurrentPage] = useState(null);
    const pages = useSelector((state) => state.allPages.pages);

    useEffect(() => {
        if (pages && pages.length > 0) {
            let pageData = pages.find(
                (x) => x.slug === "mother-baby-world"
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
            text: "Mother & Baby World",
            active: true,
            link: `/${global.activeLanguage}/mother-baby-world`,
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
            link: `/${global.activeLanguage}/mother-baby-world`,
        },
    ]

    return (
        <div className="mother-baby-page">
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
            <QuestionsAndAnswers
                language={global?.activeLanguage}
            />
            <BabyCare language={global?.activeLanguage} />
            <Pregnancy language={global?.activeLanguage} />

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

export default MotherBabyWorld;
