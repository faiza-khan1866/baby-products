import React, { lazy } from "react";
const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const UserProfile = lazy(() => import("../pages/UserProfile"));
const MotherBabyWord = lazy(() => import("../pages/MotherBabyWorld"));
const GoodToKnow = lazy(() => import("../pages/GoodToKnow"));
const Video = lazy(() => import("../pages/Video"));
const Pregnancy = lazy(() => import("../pages/Pregnancy"));
const FAQ = lazy(() => import("../pages/FAQ"));
const ProductFAQ = lazy(() => import("../pages/ProductFAQ"));
const BreastFeedingAdvisor = lazy(() =>
  import("../pages/BreastFeedingAdvisor")
);
const PostPregnancy = lazy(() => import("../pages/PostPregnancy"));
const BabyCare = lazy(() => import("../pages/BabyCare"));
const FirstTimeFather = lazy(() => import("../pages/FirstTimeFather"));
const ArticleDetailPage = lazy(() => import("../pages/ArticleDetailPage"));
const DisclosurePolicy = lazy(() => import("../pages/DisclosurePolicy"));
const PrivacyProtection = lazy(() => import("../pages/PrivacyProtection"));
const SocialMediaPolicy = lazy(() => import("../pages/SocialMediaPolicy"));
const TermsOfUse = lazy(() => import("../pages/TermsOfUse"));
const ShippingAndReturnPolicy = lazy(() =>
  import("../pages/ShippingAndReturnPolicy")
);
const OfficialSocialMedia = lazy(() => import("../pages/OfficialSocialMedia"));
const Subsidiaries = lazy(() => import("../pages/Subsidiaries"));
const Sitemap = lazy(() => import("../pages/Sitemap"));
const ProductCategories = lazy(() => import("../pages/ProductCategories"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogDetailPage = lazy(() => import("../pages/BlogDetailPage"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Tracking = lazy(() => import("../pages/Tracking"));
const PaymentSuccess = lazy(() => import("../pages/PaymentSuccess"));
const RegisterSuccess = lazy(() =>
  import("../components/Modals/Register/RegisterSuccess")
);
const Order = lazy(() => import("../pages/Order"));

export const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    isPrivate: false,
    exact: true,
  },
  {
    name: "HomeRoute",
    path: "",
    component: Home,
    isPrivate: false,
    exact: true,
  },
  {
    name: "ourPrudcts",
    path: "/mother-baby-products",
    component: ProductCategories,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Cart",
    path: "/cart",
    component: Cart,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Checkout",
    path: "/checkout",
    component: Checkout,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Tracking",
    path: "/tracking",
    component: Tracking,
    isPrivate: false,
    exact: true,
  },
  {
    name: "PaymentSuccess",
    path: "/checkout/success",
    component: PaymentSuccess,
    isPrivate: false,
    exact: true,
  },
  {
    name: "RegisterSuccess",
    path: "/register/success",
    component: RegisterSuccess,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Order",
    path: "/order",
    component: Order,
    isPrivate: false,
    exact: true,
  },
  {
    name: "product-faqs",
    path: "/product-faqs",
    component: ProductFAQ,
    isPrivate: false,
    exact: true,
  },
  // {
  //   name: "Categories",
  //   path: "/category",
  //   component: ProductCategories,
  //   isPrivate: false,
  //   exact: true,
  // },
  {
    name: "Products",
    path: "/products",
    component: Products,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Products",
    path: "/products/:id",
    component: Products,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Products",
    path: "/products/:id/:sub",
    component: Products,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Product",
    path: "/product/:id",
    component: ProductDetails,
    isPrivate: false,
    exact: true,
  },
  {
    name: "About",
    path: "/about",
    component: About,
    isPrivate: false,
    exact: true,
  },
  {
    name: "MotherBabyWorld",
    path: "/mother-baby-world",
    component: MotherBabyWord,
    isPrivate: false,
    exact: true,
  },
  {
    name: "GoodToKnow",
    path: "/good-to-know",
    component: GoodToKnow,
    isPrivate: false,
    exact: true,
  },
  {
    name: "BreastFeedingAdvisor",
    path: "/breastfeeding-advisor",
    component: BreastFeedingAdvisor,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Blog",
    path: "/blog",
    component: Blog,
    isPrivate: false,
    exact: true,
  },
  {
    name: "BlogDetailPage",
    path: "/blog/:id",
    component: BlogDetailPage,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Video",
    path: "/video",
    component: Video,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Contact",
    path: "/contact",
    // path: "/contact",
    component: Contact,
    isPrivate: false,
    exact: true,
  },
  {
    name: "FAQ",
    path: "/faq",
    component: FAQ,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Wishlist",
    path: "/wishlist",
    component: Wishlist,
    isPrivate: true,
    exact: true,
    show: false,
  },
  {
    name: "Profile",
    path: "/profile",
    component: UserProfile,
    isPrivate: true,
    exact: true,
    show: false,
  },
  {
    name: "Pregnancy",
    path: "/stages-of-pregnancy",
    component: Pregnancy,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Post Pregnancy",
    path: "/post-pregnancy-care",
    component: PostPregnancy,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Baby Care",
    path: "/baby-care",
    component: BabyCare,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "First Time Father",
    path: "/first-time-father",
    component: FirstTimeFather,
    isPrivate: false,
    exact: true,
    show: false,
  },
  // {
  //   name: "Article",
  //   path: "/article/:id",
  //   component: ArticleDetailPage,
  //   isPrivate: false,
  //   exact: true,
  //   show: false,
  // },
  {
    name: "Article",
    path: "/breastfeeding-advisor/:category/:article",
    component: ArticleDetailPage,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Disclosure Policy",
    path: "/disclosure-policy",
    component: DisclosurePolicy,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Policy on Privacy Protection",
    path: "/privacy-protection-policy",
    component: PrivacyProtection,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Social Media Policy",
    path: "/social-media-policy",
    component: SocialMediaPolicy,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Term Of Use",
    path: "/term-of-use",
    component: TermsOfUse,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Term Of Use",
    path: "/shipping-return-policy",
    component: ShippingAndReturnPolicy,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Official Social Media List",
    path: "/official-social-media-list",
    component: OfficialSocialMedia,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Subsidiaries",
    path: "/subsidiaries",
    component: Subsidiaries,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Sitemap",
    path: "/sitemap",
    component: Sitemap,
    isPrivate: false,
    exact: true,
    show: false,
  },
];
