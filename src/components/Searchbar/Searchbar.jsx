import React, { useState, useEffect } from "react";
import { Col, Form, Row, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API } from "../../http/API";

const Searchbar = ({ onClose, language }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  //search bar functinality English
  const [query, setQuery] = useState("");
  let inputQuerySearch = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setQuery(lowerCase);
  };

  const [queryList, setQueryList] = useState([]);

  const getQueryData = () => {
    setLoading(true);
    API.get(`/navbar_search?query=${query}`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          setQueryList(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (query?.length > 3) {
      getQueryData();
    }
  }, [query]);

  //search bar functinality Arabic

  const [queryArabic, setQueryArabic] = useState("");
  let inputQuerySearchArabic = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setQueryArabic(lowerCase);
  };

  const [queryListArabic, setQueryListArabic] = useState([]);

  const getQueryDataArabic = () => {
    setLoading(true);
    API.get(`/navbar_search_ar?query=${queryArabic}`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          setQueryListArabic(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (queryArabic?.length > 3) {
      getQueryDataArabic();
    }
  }, [queryArabic]);

  return (
    <Col xs={6} md={4}>
      {language === "ar" ? (
        <div className="searchbar-dropdown">
          <Form
            onSubmit={(e) => e.preventDefault()}
            style={{ background: "#FFFFFF" }}
            className={loading && "pb-2"}
          >
            <Form.Control
              type="text"
              // placeholder="Search..."
              className="searchbar-field"
              // onChange={handleSearch}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder={"بحث ..."}
              onChange={inputQuerySearchArabic}
              value={queryArabic}
            />
            {queryArabic !== "" && queryArabic?.length >= 3 && (
              <>
                {loading ? (
                  <div
                    className="loader my-4"
                    style={{
                      borderTopColor: "white",
                      borderRightColor: "white",
                      borderBottomColor: "white",
                      borderLeftColor: "#e65550",
                      width: "sm" ? "6em" : "md" ? "10em" : "10em",
                      height: "sm" ? "6em" : "md" ? "10em" : "10em",
                    }}
                  />
                ) : (
                  <Container fluid className="py-3 search-items-list">
                    <Row>
                      <Col sm={6} className={"text-right"}>
                        <h3 className="title">منتجات</h3>
                        {queryListArabic?.products?.length > 0 ? (
                          queryListArabic?.products?.map((x, i) => (
                            <p
                              key={i}
                              className="list"
                              onClick={() => {
                                history.push(`/ar/product/${x?.route}`);
                                onClose();
                              }}
                            >
                              {x?.arabic?.name}
                            </p>
                          ))
                        ) : (
                          <p
                            style={{
                              color: "lightgray",
                              textTransform: "capitalize",
                            }}
                          >
                            لا يوجد منتج !!!
                          </p>
                        )}
                      </Col>
                      <Col sm={6} className={"text-right"}>
                        <h3 className="title">مقالات</h3>
                        {queryListArabic?.articles?.length > 0 ? (
                          queryListArabic?.articles?.map((x, i) => (
                            <p
                              key={i}
                              className="list"
                              onClick={() => {
                                history.push(`/${x?.route}`);
                                onClose();
                              }}
                            >
                              {x?.arabic?.title}
                            </p>
                          ))
                        ) : (
                          <p
                            style={{
                              color: "lightgray",
                              textTransform: "capitalize",
                            }}
                          >
                            لا يوجد مقال !!!
                          </p>
                        )}
                      </Col>
                    </Row>
                  </Container>
                )}
              </>
            )}
          </Form>
        </div>
      ) : (
        <div className="searchbar-dropdown">
          <Form
            onSubmit={(e) => e.preventDefault()}
            style={{ background: "#FFFFFF" }}
            className={loading && "pb-2"}
          >
            <Form.Control
              type="text"
              className="searchbar-field"
              onKeyDown={(e) => e.stopPropagation()}
              placeholder="Search ..."
              onChange={inputQuerySearch}
              value={query}
            />
            {query !== "" && query?.length >= 3 && (
              <>
                {loading ? (
                  <div
                    className="loader my-4"
                    style={{
                      borderTopColor: "white",
                      borderRightColor: "white",
                      borderBottomColor: "white",
                      borderLeftColor: "#e65550",
                      width: "sm" ? "6em" : "md" ? "10em" : "10em",
                      height: "sm" ? "6em" : "md" ? "10em" : "10em",
                    }}
                  />
                ) : (
                  <Container fluid className="py-3 search-items-list">
                    <Row>
                      <Col sm={6}>
                        <h3 className="title">Products</h3>
                        {queryList?.products?.length > 0 ? (
                          queryList?.products?.map((x, i) => (
                            <p
                              key={i}
                              onClick={() => {
                                history.push(`/en/product/${x?.route}`);
                                onClose();
                              }}
                              className="list"
                            >
                              {x?.name}
                            </p>
                          ))
                        ) : (
                          <p
                            style={{
                              color: "lightgray",
                              textTransform: "capitalize",
                            }}
                          >
                            No Product Found !!!
                          </p>
                        )}
                      </Col>
                      <Col sm={6}>
                        <h3 className="title">Articles</h3>
                        {queryList?.articles?.length > 0 ? (
                          queryList?.articles?.map((x, i) => (
                            <p
                              key={i}
                              className="list"
                              onClick={() => {
                                history.push(`/${x?.route}`);
                                onClose();
                              }}
                            >
                              {x?.name}
                            </p>
                          ))
                        ) : (
                          <p
                            style={{
                              color: "lightgray",
                              textTransform: "capitalize",
                            }}
                          >
                            No Article Found !!!
                          </p>
                        )}
                      </Col>
                    </Row>
                  </Container>
                )}
              </>
            )}
          </Form>
        </div>
      )}
    </Col>
  );
};

export default Searchbar;
