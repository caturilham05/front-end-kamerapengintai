import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Spinner,
  Container,
  Row,
  Col,
  Button,
  Carousel,
} from "react-bootstrap";
import { FcLike } from "react-icons/fc";
import { BsCart3 } from "react-icons/bs";
import axios from "axios";
import ProductRelatedComponents from "./ProductRelatedComponents";
import "../style/Category.css";

const api = "http://127.0.0.1:8000/";
const getToken = localStorage.getItem("token");

function ButtonIncrement(props) {
  return (
    <Button
      variant="secondary"
      style={{ marginLeft: "0.5rem" }}
      onClick={props.onClickFunc}
    >
      +
    </Button>
  );
}
function ButtonDecrement(props) {
  return (
    <Button
      variant="secondary"
      style={{ marginLeft: "0.5rem" }}
      onClick={props.onClickFunc}
    >
      -
    </Button>
  );
}

function Display(props) {
  return <label style={{ marginLeft: "0.5rem" }}>{props.message}</label>;
}

function ProductDetailComponents() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [count, setCount] = useState(0);
  const incrementCounter = () => setCount(count + 1);
  let decrementCounter = () => setCount(count - 1);
  // eslint-disable-next-line no-eval
  let images = eval(productDetail.images);

  if (count <= 0) {
    decrementCounter = () => setCount(0);
  }

  useEffect(() => {
    const getProductDetail = async () => {
      await axios
        .get(api + "api/product_detail/" + productId, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => {
          const data = res.data.result;
          setProductDetail(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getProductDetail();
  }, [productId]);
  const addToCart = async (productId) => {
    if (!getToken) {
      alert(
        "Silahkan login terlebih dahulu untuk menambahkan produk ke keranjang"
      );
      window.location.href = "/login";
      return true;
    }
    // eslint-disable-next-line eqeqeq
    if (productDetail.id == productId) {
    }
    return productId;
  };

  // eslint-disable-next-line eqeqeq
  let cekProductDetail = productDetail == "" ? true : false;
  return (
    <>
      {cekProductDetail ? (
        <center>
          <Spinner animation="border" style={{ margin: "15rem" }} />
        </center>
      ) : (
        <Container>
          <Card style={{ marginTop: "0.6rem" }}>
            <Row>
              <Col sm={4}>
                {images?.length === 1 ? (
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src={
                        productDetail.image === ""
                          ? "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                          : "http://kamerapengintai.com/images/modules/warehouse/product/" +
                            productDetail.id +
                            "/" +
                            productDetail.image
                      }
                      onError={(e) => {
                        e.target.src =
                          "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg";
                        e.target.onError = null;
                      }}
                      style={
                        productDetail.image !== ""
                          ? {
                              width: "20rem",
                              cursor: "pointer",
                              backgroundColor: "#6c6c6c20",
                            }
                          : {
                              width: "20rem",
                            }
                      }
                      alt={productDetail.sku}
                    />
                  </Card.Body>
                ) : (
                  <Carousel style={{ padding: "1rem" }}>
                    {images?.map((item, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100"
                          src={
                            item.image === ""
                              ? "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                              : "http://kamerapengintai.com/images/modules/warehouse/product/" +
                                productDetail.id +
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
                                  width: "20rem",
                                  cursor: "pointer",
                                  backgroundColor: "#6c6c6c20",
                                }
                              : {
                                  width: "20rem",
                                }
                          }
                          alt={productDetail.sku}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "0.6rem",
                  }}
                >
                  <span>Share:</span>
                  <Card.Img
                    variant="top"
                    src={
                      "https://1.bp.blogspot.com/-Gk7PJfZlTKM/YI0265VKDVI/AAAAAAAAE20/tSbccfFLIPAGclfx2il52vPUdwR8TJJsQCLcBGAsYHQ/s1600/Logo%2BFacebook%2BFormat%2BPNG.png"
                    }
                    onError={(e) => {
                      e.target.src =
                        "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg";
                      e.target.onError = null;
                    }}
                    style={{
                      width: "2rem",
                      marginLeft: "2.5px",
                      cursor: "pointer",
                    }}
                  />
                  <Card.Img
                    variant="top"
                    src={
                      "https://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png"
                    }
                    onError={(e) => {
                      e.target.src =
                        "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg";
                      e.target.onError = null;
                    }}
                    style={{
                      width: "2rem",
                      marginLeft: "2.5px",
                      cursor: "pointer",
                    }}
                  />
                  <Card.Img
                    variant="top"
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png"
                    }
                    onError={(e) => {
                      e.target.src =
                        "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg";
                      e.target.onError = null;
                    }}
                    style={{
                      width: "2rem",
                      marginLeft: "2.5px",
                      cursor: "pointer",
                    }}
                  />
                  <FcLike className="ms-auto" />
                </div>
              </Col>
              <Col sm={8}>
                <div style={{ margin: "1rem" }}>
                  <h2>{productDetail.title}</h2>
                  <h6>{productDetail.intro}</h6>
                  <span>{productDetail.hits}x Dilihat | 37 Terjual</span>
                </div>
                <div style={{ margin: "1rem" }}>
                  <h3>
                    Rp{" "}
                    {productDetail.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "1rem",
                  }}
                >
                  <span>Kuantitas: </span>
                  <div>
                    <ButtonDecrement onClickFunc={decrementCounter} />
                    <Display message={count} />
                    <ButtonIncrement onClickFunc={incrementCounter} />
                    <span style={{ marginLeft: "10px" }}>
                      Tersisa {productDetail.qty_available} Buah
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "1rem",
                    marginTop: "3rem",
                    display: "flex",
                  }}
                >
                  <Button
                    variant="danger"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "1rem",
                      borderColor: "#00000071",
                    }}
                    onClick={addToCart.bind(null, productId)}
                    {...(productDetail.qty_available > 0
                      ? ""
                      : { disabled: true })}
                  >
                    <BsCart3 />
                    &nbsp;
                    <h5 style={{ marginTop: "5px" }}>Masukkan Keranjang</h5>
                  </Button>
                  <Button
                    variant="light"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderColor: "#00000071",
                    }}
                    {...(productDetail.qty_available > 0
                      ? ""
                      : { disabled: true })}
                  >
                    <h5 style={{ marginTop: "5px" }}>Beli Sekarang</h5>
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
          <Card
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              paddingLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <h4 style={{ textAlign: "center" }}>Deskripsi Produk</h4>
            <Card.Body>
              <span
                dangerouslySetInnerHTML={{ __html: productDetail.description }}
              ></span>
            </Card.Body>
          </Card>
        </Container>
      )}
      <ProductRelatedComponents catId={productDetail.cat_id} />
    </>
  );
}

export default ProductDetailComponents;
