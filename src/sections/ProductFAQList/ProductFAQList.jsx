import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AccordionItem from "../../components/AccordionItem/AccordionItem";
import { constants } from "../../utils/constants";
import { FAQs } from "../../utils/data";
import ClipLoader from "react-spinners/BounceLoader";

const ProductFAQList = (props) => {

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let categoriesData = []
    if (props.faqData) {
      props.faqData.forEach((element, index) => {
        categoriesData.push(element.category)

      })
      let unique = [...new Set(categoriesData)];
      setCategories(unique)
    }
  }, [props])

  return (
    <div className="faq-list-section">
      <Container>
        <h1>
          {!props.isArabic ? "Product FAQ's" : "الأسئلة الشائعة حول المنتجات"}
        </h1>
        <Row>
          <Col>
            {categories?.map((x, index) => (
              <>
                <h5 style={{ color: "#e65550", marginBottom: "15px", marginTop: "25px" }}>{x}</h5>
                {props.faqData?.length > 0 ?
                  props.faqData?.filter((faq) => {
                    return faq.category === x;
                  }).map((x, index) => (
                    <AccordionItem
                      key={index + x.questions}
                      question={x.questions}
                      answer={x.answers}
                      index={index}
                    />
                  ))
                  :
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '300px',
                    width: "100%",
                    alignItems: 'center'
                  }}
                  >
                    <ClipLoader
                      color={"#e65550"}
                      loading={true}
                      size={80}
                    />
                  </div>
                }
              </>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductFAQList;
