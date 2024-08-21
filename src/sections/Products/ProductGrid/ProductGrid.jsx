import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
// import PageItem from "react-bootstrap/PageItem";
import GridItem from "../../../components/GridItem";
// import { categoryProducts } from "../../../utils/data";
import ClipLoader from "react-spinners/BounceLoader";
import { connect } from "react-redux";

const perPage = 12;

function ProductGrid(props) {
  const [paginationItems, setPaginationItems] = useState(null);
  const [activePage, setActivePage] = useState(props.currentPage);
  // const [disableFirst, setDisableFirst] = useState(false);
  // const [disableLast, setDisableLast] = useState(false);

  useEffect(() => {
    let paginatedItems = [];
    let count = props.totalProducts / perPage;
    if (
      (props.totalProducts > perPage && props.totalProducts % perPage > 0) ||
      (count > 0 && count < 1)
    ) {
      ++count;
    }
    let prevPage = props.currentPage - 1;
    // paginatedItems.push(
    //   <Pagination.First
    //     disabled={prevPage < 1}
    //     onClick={() => props.handlePageClick(1)}
    //   />
    // );
    paginatedItems.push(
      <Pagination.Prev
        disabled={prevPage < 1}
        onClick={() => {
          if (prevPage < 1) {
            props.handlePageClick(1);
            // setDisableFirst(true);
          } else {
            props.handlePageClick(prevPage);
          }
        }}
      />
    );

    for (let index = 1; index <= count; index++) {
      paginatedItems.push(
        <Pagination.Item
          key={index}
          active={index === props.currentPage}
          onClick={
            index === activePage ? null : () => props.handlePageClick(index)
          }
        >
          {index}
        </Pagination.Item>
      );
    }
    let nextPage = props.currentPage + 1;
    paginatedItems.push(
      <Pagination.Next
        disabled={nextPage > parseInt(count)}
        onClick={() => {
          if (nextPage > parseInt(count)) {
            props.handlePageClick(parseInt(count));
            // setDisableLast(true);
          } else {
            props.handlePageClick(nextPage);
          }
        }}
      />
    );
    // paginatedItems.push(
    //   <Pagination.Last
    //     disabled={nextPage > parseInt(count)}
    //     onClick={() =>
    //       props.handlePageClick(parseInt(count))
    //     }
    //   />
    // );
    setPaginationItems(paginatedItems);
  }, [props.totalProducts, activePage, props]);

  useEffect(() => {
    setActivePage(props.currentPage);
  }, [props.currentPage]);

  // const paginationItems=()=>{

  // }
  // console.log(props.bannerType);
  return (
    <div className="products-grid">
      <Container>
        <Row>
          {!props.showSpinner ? (
            props.products?.length > 0 ? (
              props.products.map((product) => (
                <Col xs={12} sm={6} md={6} lg={4} key={product._id}>
                  <GridItem
                    price={
                      !props.isArabic
                        ? product?.default_price
                          ? product.default_price
                          : product?.price
                          ? product.price
                          : 0
                        : product?.arabic?.arabic_price
                        ? product?.arabic?.arabic_price
                        : 0
                    }
                    discounted_price={
                      !props.isArabic
                        ? product?.discounted_price
                          ? product.discounted_price
                          : 0
                        : product.arabic.arabic_discounted_price
                        ? product.arabic.arabic_discounted_price
                        : 0
                    }
                    variations={
                      product?.variations?.length > 0 ? product.variations : []
                    }
                    discount={product?.discount || 0}
                    id={product._id}
                    default_stock={product?.default_stock}
                    route={product.route}
                    name={props.isArabic ? product.arabic?.name : product.name}
                    image={product.featured_img}
                    rating={product.rating}
                    avg_rating={product.avg_rating}
                    rating_count={product.reviews?.length || 0}
                    firstcry_link={product.firstcry_link}
                    isBanner={
                      // props.bannerType?.value !== "" ||
                      // props.bannerType?.value !== "Popularity"
                      true
                    }
                    bannerType={
                      product.sortings?.find(
                        (x) =>
                          x.toLowerCase() ===
                          props.bannerType?.value?.toLowerCase()
                      ) || product.sortings?.[0]
                    }
                  />
                </Col>
              ))
            ) : (
              <>
                {props.fetchMessage ? (
                  <div className="d-flex p-5 w-100 justify-content-center align-items-center">
                    <p style={{ color: "#aaa", fontSize: "20px" }}>
                      {props.isArabic ? (
                        <em> سيتم تحديث منتجات هذه الفئة قريباً!</em>
                      ) : (
                        <em>
                          {" "}
                          Products of this Category Will Be Updated Soon!{" "}
                        </em>
                      )}
                    </p>
                  </div>
                ) : (
                  <div
                    className={`d-flex flex-column text-center align-items-center justify-content-center`}
                    style={{
                      // position: "absolute",
                      zIndex: 999,
                      height: "300px",
                      width: "100%",
                      background: "rgba(255,255,255,0.8)",
                      // background: "#fff",
                    }}
                  >
                    <ClipLoader color={"#e65550"} loading={true} size={80} />
                  </div>
                )}
              </>
            )
          ) : (
            <div
              className={`d-flex flex-column text-center align-items-center justify-content-center`}
              style={{
                // position: "absolute",
                zIndex: 999,
                height: "200px",
                width: "100%",
                background: "rgba(255,255,255,0.8)",
                // background: "#fff",
              }}
            >
              <ClipLoader color={"#e65550"} loading={true} size={80} />
            </div>
          )}
        </Row>
        <div className="pagination-wrapper">
          {props.totalProducts > 0 && (
            <Pagination>{paginationItems?.map((x) => x)}</Pagination>
          )}
        </div>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showSpinner: state?.globalReducer?.showSpinner,
    global: state.globalReducer,
    fetchMessage: state.productReducer.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
