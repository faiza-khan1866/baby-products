import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import SimpleButton from "../../../components/SimpleButton/SimpleButton";
import { API } from "./../../../http/API";
import { constants } from "../../../utils/constants";
import ClipLoader from "react-spinners/BounceLoader";

function AdvisorCategoryGrid(props) {
  const history = useHistory();
  const [blogGridItems, setBlogGridItems] = useState([]);

  useEffect(() => {
    API.get("/auth/blogs")
      .then((response) => {
        setBlogGridItems(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const { global } = props;

  return (
    <div className="blog-category-grid">
      <Container>
        <Row>
          {blogGridItems.length > 0 ? (
            blogGridItems?.map((x, index) => (
              <React.Fragment key={index + x.title}>
                <Col sm={12} md={6} lg={4}>
                  <div className="blog-grid-content">
                    <div className="blog-image-wrap">
                      {x.featured_img && (
                        <img
                          src={
                            process.env.REACT_APP_IMAGE_BASE_URL +
                            x.featured_img
                          }
                          alt={x.title}
                          className="blog-image"
                        />
                      )}
                    </div>
                    <div className="blog-text">
                      <h6>
                        {props.isArabic ? x.arabic?.title : x.title}
                        {/*{x.title}*/}
                      </h6>

                      <div
                        className="blogdesc"
                        dangerouslySetInnerHTML={{
                          __html: props.isArabic
                            ? x.arabic?.description?.substr(0, 210)
                            : x.description?.substr(0, 210),
                        }}
                        // dangerouslySetInnerHTML={{
                        //     __html: x.description.substr(
                        //         0,
                        //         210
                        //     ),
                        // }}
                      ></div>

                      <SimpleButton
                        onClick={() => {
                          history.push(
                            `/${
                              global.activeLanguage
                            }/blog/${encodeURIComponent(x.route)}`
                          );
                        }}
                      >
                        {constants?.site_content?.view_blog[props.language]}
                        {/*View Blog*/}
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
