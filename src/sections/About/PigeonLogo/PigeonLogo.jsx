import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { API } from "../../../http/API";
import { connect } from "react-redux";

function PigeonLogo(props) {
  const [pigeonLogoData, setPigeonLogoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    if (props.currentPage._id) {
      setCurrentPage(props.currentPage);
      API.get(`auth/all_widgets/${props.currentPage._id}`)
        .then((res) => {
          let widget_content = res.data[res.data.length - 1].widget_content;
          setPigeonLogoData(widget_content);
        })
        .catch((err) => console.log(err));
    }
  }, [props.currentPage]);

  const { global } = props;
  return (
    <div className="pigeon-logo-tab">
      <Container>
        {/* <div className="section-title-underlined">
          <h2>Pigeon Logo</h2>
        </div> */}
        <div className="content">
          <p
            dangerouslySetInnerHTML={{
              __html: `${
                global?.activeLanguage === "ar"
                  ? pigeonLogoData?.arabic?.content
                  : pigeonLogoData?.content
              }`,
            }}
          ></p>
        </div>
        <div className="logo">
          <img
            src={process.env.REACT_APP_IMAGE_BASE_URL + pigeonLogoData?.logo}
            alt="Pigeon Logo"
          />
        </div>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(PigeonLogo);
