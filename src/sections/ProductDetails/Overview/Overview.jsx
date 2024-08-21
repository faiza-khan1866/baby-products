import React, { useEffect, useReducer, useState, useRef } from "react";

import { connect } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import Toast from "react-bootstrap/Toast";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/BounceLoader";
// import { GrFacebook } from "react-icons/gr";
import {
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import ButtonTheme from "../../../components/ButtonTheme";
import OverviewSlider from "./Slider";
import { useHistory } from "react-router-dom";
import {
  FacebookShareButton,
  PinterestShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { API } from "../../../http/API";
import Review from "../../../components/Modals/Review/Review";
import { Helmet } from "react-helmet";
import { LinkContainer } from "react-router-bootstrap";
import DeliveryCharges from "../../../assets/icons/Delivery-charges.png";

const Toast2 = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const Overview = (props) => {
  const { swalMsg, emptySwal, newStructure } = props;
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [activeVariant, setActiveVariant] = useState(null);
  const [activeVariantSetting, setActiveVariantSetting] = useState({
    size: "",
    color: "",
    decoration: "",
    index: 0,
  });
  const [variationColors, setVariationColors] = useState([]);
  const [variationDecorations, setVariationDecorations] = useState([]);
  const [metaTags, setMetaTags] = useState({
    title: "",
    url: "",
    image: "",
    description: "",
  });
  const [value, setIncrement] = useState(1);
  const incrementClicks = (v) => {
    if (v >= 10) {
      return false;
    } else {
      setIncrement(v + 1);
    }
  };

  const decrementClicks = (v) => {
    if (value > 1) {
      setIncrement(v - 1);
    }
  };

  useEffect(() => {
    if (!swalMsg || swalMsg == "" || swalMsg == "Product removed from Cart") {
    } else {
      let msg = swalMsg;

      let icon = "success";
      if (msg == "Product Already Exists in Cart") {
        icon = "warning";
      }
      emptySwal();

      Swal.fire({
        icon: icon,
        text: msg,
        showCancelButton: true,
        confirmButtonText: "Checkout",
        confirmButtonColor: "#e65550",
        cancelButtonText: `Continue Shopping`,
        cancelButtonColor: "#fff",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          history.push(`/${props.global.activeLanguage}/cart`);
        }
      });
    }
  }, [swalMsg]);

  useEffect(() => {
    if (props.language == "en") {
      if (props.variations?.length > 0) {
        setVarientWithConfig();
      } else {
        setActiveVariant(null);
      }
    }
    if (props.language == "ar") {
      if (props.arabic?.variations?.length > 0) {
        setVarientWithConfigArabic();
      } else {
        setActiveVariant(null);
      }
    }
  }, [props.variations, props.language]);

  useEffect(() => {
    <Helmet>
      <meta
        property="og:url"
        content={`https://www.pigeonarabia.com/${props.global.activeLanguage}/product/${props.route}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Your Website Title" />
      <meta property="og:description" content="Your description" />
      <meta
        property="og:image"
        content="https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FBreast%20Pump%20pro%20new%201.jpeg"
      />
    </Helmet>;
  }, []);

  const addActiveVarient = (tempObj) => {
    let data = newStructure?.variations[tempObj.nameindex];

    let color = tempObj.color ? tempObj.color : "";
    let decoration = tempObj?.decoration ? tempObj?.decoration : "";
    let name = tempObj.name ? tempObj.name : "";
    let result = {};

    result = data?.items?.filter((item) => {
      if (decoration && color) {
        if (item.color_code == decoration && item.color == color) {
          return true;
        }
      } else if (color) {
        if (item.color == color) {
          return true;
        }
      } else if (decoration) {
        if (item.color_code == decoration) {
          return true;
        }
      } else {
        if (item.name == name && !decoration && !color) {
          return true;
        }
      }
    });
    if (result.length > 0) {
      let activeVariant = JSON.parse(JSON.stringify(result[0]));
      setActiveVariant(activeVariant);
    }
  };

  const addActiveVarientArabic = (tempObj) => {
    let data = newStructure?.arabic.variations[tempObj.nameindex];
    let color = tempObj.color ? tempObj.color : "";
    let decoration = tempObj?.decoration ? tempObj?.decoration : "";
    let result = {};
    if (decoration || color) {
      result = data?.items?.find((item) => {
        if (decoration && color) {
          if (item.color_code == decoration && item.color == color) {
            return true;
          }
        } else if (color) {
          if (item.color == color) {
            return true;
          }
        } else if (decoration) {
          if (item.color_code == decoration) {
            return true;
          }
        }
      });
    } else {
      result = data.items[0];
    }
    if (result) {
      setActiveVariant(result);
    }
  };

  const handleVariationChange = (e) => {
    let size = e.target[e.target.selectedIndex].getAttribute("data-size");
    let color = e.target[e.target.selectedIndex].getAttribute("data-color");
    let decoration =
      e.target[e.target.selectedIndex].getAttribute("data-decoration");
    let lang = e.target[e.target.selectedIndex].getAttribute("data-lang");
    let colorChange =
      e.target[e.target.selectedIndex].getAttribute("data-colorChange");
    let decorationChange = e.target[e.target.selectedIndex].getAttribute(
      "data-decorationChange"
    );
    let dec = false;
    if (decorationChange === "true") {
      dec = true;
    }

    if (lang == "ar") {
      setVarientWithConfigArabic(
        size,
        color,
        decoration,
        colorChange,
        dec,
        false
      );
    } else {
      setVarientWithConfig(size, color, decoration, colorChange, dec, false);
    }
  };

  const setVarientWithConfig = (
    index = 0,
    colorindex = 0,
    decorationindex = 0,
    colorChange = false,
    decorationChange = false,
    sizeChange = false
  ) => {
    let tmpobj = {
      name: newStructure?.variations[index]?.name,
      nameindex: index,
    };

    if (newStructure?.variations[index]?.colors.length > 0) {
      setVariationColors(newStructure.variations[index]?.colors);
      if (sizeChange) {
        tmpobj.colorindex = 0;
        tmpobj.color = newStructure.variations[index]?.colors[0];
        newStructure.variations[index]?.colors.forEach((element, ind) => {
          if (element === activeVariantSetting.color) {
            tmpobj.colorindex = ind;
            tmpobj.color = element;
          }
        });

        // tmpobj.color = newStructure.variations[index]?.colors[colorindex];
        // tmpobj.colorindex = colorindex;
      } else {
        tmpobj.color = newStructure.variations[index]?.colors[colorindex];
        tmpobj.colorindex = colorindex;
      }
    } else {
      setVariationColors([]);
    }

    const result = newStructure.variations[index].items.filter(
      (item) => item.color == newStructure.variations[index]?.colors[colorindex]
    );
    let a = [];
    if (result.length > 0) {
      result.forEach((element, index) => {
        if (element.color_code && !a.includes(element.color_code)) {
          a.push(element.color_code);
        }
      });

      if (sizeChange) {
        tmpobj.decorationindex = 0;
        tmpobj.decoration = a[0];
        a.forEach((element, ind) => {
          if (element === activeVariantSetting?.decoration) {
            tmpobj.decorationindex = ind;
            tmpobj.decoration = element;
          }
        });
      } else {
        tmpobj.decorationindex = decorationindex;
        tmpobj.decoration = a[decorationindex];
      }
      setVariationDecorations(a);
    }
    if (decorationChange) {
      if (variationDecorations.length > decorationindex) {
        tmpobj.decoration = variationDecorations[decorationindex];
        tmpobj.decorationindex = decorationindex;
      }
    }
    setActiveVariantSetting(tmpobj);
    addActiveVarient(tmpobj);
  };

  const setVarientWithConfigArabic = (
    index = 0,
    colorindex = 0,
    decorationindex = 0,
    colorChange = false,
    decorationChange = false
  ) => {
    let tmpobj = {
      name: newStructure?.arabic.variations[index]?.name,
      nameindex: index,
    };
    // for (var prop in newStructure.arabic.variations) {
    if (newStructure?.arabic.variations[index]?.colors.length > 0) {
      setVariationColors(newStructure.arabic.variations[index]?.colors);
      // setActiveColor(newStructure.arabic.variations[prop]?.colors[0])
      tmpobj.color = newStructure.arabic.variations[index]?.colors[colorindex];
      tmpobj.colorindex = colorindex;
    } else {
      setVariationColors([]);
    }

    // if(colorChange){
    const result = newStructure.arabic.variations[index].items.filter(
      (item) =>
        item.color == newStructure.arabic.variations[index]?.colors[colorindex]
    );
    let ab = [];
    if (result.length > 0) {
      result.forEach((element, index) => {
        if (element.color_code && !ab.includes(element.color_code)) {
          ab.push(element.color_code);
        }
      });

      tmpobj.decorationindex = decorationindex;
      tmpobj.decoration = ab[decorationindex];
      setVariationDecorations(ab);
    }

    if (decorationChange) {
      if (variationDecorations.length > decorationindex) {
        tmpobj.decoration = variationDecorations[decorationindex];
        tmpobj.decorationindex = decorationindex;
      }
    }

    setActiveVariantSetting(tmpobj);
    addActiveVarientArabic(tmpobj);
  };

  useEffect(() => {
    if (props.language == "en") {
      if (newStructure?.variations.length > 0) {
        setVarientWithConfig();
      } else {
      }
    }
    if (props.language == "ar") {
      if (newStructure?.arabic?.variations?.length > 0) {
        setVarientWithConfigArabic();
      } else {
        // setActiveVariant(null);
      }
    }
  }, [newStructure, props.language]);

  useEffect(() => {
    setMetaTags({
      ...metaTags,
      title: props.name || "Pigeon Global",
      url: `https://www.pigeonarabia.com/${
        props.global.activeLanguage
      }/product/${props.route || ""}`,
      image: props.featured_img || "",
      description: props.short_description || "",
    });
  }, [props]);

  const addToWishlist = () => {
    // alert("Added to wishlist")

    const product = createCartObject();

    let config = {
      headers: {
        Authorization: `Bearer ${props.user?.accessToken}`,
      },
      params: {
        user_id: props.user?.loggedInUser?._id,
      },
    };

    API.post(
      "/auth/wishlist",
      {
        user_id: props.user?.loggedInUser?._id,
        product,
      },
      {
        headers: {
          Authorization: `Bearer ${props.user?.accessToken}`,
        },
      }
    )
      .then((response) => {
        API.get(`/auth/wishlist`, config).then((response) => {
          props.wishlistSuccess(response.data);

          if (props.global?.activeLanguage == "ar") {
            Toast2.fire({
              title: "تمت إضافة المنتج إلى قائمة الرغبات",
              icon: "success",
            });
          } else {
            Toast2.fire({
              icon: "success",
              title: "Product added To wishlist",
            });
          }
        });
      })
      .catch(function (error) {});
  };

  const addToCart = () => {
    let cart = createCartObject();
    cart.invoker = "cart";
    props.add_cart_product(cart);
    let price =
      cart?.discounted_price > 0 ? cart?.discounted_price : cart?.price;

    if (typeof window !== "undefined") {
      if (window.fbq != null) {
        window.fbq("track", "AddToCart", { currency: "AED", value: price });
      }
      if (window.snaptr != null) {
        window.snaptr("track", "ADD_CART", { currency: "AED", value: price });
      }
      if (window.dataLayer != null) {
        // Measure adding a product to a shopping cart by using an 'add' actionFieldObject
        // and a list of productFieldObjects.
        window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
        window.dataLayer.push({
          event: "addToCart",
          ecommerce: {
            currencyCode: "AED",
            add: {
              actionField: {
                list: "Shopping cart",
              },
              products: [
                {
                  //  adding a product to a shopping cart.
                  name: `${cart?.productName}`,
                  id: `${cart?.product_id}`,
                  price: `${
                    cart?.discounted_price > 0
                      ? cart?.discounted_price
                      : cart?.price
                  }`,
                  brand: "Pigeon Arabia",
                  category: `${cart?.productCategory}`,
                  variant: `${cart?.variation}`,
                  quantity: `${cart?.quantity}`,
                },
              ],
            },
          },
        });
      }
    }
  };

  const proceedToCheckout = () => {
    let cart = createCartObject();
    cart.invoker = "checkout";
    props.add_cart_product(cart);
    // let price = cart.discounted_price > 0 ? cart.discounted_price : cart.price
    // if (typeof window !== "undefined") {
    //   console.log("window.fbq",window.fbq)
    //   if (window.fbq != null) {
    //     window.fbq('track', 'InitiateCheckout', {currency: "AED", value: price})
    //   }
    // }
  };
  {
    console.log("category", props);
  }

  const createCartObject = () => {
    let product_id = newStructure?._id;
    let productName = newStructure?.name;
    let productArabicName = newStructure?.arabic?.name;
    let variation = "";
    let arabicVariation = "";
    let price = 0;
    let discounted_price = 0;
    let arabicPrice = 0;
    let quantity = value;
    let productCode = "";
    let color = newStructure?.color;
    let decoration = newStructure?.decoration;
    let arabicColor = "";
    let arabicDecoration = "";
    let imageObject = {};
    let englishImage = "";
    let arabicImage = "";
    let route = props?.route;
    let productCategory = newStructure?.category_data?.name || "";
    let productSubCategory = newStructure?.sub_category || "";
    let productBarcode = newStructure?.barcode || "";
    let productDiscount = newStructure?.discount || 0;
    // let productBarcode = newStructure?.barcode || "";
    let englishVarient = {};
    let arabicVarient = {};
    if (activeVariant) {
      if (props.language == "en") {
        englishVarient = activeVariant;
        variation = activeVariant.name;
        price = activeVariant.variation_price
          ? activeVariant.variation_price
          : 0;
        discounted_price = activeVariant?.variation_discounted_price
          ? activeVariant.variation_discounted_price
          : 0;
        productCode = activeVariant.code;
        productBarcode = activeVariant.barcode || "";
        productDiscount = activeVariant.variation_discount || 0;
        color = activeVariant.color ? activeVariant.color : "";
        decoration = activeVariant?.decoration ? activeVariant?.decoration : "";
        imageObject = activeVariant.variation_images?.find(
          (x) => x.is_default === true
        );
        englishImage = imageObject?.image
          ? imageObject.image
          : activeVariant.variation_images[0]?.image
          ? activeVariant.variation_images[0].image
          : "";
        arabicVarient = props.arabic.variations.find(
          (x) => x.arabic_code === productCode
        );

        arabicColor = arabicVarient?.color ? arabicVarient.color : "";
        arabicDecoration = arabicVarient?.decoration
          ? arabicVarient?.decoration
          : "";
        arabicVariation = arabicVarient.arabic_name;
        imageObject = arabicVarient?.variation_images?.find(
          (x) => x.is_default === true
        );
        arabicImage = imageObject?.image
          ? imageObject.image
          : arabicVarient?.variation_images[0].image
          ? arabicVarient.variation_images[0].image
          : "";
        arabicPrice = arabicVarient.arabic_variation_price
          ? arabicVarient.arabic_variation_price
          : price;
      } else {
        englishVarient = props.variations.find(
          (x) => x.code === activeVariant.arabic_code
        );
        productDiscount = englishVarient.variation_discount || 0;
        productBarcode = englishVarient.barcode || "";
        color = englishVarient.color ? englishVarient.color : "";
        decoration = englishVarient?.decoration
          ? englishVarient?.decoration
          : "";
        arabicColor = activeVariant.color ? activeVariant.color : "";
        arabicDecoration = activeVariant?.decoration
          ? activeVariant?.decoration
          : "";
        variation = englishVarient.name;
        price = englishVarient.variation_price
          ? englishVarient.variation_price
          : 0;
        discounted_price = activeVariant?.variation_discounted_price
          ? activeVariant.variation_discounted_price
          : 0;
        productCode = englishVarient.code;
        imageObject = englishVarient.variation_images?.find(
          (x) => x.is_default === true
        );
        englishImage = imageObject?.image
          ? imageObject.image
          : englishVarient.variation_images[0]?.image
          ? englishVarient.variation_images[0].image
          : "";
        arabicVarient = activeVariant;
        arabicVariation = arabicVarient.arabic_name;
        if (arabicVarient.variation_images?.length > 0) {
          imageObject =
            arabicVarient.variation_images?.length > 0 &&
            arabicVarient.variation_images?.find((x) => x.is_default === true);
          arabicImage = imageObject?.image
            ? imageObject.image
            : arabicVarient?.variation_images[0].image
            ? arabicVarient.variation_images[0].image
            : "";
        }

        arabicPrice = arabicVarient.arabic_variation_price
          ? arabicVarient.arabic_variation_price
          : price;
      }
    } else {
      price = props.default_price ? props.default_price : 0;
      discounted_price = props?.discounted_price ? props?.discounted_price : 0;
      arabicPrice = props.arabic.arabicPrice ? props.arabic.arabicPrice : price;
      productCode = props.product_code;
      imageObject = props.single_default_images.find(
        (x) => x.is_default === true
      );
      englishImage = imageObject?.image
        ? imageObject?.image
        : props.single_default_images[0]?.image;

      imageObject = props.arabic.images_list.find((x) => x.is_default === true);
      arabicImage = imageObject?.image
        ? imageObject?.image
        : props.arabic.images_list[0].image;
    }

    price = Number(price);
    discounted_price = Number(discounted_price);
    productDiscount = Number(productDiscount);
    arabicPrice = Number(arabicPrice);
    quantity = Number(quantity);
    englishVarient = JSON.stringify(englishVarient);
    arabicVarient = JSON.stringify(arabicVarient);
    let cart = {
      englishVarient,
      arabicVarient,
      product_id,
      productName,
      productArabicName,
      variation,
      arabicVariation,
      price,
      discounted_price,
      arabicPrice,
      englishImage,
      arabicImage,
      productCode,
      quantity,
      route,
      color,
      arabicColor,
      decoration,
      arabicDecoration,
      productBarcode,
      productDiscount,
      productCategory,
    };

    return cart;
  };

  const getSliderImages = () => {
    if (!props.isArabic) {
      if (activeVariant?.name && props.is_new != 1) {
        return props.variation_images
          ?.filter((x) => x.variation === activeVariant.name)
          ?.sort(function (a, b) {
            return a.is_default || false - b.is_default || false;
          })
          ?.reverse()
          .map((x) => {
            return {
              original: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
              thumbnail: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
              thumbnailClass: "thumbnail-override",
              originalClass: "image-override",
              description: "",
            };
          });
      } else if (activeVariant?.name && props.is_new == 1) {
        let temp = props.variations?.filter(
          (x) => x.name === activeVariant.name
        );
        return activeVariant?.variation_images
          ?.sort(function (a, b) {
            return a.is_default || false - b.is_default || false;
          })
          ?.reverse()
          .map((x) => {
            return {
              original: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
              thumbnail: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
              thumbnailClass: "thumbnail-override",
              originalClass: "image-override",
              description: "",
            };
          });
      } else {
        return props.single_default_images
          ?.sort(function (a, b) {
            return a.is_default - b.is_default;
          })
          ?.reverse()
          ?.map((x) => {
            return {
              original: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
              thumbnail: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
              thumbnailClass: "thumbnail-override",
              originalClass: "image-override",
              description: "",
            };
          });
      }
    } else {
      if (activeVariant?.arabic_name && props.is_new != 1) {
        return props.variation_images
          ?.filter((x) => x.variation === activeVariant.name)
          ?.sort(function (a, b) {
            return a.is_default || false - b.is_default || false;
          })
          ?.reverse()
          .map((x) => {
            return {
              original: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
              thumbnail: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
              thumbnailClass: "thumbnail-override",
              originalClass: "image-override",
              description: "",
            };
          });
      } else if (activeVariant?.arabic_name && props.is_new == 1) {
        let temp = props.arabic.variations?.filter(
          (x) => x.arabic_name === activeVariant.arabic_name
        );

        return activeVariant?.variation_images
          ?.sort(function (a, b) {
            return a.is_default || false - b.is_default || false;
          })
          ?.reverse()
          .map((x) => {
            return {
              original: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
              thumbnail: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
              thumbnailClass: "thumbnail-override",
              originalClass: "image-override",
              description: "",
            };
          });
      } else {
        if (props.arabic?.images_list) {
          return props.arabic?.images_list
            ?.sort(function (a, b) {
              return a.is_default - b.is_default;
            })
            ?.reverse()
            ?.map((x) => {
              return {
                original: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
                thumbnail: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
                thumbnailClass: "thumbnail-override",
                originalClass: "image-override",
                description: "",
              };
            });
        } else {
          return props.single_default_images
            ?.sort(function (a, b) {
              return a.is_default - b.is_default;
            })
            ?.reverse()
            ?.map((x) => {
              return {
                original: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
                thumbnail: process.env.REACT_APP_IMAGE_BASE_URL + x.image,
                thumbnailClass: "thumbnail-override",
                originalClass: "image-override",
                description: "",
              };
            });
        }
      }
    }
  };

  return (
    <div className="overview">
      <Container fluid>
        {props.name && props.showProduct ? (
          <Row>
            <Col md={7}>
              <OverviewSlider
                featureImage={props.featured_img}
                sliderImages={getSliderImages()}
                video={props.video_link}
              />
            </Col>
            <Col md={5}>
              <div className="pr-sm-4">
                <div className="text-wrap ========">
                  {props.isArabic ? (
                    <h3 className="product-title">
                      {`${
                        props.isArabic
                          ? props.arabic?.name || ""
                          : props.name || ""
                      } ${activeVariant?.arabic_name ? "-" : ""}  ${
                        activeVariant?.arabic_name || ""
                      }`}
                    </h3>
                  ) : (
                    <h3 className="product-title">{`${
                      props.isArabic
                        ? props.arabic?.name || ""
                        : props.name || ""
                    } ${activeVariant?.name ? "-" : ""}  ${
                      activeVariant?.name || ""
                    }`}</h3>
                  )}
                  <div className="d-flex align-items-center"></div>
                  <div
                    className="short-desc short-desc-custom"
                    dangerouslySetInnerHTML={{
                      __html: props.isArabic
                        ? props.arabic?.short_description
                        : props.short_description,
                    }}
                  ></div>
                </div>
                <p className="mb-0 product-code product-code-custom">
                  <span style={{ fontWeight: "bold" }}>
                    {props.language == "en" ? "Product Code:" : "رمز المنتج:"}
                  </span>{" "}
                  {activeVariant?.code || props.product_code}
                </p>
                {newStructure && (
                  <div className="product_price">
                    {newStructure?.variations?.length > 0 && (
                      <>
                        {activeVariant &&
                        Number(activeVariant?.variation_stock) > 0 ? (
                          <>
                            {!activeVariant?.variation_discounted_price > 0 &&
                              activeVariant?.variation_price && (
                                <h6 className="regular-price-h6">
                                  <span className="currency">
                                    {props.language == "en" ? "AED" : "درهم"}{" "}
                                  </span>
                                  <span className="regular-price">
                                    {Number(
                                      activeVariant?.variation_price
                                    ).toFixed(2)}
                                  </span>
                                </h6>
                              )}
                            {activeVariant?.variation_discounted_price > 0 && (
                              <h6 className="discounted-price-h6">
                                <span className="currency">
                                  {props.language == "en" ? "AED" : "درهم"}{" "}
                                </span>
                                <span className="discounted-price-number">
                                  {activeVariant?.variation_discounted_price
                                    ? Number(
                                        activeVariant.variation_discounted_price
                                      ).toFixed(2)
                                    : activeVariant?.variation_price
                                    ? Number(
                                        activeVariant.variation_price
                                      ).toFixed(2)
                                    : activeVariant?.arabic_variation_price
                                    ? Number(
                                        activeVariant?.arabic_variation_price
                                      ).toFixed(2)
                                    : ""}
                                </span>
                              </h6>
                            )}
                            {activeVariant?.variation_discounted_price > 0 && (
                              <>
                                <h6 className="old-price-h6">
                                  <span className="currency">
                                    {props.language == "en" ? "AED" : "درهم"}{" "}
                                  </span>
                                  {Number(
                                    activeVariant?.variation_price
                                  ).toFixed(2)}{" "}
                                </h6>{" "}
                                {props.language == "en" ? (
                                  <span className="percentOff">
                                    {" "}
                                    {"( " +
                                      activeVariant.variation_discount +
                                      "% off )"}{" "}
                                  </span>
                                ) : (
                                  <span className="percentOff">
                                    {" "}
                                    {"( " +
                                      activeVariant.variation_discount +
                                      "% خصم )"}{" "}
                                  </span>
                                )}{" "}
                              </>
                            )}
                          </>
                        ) : (
                          <h6 className="out-of-stock-custom">
                            {!props.isArabic
                              ? "Out of Stock"
                              : "غير متوفر حالياً"}
                          </h6>
                        )}
                      </>
                    )}

                    {!newStructure?.variations?.length > 0 && (
                      <>
                        {!activeVariant &&
                        Number(newStructure?.default_stock) > 0 ? (
                          <>
                            {!activeVariant?.variation_discounted_price && (
                              <>
                                {activeVariant?.variation_price ? (
                                  <>
                                    <span className="currency">
                                      {props.language == "en" ? "AED" : "درهم"}{" "}
                                    </span>
                                    {Number(
                                      activeVariant.variation_price
                                    ).toFixed(2)}
                                  </>
                                ) : activeVariant?.arabic_variation_price ? (
                                  <>
                                    <span className="currency">
                                      {props.language == "en" ? "AED" : "درهم"}{" "}
                                    </span>
                                    {Number(
                                      activeVariant?.arabic_variation_price
                                    ).toFixed(2)}
                                  </>
                                ) : (
                                  <>
                                    {props?.newStructure?.discounted_price >
                                    0 ? (
                                      <h6 className="regular-price-h6">
                                        <span className="currency">
                                          {props.language == "en"
                                            ? "AED"
                                            : "درهم"}{" "}
                                        </span>
                                        <span className="regular-price">
                                          {Number(
                                            props?.newStructure
                                              ?.discounted_price
                                          ).toFixed(2)}
                                        </span>{" "}
                                      </h6>
                                    ) : (
                                      props?.default_price && (
                                        <h6 className="regular-price-h6">
                                          <span className="currency">
                                            {props.language == "en"
                                              ? "AED"
                                              : "درهم"}{" "}
                                          </span>
                                          <span className="regular-price">
                                            {Number(
                                              props.default_price
                                            ).toFixed(2)}
                                          </span>
                                        </h6>
                                      )
                                    )}
                                    {props?.newStructure?.discounted_price >
                                      0 && (
                                      <h6>
                                        <span className="old-price-h6">
                                          <span className="currency">
                                            {props.language == "en"
                                              ? "AED"
                                              : "درهم"}{" "}
                                          </span>
                                          {Number(
                                            props?.newStructure?.default_price
                                          ).toFixed(2)}{" "}
                                        </span>
                                        {props.language == "en" ? (
                                          <span className="percentOff">
                                            {" "}
                                            {"( " +
                                              props.discount +
                                              "% off )"}{" "}
                                          </span>
                                        ) : (
                                          <span className="percentOff">
                                            {" "}
                                            {"( " +
                                              props.discount +
                                              "% خصم )"}{" "}
                                          </span>
                                        )}
                                      </h6>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <h6 className="out-of-stock-custom">
                            {!props.isArabic
                              ? "Out of Stock"
                              : "غير متوفر حالياً"}
                          </h6>
                        )}
                      </>
                    )}
                  </div>
                )}
                <p className="inclusive-of-vat inclusive-of-vat-custom">
                  {props.language == "en"
                    ? "*All prices inclusive of VAT"
                    : "*جميع الأسعار شاملة ضريبة القيمة المضافة"}{" "}
                  <br />
                  <span className="free-delivery-message">
                    {!props.isArabic
                      ? "Free delivery above AED 99"
                      : "يتم دفع رسوم التوصيل على المشتريات الأقل من ٩٩ درهم"}
                  </span>
                </p>
                <div className="image-wrap">
                  {props.language === "ar"
                    ? activeVariant?.arabic_name
                      ? activeVariant?.arabic_sortings?.map((x, i) => (
                          <React.Fragment key={i}>
                            <div
                              className={`text-logo ${
                                props.language === "ar"
                                  ? "text-logo-Arabic"
                                  : ""
                              }`}
                            >
                              <span>{x}</span>
                            </div>
                          </React.Fragment>
                        ))
                      : props.arabic_tags?.map((x, i) => (
                          <React.Fragment key={i}>
                            <div
                              className={`text-logo ${
                                props.language === "ar"
                                  ? "text-logo-Arabic"
                                  : ""
                              }`}
                            >
                              <span>{x}</span>
                            </div>
                          </React.Fragment>
                        ))
                    : activeVariant?.name
                    ? activeVariant?.sortings?.map((x, i) => (
                        <React.Fragment key={i}>
                          <div
                            className={`text-logo ${
                              props.language === "ar" ? "text-logo-Arabic" : ""
                            }`}
                          >
                            <span>{x}</span>
                          </div>
                        </React.Fragment>
                      ))
                    : props.tags?.map((x, i) => (
                        <React.Fragment key={i}>
                          <div
                            className={`text-logo ${
                              props.language === "ar" ? "text-logo-Arabic" : ""
                            }`}
                          >
                            <span>{x}</span>
                          </div>
                        </React.Fragment>
                      ))}
                </div>
                <div className="variationsWraperMainDiv row">
                  {newStructure?.variations?.length > 0 && (
                    <div className="variations mt-3 d-flex variationWraper row">
                      <div className="variationWraperTitle variationWraperTitleSize col-xl-2 col-lg-3 col-md-3 col-sm-3 col-3">
                        {!props.isArabic &&
                          newStructure?.variations?.length > 0 && (
                            <span className="activeVariationSpan">
                              {!props.isArabic ? "Size:" : "الحجم:"}
                            </span>
                          )}
                        {props.isArabic &&
                          newStructure?.arabic?.variations?.length > 0 && (
                            <span className="activeVariationSpan">
                              {!props.isArabic ? "Size:" : "الحجم:"}
                            </span>
                          )}
                      </div>
                      <div className="variationWraperitemsDiv col-xl-10 col-lg-9 col-md-9 col-sm-9 col-9">
                        {!props.isArabic
                          ? newStructure?.variations?.length > 0 &&
                            newStructure.variations?.map((y, index) => (
                              // y.name !== "Flower Yellow" &&
                              <div
                                key={index}
                                className={`variation-item sizeBtn variationWraperitem ${
                                  activeVariantSetting.name == y.name
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() =>
                                  setVarientWithConfig(
                                    index,
                                    activeVariantSetting.colorindex,
                                    activeVariantSetting.decorationindex,
                                    false,
                                    false,
                                    true
                                  )
                                }
                              >
                                <small>
                                  {props.language === "ar"
                                    ? y.arabic_name
                                    : y.name}
                                </small>
                              </div>
                            ))
                          : newStructure?.arabic?.variations?.length > 0 &&
                            newStructure.arabic.variations
                              ?.filter((x) => x.name != null)
                              ?.map((y, index) => (
                                <div
                                  key={index}
                                  className={`variation-item sizeBtn ${
                                    activeVariantSetting?.name === y.name
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    setVarientWithConfigArabic(
                                      index,
                                      activeVariantSetting.colorindex,
                                      activeVariantSetting.decorationindex,
                                      false,
                                      false,
                                      true
                                    )
                                  }
                                >
                                  <small>{y.name}</small>
                                </div>
                              ))}
                      </div>
                    </div>
                  )}
                  {variationColors?.length > 0 && (
                    <div className="variations mt-3 d-flex variationWraper row">
                      <div className="variationWraperTitle variationWraperTitleColor col-xl-2 col-lg-3 col-md-3 col-sm-3 col-3">
                        {variationColors?.length > 0 && (
                          <span className="activeVariationSpan">
                            {!props.isArabic ? "Pattern:" : "الشكل:"}
                          </span>
                        )}
                      </div>
                      <div className="variationWraperitemsDiv variationWraperitemsDivColor col-xl-10 col-lg-9 col-md-9 col-sm-9 col-9">
                        <select
                          onChange={handleVariationChange}
                          className="variationSelect"
                        >
                          <option disabled selected value={""}>
                            {!props.isArabic
                              ? "Select the pattern"
                              : "حدد الالشكل"}
                          </option>
                          {!props.isArabic
                            ? variationColors?.length > 0 &&
                              variationColors?.map((y, index) => (
                                <option
                                  value={y.name}
                                  data-size={activeVariantSetting.nameindex}
                                  data-color={index}
                                  data-decoration={
                                    activeVariantSetting.decorationindex
                                  }
                                  data-colorChange={true}
                                  data-lang={"en"}
                                  data-decorationChange={false}
                                  selected={
                                    index == activeVariantSetting.colorindex
                                      ? "selected"
                                      : ""
                                  }
                                >
                                  {y}
                                </option>
                              ))
                            : variationColors?.length > 0 &&
                              variationColors
                                ?.filter((x) => x != null)
                                ?.map((y, index) => (
                                  <option
                                    key={index}
                                    value={y.name}
                                    data-size={activeVariantSetting.nameindex}
                                    data-color={index}
                                    data-decoration={
                                      activeVariantSetting.decorationindex
                                    }
                                    data-colorChange={true}
                                    data-lang={"ar"}
                                    data-decorationChange={false}
                                  >
                                    {y}
                                  </option>
                                ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {variationDecorations?.length > 0 && (
                    <div className="variations mt-3 d-flex variationWraper row">
                      <div className="variationWraperTitle variationWraperTitleSize col-xl-2 col-lg-3 col-md-3 col-sm-3 col-3">
                        {variationDecorations?.length > 0 && (
                          <span className="activeVariationSpan">
                            {!props.isArabic ? "Color:" : "اللون:"}
                          </span>
                        )}
                      </div>
                      <div className="variationWraperitemsDiv col-xl-10 col-lg-9 col-md-9 col-sm-9 col-9">
                        {!props.isArabic
                          ? variationDecorations?.length > 0 &&
                            variationDecorations?.map((y, index) => (
                              <div
                                key={index}
                                className={`variation-item variation-color ${
                                  activeVariantSetting?.decoration === y
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() =>
                                  setVarientWithConfig(
                                    activeVariantSetting.nameindex,
                                    activeVariantSetting.colorindex,
                                    index,
                                    false,
                                    true,
                                    false
                                  )
                                }
                                style={{
                                  color: props.language === "ar" ? y : y,
                                  backgroundColor:
                                    props.language === "ar" ? y : y,
                                }}
                              ></div>
                            ))
                          : variationDecorations?.length > 0 &&
                            variationDecorations
                              ?.filter((x) => x != null)
                              ?.map((y, index) => (
                                <div
                                  key={index}
                                  className={`variation-item variation-color ${
                                    activeVariantSetting?.decorationindex ==
                                    index
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    setVarientWithConfigArabic(
                                      activeVariantSetting.nameindex,
                                      activeVariantSetting.colorindex,
                                      index,
                                      false,
                                      true,
                                      false
                                    )
                                  }
                                  style={{
                                    color: props.language === "ar" ? y : y,
                                    backgroundColor:
                                      props.language === "ar" ? y : y,
                                  }}
                                ></div>
                              ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="variationsWraperMainDiv row">
                  <div className="variations mt-3 d-flex variationWraper row">
                    <div
                      className="variationWraperTitle variationWraperTitleSize quantity-label col-xl-2 col-lg-3 col-md-3 col-sm-3 col-3"
                      style={{ fontWeight: "400" }}
                    >
                      {props.language == "en" ? "Quantity:" : "الكميه:"}
                    </div>
                    <div className="variationWraperitemsDiv col-xl-10 col-lg-9 col-md-9 col-sm-9 col-9">
                      <div className="product_qyt">
                        <div className="quantity-input quantity-input-direction ">
                          <button
                            className="quantity-input__modifier quantity-input__modifier--left decrementButtonStyle quantity-button"
                            onClick={() => decrementClicks(value)}
                          >
                            &mdash;
                          </button>
                          <input
                            className="quantity-input__screen inputQuantityButton inputWidth quantity-display"
                            type="text"
                            value={value}
                            readOnly
                          />
                          <button
                            className="quantity-input__modifier quantity-input__modifier--right incrementButtonStyle quantity-button"
                            onClick={() => incrementClicks(value)}
                          >
                            &#xff0b;
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="buttons-wrap">
                  <div className="buy-favorite-btn">
                    <ButtonTheme
                      className="buy-now-btn"
                      outline
                      onClick={addToCart}
                      disabled={
                        newStructure?.variations.length > 0
                          ? Number(activeVariant?.variation_stock) < 1
                            ? true
                            : false
                          : newStructure?.default_stock &&
                            newStructure?.default_stock > 0
                          ? false
                          : true
                      }
                    >
                      {props.language == "en" ? "Add to Cart" : "أضف إلى السلة"}
                    </ButtonTheme>
                    <ButtonTheme
                      className="buy-now-btn buy_cart"
                      outline
                      onClick={() => {
                        proceedToCheckout();

                        history.push(`/${props.global?.activeLanguage}/cart`);
                      }}
                      disabled={
                        newStructure?.variations.length > 0
                          ? Number(activeVariant?.variation_stock) < 1
                            ? true
                            : false
                          : Number(newStructure?.default_stock) > 0
                          ? false
                          : true
                      }
                    >
                      {props.language == "en" ? "Buy Now" : "شراء"}
                    </ButtonTheme>
                    <div
                      className={`${
                        props.language === "ar" ? "heart-icon-wrap-Arabic" : ""
                      }`}
                    >
                      {props.userWishlistProducts?.find(
                        (x) => x.product_id === props._id
                      )?._id ? (
                        <RiHeartFill className="icon" />
                      ) : props.user?.isAuthenticated ? (
                        <RiHeartLine
                          className="icon heart-icon-wrap"
                          onClick={() => {
                            addToWishlist();
                          }}
                        />
                      ) : (
                        <LinkContainer
                          to={`/${props.global?.activeLanguage}/profile?active=wishlist`}
                          className="heart-icon-wrap"
                        >
                          <Nav.Link>
                            <IoIosHeartEmpty fontSize="24px" />
                          </Nav.Link>
                        </LinkContainer>
                      )}
                    </div>
                  </div>
                  <div className="partners d-block border-top-custom">
                    <div className="product-code-wrap">
                      <p className="mb-0">
                        <Link
                          to={`/${props.language}/shipping-return-policy`}
                          style={{ color: "#666" }}
                        >
                          {props.language == "en"
                            ? "Shipping & Return Policy"
                            : "شروط الإستخدام"}
                        </Link>
                      </p>
                    </div>
                    <div className="social-media-icons">
                      <p style={{ paddingRight: "10px", marginBottom: "0" }}>
                        {!props.isArabic ? "Share:" : "مشاركه:"}{" "}
                      </p>
                      <LinkedinShareButton
                        url={
                          "https://www.pigeonarabia.com/${props.global.activeLanguage}/mother-baby-products"
                        }
                        title={"Pigeon Global"}
                        source={`https://www.pigeonarabia.com/${props.global.activeLanguage}/product/electric-breast-pump-pro`}
                        media={`https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FBreast%20Pump%20pro%20new%201.jpeg`}
                        summary={`Check out our latest products here:
                      \n
                      https://www.pigeonarabia.com/${props.global.activeLanguage}/mother-baby-products
                      `}
                      >
                        <FaLinkedinIn className="social-icon" />
                      </LinkedinShareButton>
                      <FacebookShareButton
                        url={`https://www.pigeonarabia.com/${
                          props.global.activeLanguage
                        }/product/${encodeURIComponent(props.route)}`}
                        data-href={metaTags.url}
                        quote={`Check out our latest products here:
                      \n
                      https://www.pigeonarabia.com/${props.global.activeLanguage}/mother-baby-products
                      `}
                        hashtag={"#pigeon"}
                      >
                        <FaFacebookF
                          data-href={metaTags.url}
                          className="social-icon"
                        />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={`https://www.pigeonarabia.com/${
                          props.global.activeLanguage
                        }/product/${encodeURIComponent(props.route)}`}
                        title={props.name || "Pigeon Global"}
                        hashtags={["pigeon", "pigeon_arabia"]}
                      >
                        <FaTwitter className="social-icon" />
                      </TwitterShareButton>
                      <PinterestShareButton
                        media={props.featured_img}
                        url={`https://www.pigeonarabia.com/${
                          props.global.activeLanguage
                        }/product/${encodeURIComponent(props.route)}`}
                        description={`Check out our latest products here:
                    \n
                    https://www.pigeonarabia.com/${props.global.activeLanguage}/mother-baby-products
                    `}
                      >
                        <FaPinterestP className="social-icon" />
                      </PinterestShareButton>
                    </div>
                  </div>
                  <div className="delivery_block">
                    <ul>
                      <li>
                        <img src={DeliveryCharges} />
                        {props.isArabic
                          ? "رسوم التوصيل أقل من 99 درهم"
                          : "Delivery charges below AED 99"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "300px",
              alignItems: "center",
            }}
          >
            <ClipLoader color={"#e65550"} loading={true} size={80} />
          </div>
        )}
        {/* <Review
          show={reviewModal}
          onHide={() => setReviewModal(false)}
          productId={props._id}
          userId={props.user?.loggedInUser?._id}
        /> */}
      </Container>
      <div
        style={{
          position: "absolute",
          bottom: "50px",
          right: "10%",
          transform: "translateX(50%)",
          zIndex: 999999,
        }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="mr-auto">Success</strong>
            <strong>
              <small
                style={{ cursor: "pointer" }}
                onClick={() =>
                  history.push(`/${props.global.activeLanguage}/wishlist`)
                }
              >
                View
              </small>
            </strong>
          </Toast.Header>
          <Toast.Body>Product added to your wishlist</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    userWishlistProducts: state.productReducer?.userWishlistProducts,
    global: state.globalReducer,
    swalMsg: state.cartReducer.swalMsg,
    cartList: state.cartReducer.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () =>
      dispatch({
        type: "LOGOUT",
      }),
    wishlistSuccess: (data) =>
      dispatch({
        type: "GET_WISHLIST_SUCCESS",
        payload: {
          wishlist: data,
        },
      }),
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

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
