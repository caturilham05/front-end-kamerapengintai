import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Spinner, Container, Row, Col, Button } from "react-bootstrap";
import { FcLike } from "react-icons/fc";
import { BsCart3 } from "react-icons/bs";
import axios from "axios";

const api = "http://127.0.0.1:8000/";
const getToken = localStorage.getItem("token");

function ButtonIncrement(props) {
  return (
    <Button
      variant="secondary"
      style={{ marginLeft: ".5rem" }}
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
      style={{ marginLeft: ".5rem" }}
      onClick={props.onClickFunc}
    >
      -
    </Button>
  );
}

function Display(props) {
  return <label style={{ marginLeft: ".5rem" }}>{props.message}</label>;
}

function ProductDetailComponents() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [count, setCount] = useState(0);
  const incrementCounter = () => setCount(count + 1);
  let decrementCounter = () => setCount(count - 1);

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
  // eslint-disable-next-line eqeqeq
  let cekProductDetail = productDetail == "" ? true : false;
  console.log(productDetail);
  return (
    <>
      {cekProductDetail ? (
        <center>
          <Spinner animation="border" style={{ margin: "15rem" }} />
        </center>
      ) : (
        <Container>
          <Card style={{ margin: "1rem" }}>
            <Row>
              <Col sm={4}>
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
                          }
                        : {
                            width: "20rem",
                          }
                    }
                    alt={productDetail.sku}
                  />
                  <Card.Text>
                    <div style={{ display: "flex", alignItems: "center" }}>
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
                  </Card.Text>
                </Card.Body>
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
                    <span style={{marginLeft: '10px'}}>Tersisa {productDetail.qty} Buah</span>
                  </div>
                </div>
                <div style={{ marginLeft: "1rem", marginTop: "3rem", display: 'flex' }}>
                  <Button
                    variant="danger"
                    style={{ display: "flex", alignItems: "center", marginRight: '1rem' }}
                  >
                    <BsCart3 />
                    &nbsp;
                    <h5 style={{ marginTop: "5px" }}>Masukkan Keranjang</h5>
                  </Button>
                  <Button
                    variant="light"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                  <h5 style={{ marginTop: "5px" }}>Beli Sekarang</h5>
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
          <Card style={{ margin: "1rem" }}>
            <h1>Spesifikasi</h1>
          </Card>
        </Container>
      )}
    </>
  );
}

export default ProductDetailComponents;
