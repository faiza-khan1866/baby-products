import React from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { constants } from "../../../utils/constants";

export default function RelatedArticle({
  articleImage,
  articleTitle,
  articleDescription,
  articleRoute,
  language,
}) {
  return (
    <>
      {articleTitle ? (
        <div className="related-article">
          <div className="row g-0 m-0">
            <div className="col-md-6 p-0">
              <div className="image-wrapper">
                <img src={articleImage} alt="details" loading="lazy" />
              </div>
            </div>
            <div className="col-md-6 p-0">
              <div className="content-wrapper">
                <div className="aligned-article-container">
                  <h3 className="title">{articleTitle ? articleTitle : ""}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${articleDescription || ""}`,
                    }}
                  ></div>
                </div>
                <Link to={articleRoute}>
                  <p className="discover">
                    {constants?.site_content?.discover_now[language]}{" "}
                    {language === "en" ? (
                      <GoChevronRight />
                    ) : (
                      <span className="svg-article">
                        <GoChevronLeft />
                      </span>
                    )}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
