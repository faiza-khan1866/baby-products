import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Layout from "./layouts/Layout";
import Navigation from "./navigator/Navigation";
import ScrollToTop from "./utils/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { fetchPages } from "./redux/pages/pagesActions";
import ClipLoader from "react-spinners/BounceLoader";

function App(props) {
  const pages = useSelector((state) => state.allPages.pages);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (pages && pages.length === 0) dispatch(fetchPages());
  }, [pages]);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            className={`d-flex flex-column text-center align-items-center justify-content-center`}
            style={{
              position: "absolute",
              zIndex: 99999,
              height: "100%",
              width: "100%",
              background: "rgba(255,255,255,0.6)",
            }}
          >
            <ClipLoader color={"#e65550"} loading={true} size={80} />
          </div>
        }
      >
        <ScrollToTop />
        <Layout>
          <Navigation />
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
