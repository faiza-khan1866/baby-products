import React from "react";
import { Container, Table } from "react-bootstrap";
import { subsidiaries } from "../../utils/data";

const Subsidiaries = () => {
  return (
    <div className="subsidiaries-section">
      <Container>
        <h3>Global Group Offices</h3>
        {subsidiaries?.map((x) => (
          <div
            dangerouslySetInnerHTML={{ __html: x.content }}
            className="content-wrap"
          ></div>
        ))}
      </Container>
    </div>
  );
};

export default Subsidiaries;
