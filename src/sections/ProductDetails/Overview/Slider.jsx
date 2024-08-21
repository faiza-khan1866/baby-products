import React, { useRef, useState } from "react";
import ImageGallery from "react-image-gallery";

import Lightbox from "react-image-lightbox";
import { SRLWrapper, useLightbox } from "simple-react-lightbox"; // NEW IMPLEMENTATION
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
// import LazyLoad from 'react-lazyload';

function OverviewSlider(props) {
  const { openLightbox } = useLightbox();
  const galleryRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [mainSrc, setMainSrc] = useState(props.sliderImages?.[0]);
  const [showLightBox, setShowLightBox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  function _myImageGalleryRenderer(item) {
    // console.log("Slider images", item);
    // debugger;
    return (
      <div className="image-gallery-image">
        {item.type && item.type === "video" ? (
          <iframe
            width="100%"
            height="465"
            src="https://www.youtube.com/embed/YEFg_HcyYt8"
            title="Electric Breast Pump Pro"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img
            src={item.original}
            alt={item.originalAlt}
            srcSet={item.srcSet}
            sizes={item.sizes}
            onClick={() => {
              openLightbox(currentIndex);
              setShowLightBox(!showLightBox);
              setPhotoIndex(currentIndex);
              setMainSrc(props.sliderImages?.[currentIndex]);
            }}
            // onLoad={this.props.onImageLoad}
            // onError={onImageError.bind(this)}
          />
        )}
      </div>
    );
  }
  return (
    <>
      <div className="overview-slider">
        {props.sliderImages && (
          <ImageGallery
            ref={galleryRef}
            items={props.sliderImages}
            onSlide={(index) => setCurrentIndex(index)}
            thumbnailPosition="left"
            showPlayButton={false}
            showFullscreenButton={false}
            showNav={false}
            infinite={true}
            renderItem={_myImageGalleryRenderer}
            onImageError={(err) => {
              console.log(err);
            }}
          />
        )}

        <BsFillCaretUpFill
          onClick={(index) => galleryRef.current.slideToIndex(currentIndex + 1)}
          fontSize="32px"
          className="ctrl-button prev"
        />
        <BsFillCaretDownFill
          onClick={(index) => galleryRef.current.slideToIndex(currentIndex - 1)}
          fontSize="32px"
          className="ctrl-button next"
        />
      </div>

      {showLightBox && 0 > 1 && (
        <Lightbox
          mainSrc={mainSrc?.original}
          enableZoom={true}
          clickOutsideToClose={true}
          onCloseRequest={() => setShowLightBox(false)}
          nextSrc={
            props.sliderImages?.[(photoIndex + 1) % props.sliderImages?.length]
              ?.original
          }
          prevSrc={
            props.sliderImages?.[
              (photoIndex + props.sliderImages?.length - 1) %
                props.sliderImages?.length
            ]?.original
          }
          onMovePrevRequest={() => {
            setPhotoIndex(
              (photoIndex + props.sliderImages?.length - 1) %
                props.sliderImages?.length
            );
            setMainSrc(
              props.sliderImages?.[
                (photoIndex + props.sliderImages?.length - 1) %
                  props.sliderImages?.length
              ]
            );
          }}
          onMoveNextRequest={() => {
            setPhotoIndex((photoIndex + 1) % props.sliderImages?.length);
            setMainSrc(
              props.sliderImages?.[
                (photoIndex + 1) % props.sliderImages?.length
              ]
            );
          }}
        />
      )}
      <div
        style={{
          visibility: "hidden",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <SRLWrapper
          options={{
            buttons: {
              showDownloadButton: false,
              showAutoplayButton: false,
              showThumbnailsButton: false,
              disablePanzoom: true,
            },
            thumbnails: {
              showThumbnails: false,
            },
          }}
        >
          {props.sliderImages?.map((item, index) => {
            return (
              <span key={index}>
                {item.type && item.type === "video" ? (
                  <iframe
                    width="100%"
                    height="465"
                    src="https://www.youtube.com/embed/YEFg_HcyYt8"
                    title="Electric Breast Pump Pro"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={item.original}
                    alt={item.originalAlt || ""}
                    onClick={() => {
                      setShowLightBox(!showLightBox);
                      setPhotoIndex(currentIndex);
                      setMainSrc(props.sliderImages?.[currentIndex]);
                    }}
                    // onLoad={this.props.onImageLoad}
                    // onError={onImageError.bind(this)}
                  />
                )}
              </span>
            );
          })}
        </SRLWrapper>
      </div>
    </>
  );
}

export default OverviewSlider;
