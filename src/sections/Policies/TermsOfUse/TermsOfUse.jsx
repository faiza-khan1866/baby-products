import React from "react";
import { Container } from "react-bootstrap";
import { termOfUseData } from "../../../utils/data_policy";

const TermsOfUse = () => {
  return (
    <div className="terms-of-use-section">
      <Container>
        {termOfUseData?.map((x, index) => (
          <div
            className="content-wrap"
            dangerouslySetInnerHTML={{ __html: x.content }}
          ></div>
        ))}
      </Container>
    </div>
  );
};

export default TermsOfUse;
