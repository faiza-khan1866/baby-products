// import React from "react";
// import MainTitle from "./../../../components/MainTitle";
// import banner from "./../../../assets/images/banner2.jpeg";
// import { constants } from "./../../../utils/constants";
//
// const AdvisorHeader = ({ language }) => {
//   return (
//     <MainTitle
//       text={
//         constants?.site_content?.blog_page_heading[language]
//       }
//     />
//   );
// };
//
// export default AdvisorHeader;

import React from "react";
import MainTitle from "./../../../components/MainTitle";
import banner from "./../../../assets/images/banner2.jpeg";
import { constants } from "./../../../utils/constants";

const AdvisorHeader = ({ language }) => {
    return (
        <MainTitle
            text={
                constants?.site_content?.blog_page_heading[language]
            }
        />
    );
};

export default AdvisorHeader;
