import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import axios from "axios";

const api = "http://127.0.0.1:8000/";
const getToken = localStorage.getItem("token");
const getIdUser = localStorage.getItem("id");

function ProductCartComponents() {
  const [productCarts, setProductCarts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get(api + "api/product_cart/" + getIdUser, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => {
          const data = res.data.result;
          setProductCarts(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getProducts();
  }, []);

  let priceRandom = Math.floor(Math.random() * 100000 + 1);
  console.log(productCarts);
  return (
    <>
      {productCarts.length === 0 ? (
        <center>
          <div style={{ marginTop: "5rem", marginBottom: "5rem" }}>
            <h1>
              <b>Wah, keranjang belanjamu masih kosong.</b>
            </h1>
          </div>
        </center>
      ) : (
        <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Row>
            <Col sm={8} style={{ marginBottom: "2rem" }}>
              <Card>
                <Card.Header>
                  <b>Keranjang Belanja</b>
                </Card.Header>
                <Container>
                  {productCarts.map((item, index) => (
                    <Card.Body key={index}>
                      <Row>
                        <Col sm={4}>
                          <div
                            className="d-flex"
                            style={{
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Form>
                              <Form.Check />
                            </Form>
                            <Card.Img
                              variant="top"
                              src={
                                item.image === ""
                                  ? "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                                  : "http://kamerapengintai.com/images/modules/warehouse/product/" +
                                    item.product_id +
                                    "/" +
                                    item.image
                              }
                              onError={(e) => {
                                e.target.src =
                                  "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg";
                                e.target.onError = null;
                              }}
                              style={{
                                width: "10rem",
                                marginLeft: "2rem",
                                cursor: "pointer",
                              }}
                            ></Card.Img>
                          </div>
                        </Col>
                        <Col sm={8}>
                          <Card.Text>{item.title}</Card.Text>
                          <Card.Text>
                            <b>
                              {item.sale === 1
                                ? "Rp " +
                                  priceRandom.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                  })
                                : "Rp " +
                                  item.sale.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                  })}
                            </b>
                          </Card.Text>
                        </Col>
                      </Row>
                      <div className="d-flex" style={{margin: "1rem", alignItems: "center", justifyContent: "space-between"}}>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Catatan Tambahan (Pastikan tidak ada data pribadi)"
                            />
                          </Form.Group>
                        </Form>
                        <span>Pindahkan ke Wishlist | <FiTrash2 /></span>
                        <span>Pindahkan ke Wishlist | <FiTrash2 /></span>
                      </div>
                    </Card.Body>
                  ))}
                </Container>
              </Card>
            </Col>
            <Col sm={4}>
              <Card style={{ position: "fixed", width: "25rem" }}>
                <Card.Header>
                  <b>Ringkasan Belanja</b>
                </Card.Header>
                <Card.Body>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Total Harga ({productCarts.length} Barang)
                    <b>Rp 9.999.999</b>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Total Diskon <b>Rp 9.999.999</b>
                  </div>
                  <hr />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Total Harga
                    <b>Rp 9.999.999</b>
                  </div>
                </Card.Body>
                <Button
                  variant="success"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "#f0ffee",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                  }}
                  {...(productCarts.length > 0 ? "" : { disabled: true })}
                >
                  <h5 style={{ marginTop: "5px" }}>
                    Beli ({productCarts.length})
                  </h5>
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default ProductCartComponents;
