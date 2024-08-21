import React from "react";
import { Container, Row } from "react-bootstrap";
import VideoItem from "../../components/VideoItem";
import { constants } from "../../utils/constants";
import { useEffect } from "react";
import { connect } from "react-redux";
import ModalVideo from "react-modal-video";
import { BsPlayCircleFill } from "react-icons/bs";
import { CgPlayPauseO } from "react-icons/cg";

const VideoGrid = (props) => {
  const [oldAllVideos, setOldAllVideos] = React.useState(props.videos);
  const [allVideos, setAllVideos] = React.useState(props.videos);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [allCategories, setAllCategories] = React.useState([]);
  const [openVideo, setOpenVideo] = React.useState(false);
  const [videoSrc, setvideoSrc] = React.useState("");

  useEffect(() => {
    if (props.videos.length > 0 && props.videos != allVideos) {
      setAllVideos(props.videos);
      setOldAllVideos(props.videos);
      setCategories(props.videos);
    }
  }, [props.videos]);

  const setCategories = (videos) => {
    // console.log("===videos===");
    // console.log(videos);
    let categories = {};
    videos.forEach((element, index, array) => {
      let category = {};
      if (typeof element.category_slug !== "undefined") {
        category = {
          title: element.category,
          category_slug: element.category_slug,
          arabic_title: element.arabic.category,
        };
        categories[element.category_slug] = category;
      }
    });
    setAllCategories(categories);
  };

  const filterVideosByCategory = (category) => {
    setSelectedCategory(category);

    if (category == "all") {
      setAllVideos(oldAllVideos);
    } else {
      const filteredData = oldAllVideos.filter(
        (video) => video.category_slug == category
      );
      setAllVideos(filteredData);
    }
  };

  const playVideo = (url) => {
    setOpenVideo(true);
    const splitSrc = url.split("/");
    setvideoSrc(splitSrc[4]);
  };

  return (
    <div className="videos-section">
      <Container>
        <h1>{constants?.site_content?.videos_page_heading[props.language]}</h1>

        <Row
          style={{ marginBottom: "20px" }}
          className="Videos-buttons-wrapper"
        >
          <button
            className={
              selectedCategory == "all"
                ? "filterCategoryBtn active"
                : "filterCategoryBtn"
            }
            onClick={() => filterVideosByCategory("all")}
          >
            {props.global.activeLanguage == "en" ? "All" : "الكل"}
          </button>

          {Object.keys(allCategories).map(function (key, index) {
            return (
              <button
                onClick={() =>
                  filterVideosByCategory(allCategories[key].category_slug)
                }
                className={
                  selectedCategory == allCategories[key].category_slug
                    ? "filterCategoryBtn active"
                    : "filterCategoryBtn"
                }
              >
                {props.global.activeLanguage == "en"
                  ? allCategories[key].title
                  : allCategories[key].arabic_title
                  ? allCategories[key].arabic_title
                  : allCategories[key].title}
              </button>
            );
          })}
        </Row>
        <Row>
          {/* {console.log("allVideos",allVideos)} */}
          {allVideos?.map((x, index) => (
            // <VideoItem
            //   key={index + x.title}
            //   src={x.url}
            //   title={
            //     props.isArabic ? x.arabic?.title : x.title
            //   }
            // />
            <div
              className="productVideoWidth col-md-4"
              onClick={() => playVideo(x.url)}
            >
              <div className="video-item-wrap">
                <div className="wrap-iframe">
                  <img
                    // width={'300px'} height={'207px'}
                    src={process.env.REACT_APP_IMAGE_BASE_URL + x.image || ""}
                    alt=""
                    srcset=""
                  />
                  <BsPlayCircleFill
                    style={{
                      position: "absolute",
                      top: "40%",
                      right: "45%",
                      fontSize: "40px",
                    }}
                    color={"#e65550"}
                  />
                </div>
                <h6>{props.isArabic ? x.arabic?.title : x.title}</h6>
              </div>
            </div>
            // <img width={'250px'} height={'180px'}  src={x.image || ""} alt="" srcset="" />
          ))}
          <ModalVideo
            channel="youtube"
            isOpen={openVideo}
            videoId={videoSrc}
            onClose={() => setOpenVideo(false)}
          />
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    // userWishlistProducts: state.productReducer?.userWishlistProducts,
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // logout: () =>
    //   dispatch({
    //     type: "LOGOUT",
    //   }),
    // wishlistSuccess: (data) =>
    //   dispatch({
    //     type: "GET_WISHLIST_SUCCESS",
    //     payload: {
    //       wishlist: data,
    //     },
    //   }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoGrid);
