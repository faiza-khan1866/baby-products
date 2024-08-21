import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./../../assets/images/logo.svg";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function FooterLower(props) {
  const { global } = props;
  const history = useHistory();
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState("")


  useEffect(() => {
    if(history.location.pathname != currentRoute){
        setCurrentRoute(history.location.pathname)
    }
  }, [location])
  

  return (
    <div className="footer-lower">
      <div className="lower-inner">
        <div className="footer-menu">
          {/* {console.log("currentRoute",currentRoute)} */}
          <ul>
            <li>
              <Link
                to={`/${global.activeLanguage}/sitemap`}
                className={currentRoute === "/en/sitemap" ? "ActiveNavLinkFooter" : currentRoute === "/ar/sitemap" ? "ActiveNavLinkFooter" :""}
              >
                {global.activeLanguage == 'en' ? 'Sitemap' : 'خريطة الموقع' }
              </Link>
            </li>
            <li>
              <Link
                to={`/${global.activeLanguage}/subsidiaries`}
                className={currentRoute === "/en/subsidiaries" ? "ActiveNavLinkFooter" : currentRoute === "/ar/subsidiaries" ? "ActiveNavLinkFooter" :""}
              >
                {global.activeLanguage == 'en' ? 'Subsidiaries' : 'الفروع' }
              </Link>
            </li>
            <li>
              <Link
                to={`/${global.activeLanguage}/disclosure-policy`}
                className={currentRoute === "/en/disclosure-policy" ? "ActiveNavLinkFooter" : currentRoute === "/ar/disclosure-policy" ? "ActiveNavLinkFooter" :""}
              >
                {global.activeLanguage == 'en' ? 'Disclosure Policy' : 'سياسة الإفصاح عن المعلومات' }
              </Link>
            </li>
            <li>
              <Link
                to={`/${global.activeLanguage}/privacy-protection-policy`}
                className={currentRoute === "/en/privacy-protection-policy" ? "ActiveNavLinkFooter" : currentRoute === "/ar/privacy-protection-policy" ? "ActiveNavLinkFooter" :""}
              >
                {global.activeLanguage == 'en' ? 'Policy on Privacy Protection' : 'سياسة حماية الخصوصية'}
              </Link>
            </li>
            <li>
              <Link
                to={`/${global.activeLanguage}/social-media-policy`}
                className={currentRoute === "/en/social-media-policy" ? "ActiveNavLinkFooter" : currentRoute === "/ar/social-media-policy" ? "ActiveNavLinkFooter" :""}
              >
                {global.activeLanguage == 'en' ? 'Social Media Policy' : 'سياسة وسائل التواصل الإجتماعي' }
              </Link>
            </li>
            <li>
              <Link
                to={`/${global.activeLanguage}/term-of-use`}
                className={currentRoute === "/en/term-of-use" ? "ActiveNavLinkFooter" : currentRoute === "/ar/term-of-use" ? "ActiveNavLinkFooter" :""}
              >
                {global.activeLanguage == 'en' ? 'Terms of Use' : 'شروط الإستخدام' }
              </Link>
            </li>
            <li>
              <Link
                to={`/${global.activeLanguage}/contact`}
                className={currentRoute === "/en/contact" ? "ActiveNavLinkFooter" : currentRoute === "/ar/contact" ? "ActiveNavLinkFooter" :""}
              >
                {global.activeLanguage == 'en' ? 'Contact' : 'تواصل معنا' }
              </Link>
            </li>
            <li>
              <Link 
                to={`/${global.activeLanguage}/product-faqs`}
                className={currentRoute === "/en/product-faqs" ? "ActiveNavLinkFooter" : currentRoute === "/ar/product-faqs" ? "ActiveNavLinkFooter" :""}
              >
                {global.activeLanguage == 'en' ? 'Product Faqs' : 'الأسئلة الشائعة حول المنتجات' }
              </Link>
            </li>
          </ul>
          <p className="logo">
            <img src={logo} alt="pigeon-logo" />
          </p>
        </div>
        <div
            // className="copyright"
            className={`copyright ${
                props.language === "ar"
                    ? "copyrightArabic"
                    : ""
            }`}

        >
          <p>
          {global.activeLanguage == 'en' ? 'Copyrights © Pigeon Corporation. All Rights Reserved.' : 'حقوق النشر لشركة بيجون ©. جميع الحقوق محفوظة.' }
          </p>
        </div>
      </div>
    </div>
  );
}

// export default FooterLower;

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(FooterLower);
