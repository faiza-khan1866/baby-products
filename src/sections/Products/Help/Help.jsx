import React from "react";
import { Link } from "react-router-dom";
import ButtonTheme from "../../../components/ButtonTheme";
import { constants } from "../../../utils/constants";
import contactIcon from "./../../../assets/icons/contact.png";
import helpIcon from "./../../../assets/icons/help.png";

export default function Help(props) {
  return (
    <div className="help-contact-wrap">
      <div className="row g-0 m-0">
        <div className="col-md-6 p-0">
          <div className="help-wrap">
            <div className="text-wrap">
              <h4>
                {
                  constants.site_content.here_to_help[
                    props.language
                  ]
                }
              </h4>
              <Link
                to={`/${props.language}/breastfeeding-advisor`}
              >
                <ButtonTheme outline>
                  {
                    constants.site_content
                      .breastfeeding_advisor[props.language]
                  }
                </ButtonTheme>
              </Link>
            </div>
            <div className="image-wrap">
              <img src={helpIcon} alt="help" />
            </div>
          </div>
        </div>
        <div className="col-md-6 p-0">
          <div className="contact-wrap">
            <div className="image-wrap">
              <img src={contactIcon} alt="contact" />
            </div>
            <div className="text-wrap">
              <h4>
                {
                  constants.site_content.want_to_know_more[
                    props.language
                  ]
                }
              </h4>
              <Link to={`/${props.language}/contact`}>
                <ButtonTheme outline>
                  {
                    constants.site_content.contact_us[
                      props.language
                    ]
                  }
                </ButtonTheme>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
