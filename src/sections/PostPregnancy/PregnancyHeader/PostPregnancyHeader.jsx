import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { constants } from "../../../utils/constants";

function PostPregnancyHeader({ data, language }) {
  return (
    <div className="post-pregnancy-header">
      <Container>
        <Row>
          <Col sm={7}>
            <div className="section-title-underlined">
              <h1>{constants?.site_content?.post_pregnancy_title[language]}</h1>
              {/* <h1>Post Pregnancy</h1> */}
            </div>
            {/* <p>After Birth (while still in hospital)</p> */}
            <div
              className={`description-list ${
                language === "ar" ? "description-list-Arabic" : ""
              }`}
              // className="description-list"
            >
              {/* <ul>
                <li>
                  <span className="icon-pebble">
                    <BiCheck className="check-icon" />
                  </span>
                  <span>
                    The uterus returns to its normal size in about six weeks
                    after delivery, the fat around the middle part of the body
                    doesn’t go away easily.
                  </span>
                </li>
                <li>
                  <span className="icon-pebble">
                    <BiCheck className="check-icon" />
                  </span>
                  <span>
                    Your joints and muscles will be recovering from the severity
                    of childbirth.
                  </span>
                </li>
                <li>
                  <span className="icon-pebble">
                    <BiCheck className="check-icon" />
                  </span>
                  <span>
                    Postnatal vaginal bleeding will stay about the same as in a
                    normal menstrual cycle for a week.
                  </span>
                </li>
                <li>
                  <span className="icon-pebble">
                    <BiCheck className="check-icon" />
                  </span>
                  <span>
                    Breastmilk will start to flow within 1 to 3 days of
                    childbirth.
                  </span>
                </li>
              </ul> */}

              <div
                dangerouslySetInnerHTML={{
                  __html: data?.short_description,
                }}
              ></div>

              {/* <p>
            &bull; While the uterus (womb) will return to its normal size within
            about six weeks, the extra fat around your middle part of your body
            will not disappear as quickly or easily.
          </p>
          <p>
            &bull; Your muscles and joints will still be recovering from the
            rigors of pregnancy and childbirth.
          </p>

          <p>
            &bull; Lochia (postnatal vaginal bleeding) will be about the same as
            a normal menstrual flow for about one week.
          </p>

          <p>
            &bull; Breast milk, colostrum, can be expected to flow within one to
            three days after childbirth.
          </p> */}
            </div>
            {/* <div className="massage-text">
              <h6>Massage to maintain a beautiful silhouette</h6>
              <p>
                Your midsection will develop step by step, a decent sign that
                your baby is growing inside. Massage your body as though you
                were conversing with your child.
              </p>
            </div> */}
          </Col>
          <Col sm={5}>
            <div className="image-wrapper">
              <img
                src={process.env.REACT_APP_IMAGE_BASE_URL + data?.featured_img}
                alt="post-pregnancy"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PostPregnancyHeader;
