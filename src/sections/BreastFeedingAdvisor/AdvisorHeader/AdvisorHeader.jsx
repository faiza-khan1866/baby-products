import React from "react";
import MainTitle from "./../../../components/MainTitle";
import banner from "./../../../assets/images/banner2.jpeg";
import { constants } from "./../../../utils/constants";

const AdvisorHeader = ({ language }) => {
  return (
    // <div
    //   className="product-header"
    //   style={{ backgroundImage: `url(${banner})` }}
    // >

    // <MainTitle text="Breastfeeding Advisor" />
    <MainTitle
      text={
        constants?.site_content
          ?.breast_feeding_advisor_heading[language]
      }
    />
    // </div>
  );
};

export default AdvisorHeader;
