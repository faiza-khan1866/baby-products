import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import SimpleButton from "../../../components/SimpleButton/SimpleButton";
import { constants } from "../../../utils/constants";
// import { articleCategories } from "../../../utils/data";
import { API } from "./../../../http/API";
import { Redirect } from "react-router";
import ClipLoader from "react-spinners/BounceLoader";

function AdvisorCategoryGrid({ language }) {
  const history = useHistory();
  const [articleCategories, setArticleCategories] = useState([]);
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    API.get("/article_category")
      .then((response) => {
        setArticleCategories(response.data);
        API.get(`/articles`).then((res) => {
          setArticles(res.data);
        });
      })
      .catch((err) => console.log(err));
  }, []);
  // const { global } = props;

  return (
    <div className="advisor-category-grid">
      <Container>
        <Row>
          {articleCategories.length > 0 ? (
            articleCategories?.map((x, index) => (
              <React.Fragment key={index + x.title}>
                <Col sm={12} md={6} lg={4}>
                  <div className="baby-care-content">
                    <div className="baby-care-image-wrap">
                      {x.featured_img && (
                        <img
                          src={
                            process.env.REACT_APP_IMAGE_BASE_URL +
                            x.featured_img
                          }
                          alt={x.title}
                          className="baby-care-image"
                        />
                      )}
                    </div>
                    <div className="baby-care-text">
                      <h6>{language === "ar" ? x.arabic?.title : x.title}</h6>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${
                            language === "ar"
                              ? x.arabic?.content?.length > 100
                                ? x.arabic?.content
                                : x.arabic?.content
                              : x.content?.length > 100
                              ? x.content
                              : x.content
                          }`,
                        }}
                      ></div>
                      {/* <p>{x.content?.substring(0, 100)}...</p> */}
                      <SimpleButton
                        // style={{ margin: "auto" }}
                        onClick={() =>
                          history.push(
                            `/${language}/breastfeeding-advisor/${encodeURIComponent(
                              x.route
                            )}/${
                              articles?.find(
                                (y) => y.category_route === x.route
                              )?.route
                            }`
                          )
                        }
                        // onClick={() => {
                        //   history.push(
                        //     `/${
                        //       global?.activeLanguage
                        //     }/breastfeeding-advisor/${encodeURIComponent(
                        //       x.route
                        //     )}/${
                        //       articles?.find(
                        //         (y) =>
                        //           y.category_route === x.route
                        //       )?.route
                        //     }`
                        //   );
                        // }}
                      >
                        {constants?.site_content?.view_article[language] ||
                          "View Article"}
                      </SimpleButton>
                    </div>
                  </div>
                </Col>
              </React.Fragment>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "300px",
                width: "100%",
                alignItems: "center",
              }}
            >
              <ClipLoader color={"#e65550"} loading={true} size={80} />
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(AdvisorCategoryGrid);
