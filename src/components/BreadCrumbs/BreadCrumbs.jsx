import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { LinkContainer } from "react-router-bootstrap";

function BreadCrumbs({ breadCrumbItems, language }) {
  return (
    <div className="theme-breadcrumbs">
      <Container>
        <Breadcrumb dir={language === "ar" ? "rtl" : "ltr"}>
          {breadCrumbItems.map((item, index) => (
            <LinkContainer to={item.link} key={index}>
              <Breadcrumb.Item
                href={item.link}
                active={item.active}
              >
                {item.text}
              </Breadcrumb.Item>
            </LinkContainer>
          ))}
        </Breadcrumb>
      </Container>
    </div>
  );
}

export default BreadCrumbs;
