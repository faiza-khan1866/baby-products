import React from "react";
import { Container } from "react-bootstrap";
import { disclosurePolicyData } from "./../../../utils/data_policy";

const DisclosurePolicy = () => {
  return (
    <div className="disclosure-policy-section">
      <Container>
        <div className="info-wrap">
          <p>
            Pigeon Corporation strives to promote understanding among its
            various stakeholders to build long-term relationships through the
            appropriate disclosure of material information, so that we may be
            fairly evaluated.
          </p>
        </div>
        {disclosurePolicyData?.map((x) => (
          <div key={x.title} className="text-wrap">
            <h4>{x.title}</h4>
            <p>{x.description}</p>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default DisclosurePolicy;
