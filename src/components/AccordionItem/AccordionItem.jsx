import React from "react";
import { Accordion, Card } from "react-bootstrap";

const AccordionItem = ({ question, answer, index }) => {
  return (
    <Accordion defaultActiveKey={index} className="accordion-item-wrap">
      <Card className="accordion-card">
        <Accordion.Toggle
          as={Card.Header}
          eventKey="0"
          className="accordion-card-header"
        >
          <h6> {question}</h6>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {/* {answer?.split("<br>")?.length > 0 ? (
              answer?.split("<br>")?.map((x) => <p>{x}</p>)
            ) : (
              <p>{answer}</p>
            )} */}
            <div dangerouslySetInnerHTML={{ __html: answer }}></div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default AccordionItem;
