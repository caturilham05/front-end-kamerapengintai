import React, { useState, useEffect } from "react";
import { Card, Spinner, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../style/Category.css";

const api = process.env.REACT_APP_API;

function ProductRelatedComponents(props) {
  const [productRelated, setProductRelated] = useState([]);
  const location = useLocation();
  let regex = /\/product_related\//g;
  let regexCatId = /\/product_related\/([0-9]+)/is;
  let cekRegex = location.pathname.match(regex);
  const { catId } = props;
  let cekRegexCatId = location.pathname.match(regexCatId)
    ? location.pathname.match(regexCatId)[1]
    : catId;
  useEffect(() => {
    const getProductRelated = async () => {
      await axios
        .get(api + "api/product_related/" + cekRegexCatId)
        .then((res) => {
          const data = res.data.result;
          setProductRelated(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getProductRelated();
  }, [cekRegexCatId]);

  // eslint-disable-next-line eqeqeq
  let cekProducts = productRelated == "" ? true : false;
  return (
    <Container style={cekRegex !== null ? { marginTop: "1rem" } : {}}>
      <Card>
        <Card.Header style={{ fontSize: "1.5rem" }}>Produk Terkait</Card.Header>
        {cekProducts ? (
          <center>
            <Spinner animation="border" />
          </center>
        ) : (
          <>
            <Container className="custom_container">
              {cekRegex === null ? (
                productRelated.slice(0, 6).map((item, index) => (
                  <Card.Body key={index}>
                    <Card.Img
                      variant="top"
                      src={
                        item.image === ""
                          ? "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                          : "http://kamerapengintai.com/images/modules/warehouse/product/" +
                            item.id +
                            "/" +
                            item.image
                      }
                      onError={(e) => {
                        e.target.src =
                          "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg";
                        e.target.onError = null;
                      }}
                      style={
                        item.image !== ""
                          ? {
                              cursor: "pointer",
                              width: "20rem",
                              backgroundColor: "#6c6c6c20",
                            }
                          : { width: "20rem" }
                      }
                      alt={item.sku}
                    />
                    <Card.Title
                      style={{
                        display: "block",
                        width: "15rem",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Link
                        to={`/products/${item.id}`}
                        className="text_product"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        {item.title ? item.title : item.sku}
                      </Link>
                    </Card.Title>
                  </Card.Body>
                ))
              ) : (
                <div className="container_products">
                  {productRelated.map((item, index) => (
                    <center key={index}>
                      <Card
                        style={{
                          margin: "1.3rem",
                          width: "20rem",
                          height: "20rem",
                          borderRadius: "10px",
                          transition: "0.3s",
                        }}
                        className="card_products"
                      >
                        <Card.Body>
                          <Card.Img
                            variant="top"
                            src={
                              item.image === ""
                                ? "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                                : "http://kamerapengintai.com/images/modules/warehouse/product/" +
                                  item.id +
                                  "/" +
                                  item.image
                            }
                            onError={(e) => {
                              e.target.src =
                                "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg";
                              e.target.onError = null;
                            }}
                            style={
                              item.image !== ""
                                ? {
                                    width: "13rem",
                                    margin: "1rem",
                                    cursor: "pointer",
                                  }
                                : {
                                    // backgroundColor: "white",
                                    // width: "7.5rem",
                                    // height: "7.5rem",
                                    // borderRadius: "10px",
                                    // padding: "1rem",
                                    width: "13rem",
                                    margin: "1rem",
                                  }
                            }
                            alt={item.title}
                          />
                          <Card.Title
                            style={{
                              display: "block",
                              width: "15rem",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <Link
                              to={`/products/${item.id}`}
                              className="text_product"
                            >
                              {item.title ? item.title : item.sku}
                            </Link>
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </center>
                  ))}
                </div>
              )}
            </Container>
            {cekRegex === null && (
              <center>
                <Button
                  variant="secondary"
                  style={{ width: "25%", marginBottom: "1rem" }}
                >
                  <Link
                    to={`/product_related/${catId}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Lihat Semua
                  </Link>
                </Button>
              </center>
            )}
          </>
        )}
      </Card>
    </Container>
  );
}

export default ProductRelatedComponents;
