import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AccordionItem from "../../components/AccordionItem/AccordionItem";
import { constants } from "../../utils/constants";
import { FAQs } from "../../utils/data";

const FAQList = (props) => {
  return (
    <div className="faq-list-section">
      <Container>
        <h1>
          {constants.site_content.faq_title[props.language]}
        </h1>
        <Row>
          <Col>
            {props.faqData?.map((x, index) => (
              <AccordionItem
                key={index + x.questions}
                question={x.questions}
                answer={x.answers}
                index={index}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FAQList;
