import React, { useEffect } from "react";
import { Badge } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";
import { useHistory } from "react-router-dom";
import SwalToast from "../../sections/Swal/SwalToast";
import { API } from "../../http/API";
// import { GrYoutube, GrFacebook, GrInstagram } from "react-icons/gr";
import {
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import {
  FacebookShareButton,
  PinterestShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import ButtonTheme from "../ButtonTheme";
import { connect } from "react-redux";

function WishlistCard(props) {
  let { swalMsg, emptySwal } = props;
  const history = useHistory();

  useEffect(() => {
    if (
      swalMsg &&
      (swalMsg == "Product removed from cart" ||
        swalMsg == "Product added to wishlist")
    ) {
      emptySwal();
      if (props.global?.activeLanguage == "ar") {
        if (swalMsg == "Product removed from cart") {
          SwalToast.fire({
            title: "تمت إزالة المنتج من سلة التسوق",
            icon: "success",
          });
        } else if (swalMsg == "Product added to wishlist") {
          SwalToast.fire({
            icon: "success",
            title: "تمت إضافة المنتج إلى قائمة الرغبات",
          });
        }
      } else {
        SwalToast.fire({
          icon: "success",
          title: swalMsg,
        });
      }
    }
  }, [swalMsg]);

  const addToCart = () => {
    // console.log("props wishlist ::", props);

    let product_id = props._id;
    let productName = props.name
      ? props.name
      : props.productName
      ? props.productName
      : "";
    let productArabicName = props.arabic?.name
      ? productArabicName
      : props.productArabicName
      ? props.productArabicName
      : "";
    let variation = props.variation ? props.variation : "";
    let arabicVariation = props.arabicVariation ? props.arabicVariation : "";
    let price = props.price ? props.price : 0;
    let arabicPrice = props.arabicPrice ? props.arabicPrice : 0;
    let quantity = props.quantity;
    let productCode = props.productCode ? props.productCode : "";
    let englishImage = props.englishImage ? props.englishImage : "";
    let arabicImage = props.arabicImage ? props.arabicImage : "";

    let cart = {
      product_id,
      productName,
      productArabicName,
      variation,
      arabicVariation,
      price,
      arabicPrice,
      englishImage,
      arabicImage,
      productCode,
      quantity,
    };
    props.add_cart_product(cart);
    props.onDelete(props._id);

    // if (activeVariant) {
    //   // console.log(activeVariant)

    //   // if (activeVariant?.variation_images) {

    //   //   imageObject = activeVariant.variation_images.find((x) => x.is_default === true)
    //   //   englishImage = imageObject.image ? imageObject.image : activeVariant.variation_images[0] ? activeVariant.variation_images[0] : ""
    //   // }
    //   /// arabic variation
    //   if (props.language == 'en') {

    //     variation = activeVariant.name
    //     price = activeVariant.variation_price ? activeVariant.variation_price : 0
    //     productCode = activeVariant.code
    //     imageObject = activeVariant.variation_images?.find((x) => x.is_default === true)
    //     englishImage = imageObject?.image ? imageObject.image : activeVariant.variation_images[0]?.image ? activeVariant.variation_images[0].image : ""
    //     console.log(props.arabic.variations)
    //     let arabicVarient = props.arabic.variations.find((x) => x.arabic_code === productCode)
    //     arabicVariation = arabicVarient.arabic_name
    //     imageObject = arabicVarient?.variation_images?.find((x) => x.is_default === true)
    //     arabicImage = imageObject?.image ? imageObject.image : arabicVarient?.variation_images[0].image ? arabicVarient.variation_images[0].image : ""
    //     arabicPrice = arabicVarient.arabic_variation_price ? arabicVarient.arabic_variation_price : price
    //   } else {
    //     console.log("===activeVariant")
    //     console.log(activeVariant)
    //     console.log(props.variations)
    //     let englishVarient = props.variations.find((x) => x.code === activeVariant.arabic_code)
    //     console.log("===englishVariient")
    //     console.log(englishVarient)

    //     variation = englishVarient.name
    //     price = englishVarient.variation_price ? englishVarient.variation_price : 0
    //     productCode = englishVarient.code
    //     imageObject = englishVarient.variation_images?.find((x) => x.is_default === true)
    //     englishImage = imageObject?.image ? imageObject.image : englishVarient.variation_images[0]?.image ? englishVarient.variation_images[0].image : ""
    //     let arabicVarient = activeVariant
    //     arabicVariation = arabicVarient.arabic_name
    //     console.log("===arabicVariation")
    //     console.log(arabicVarient)
    //     // return false;
    //     if (arabicVarient.variation_images?.length > 0) {
    //       imageObject = arabicVarient.variation_images?.length > 0 && arabicVarient.variation_images?.find((x) => x.is_default === true)
    //       arabicImage = imageObject?.image ? imageObject.image : arabicVarient?.variation_images[0].image ? arabicVarient.variation_images[0].image : ""
    //     }

    //     arabicPrice = arabicVarient.arabic_variation_price ? arabicVarient.arabic_variation_price : price
    //   }

    // } else {

    //   price = props.default_price ? props.default_price : 0
    //   arabicPrice = props.arabic.arabicPrice ? props.arabic.arabicPrice : price
    //   productCode = props_code
    //   imageObject = props.single_default_images.find((x) => x.is_default === true)
    //   englishImage = imageObject?.image ? imageObject?.image : ""

    //   imageObject = props.arabic.images_list.find((x) => x.is_default === true)
    //   arabicImage = imageObject?.image ? imageObject?.image : ""
    // }

    // price = Number(price)
    // arabicPrice = Number(arabicPrice)
    // quantity = Number(quantity)
  };

  return (
    <div className="wishlist-card">
      <TiDelete
        className="remove-icon"
        onClick={() => props.onDelete(props._id)}
      />
      <div className="image">
        <img
          src={
            props.global.activeLanguage == "en"
              ? process.env.REACT_APP_IMAGE_BASE_URL + props?.englishImage
              : process.env.REACT_APP_IMAGE_BASE_URL + props?.arabicImage
          }
          alt=""
        />
      </div>
      <div className="details">
        <h5 className="name">
          {props.global.activeLanguage == "en"
            ? props?.productName
            : props?.productArabicName}
        </h5>
        {/* <Badge variant="primary">{props.global.activeLanguage == 'en' ? props?.categories.name : props?.categories.arabic.name}</Badge> */}
        <p className="description m-0">
          {props.global.activeLanguage == "en"
            ? props?.variation
            : props?.arabicVariation}
        </p>
        <div className="logos-wrap">
          <div className="text-logo">
            {props?.tags?.map((x) => (
              <span className="badge badge-secondary">{x}</span>
            ))}
          </div>
          {/* <div className="text-logo" style={{ borderLeft: "none" }}>
            <span className="badge badge-secondary">BPA FREE</span>
          </div>
          <div className="text-logo" style={{ borderRight: "none" }}>
            <span className="badge badge-secondary">ELECTRIC</span>
          </div> */}
        </div>
      </div>
      <div className="buttons">
        <div className="simple-buttons">
          <div className="view">
            <ButtonTheme
              variant="primary"
              size="sm"
              outline
              onClick={() => {
                history.push(
                  `/${
                    props.global?.activeLanguage
                  }/product/${encodeURIComponent(props?.route)}`
                );
              }}
            >
              {props.global.activeLanguage == "en"
                ? "View Details"
                : "عرض التفاصيل"}
            </ButtonTheme>
          </div>
          <div className="buy">
            <ButtonTheme variant="primary" size="sm" onClick={addToCart}>
              {props.global?.activeLanguage == "en" ? "Add to Cart" : "شراء"}
            </ButtonTheme>
          </div>
        </div>
        <div className="social-buttons">
          <small className="m-2">
            {props.global?.activeLanguage == "en" ? "Share to" : "مشاركة"}
          </small>
          {/* <GrFacebook className="facebook" />
          <GrInstagram className="instagram mx-2" />
          <GrYoutube className="youtube" /> */}
          <LinkedinShareButton
            url={`https://www.pigeonarabia.com/${props.global?.activeLanguage}/products`}
            title={"Pigeon Global"}
            source={`https://www.pigeonarabia.com/${
              props.global?.activeLanguage
            }/product/${encodeURIComponent(props.route)}`}
            summary={`Check out our latest products here:
                      \n
                      https://www.pigeonarabia.com/${props.global?.activeLanguage}/mother-baby-products
                      `}
          >
            <FaLinkedinIn className="social-icon" />
          </LinkedinShareButton>
          <FacebookShareButton
            url={`https://www.pigeonarabia.com/${
              props.global?.activeLanguage
            }/product/${encodeURIComponent(props.route)}`}
            quote={`Check out our latest products here:
                      \n
                      https://www.pigeonarabia.com/${props.global?.activeLanguage}/mother-baby-products
                      `}
            hashtag={"#pigeon"}
          >
            <FaFacebookF className="social-icon" />
          </FacebookShareButton>
          <TwitterShareButton
            url={`https://www.pigeonarabia.com/${
              props.global?.activeLanguage
            }/product/${encodeURIComponent(props.route)}`}
            title={props.name || "Pigeon Global"}
            hashtags={["pigeon", "pigeon_arabia"]}
          >
            <FaTwitter className="social-icon" />
          </TwitterShareButton>
          <PinterestShareButton
            media={props.featured_img}
            url={`https://www.pigeonarabia.com/${
              props.global?.activeLanguage
            }/product/${encodeURIComponent(props.route)}`}
            description={`Check out our latest products here:
                    \n
                    www.pigeonarabia.com/${props.global?.activeLanguage}/mother-baby-products
                    `}
          >
            <FaPinterestP className="social-icon" />
          </PinterestShareButton>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
    swalMsg: state.cartReducer.swalMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_cart_product: (cart) =>
      dispatch({
        type: "ADD_PRODUCT_C",
        data: cart,
      }),
    emptySwal: (cart) =>
      dispatch({
        type: "EMPTY_SWAL",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistCard);
