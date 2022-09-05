import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import axios from "axios";

const api = "http://127.0.0.1:8000/";
const getToken = localStorage.getItem("token");
const getIdUser = localStorage.getItem("id");

function ProductCartComponents() {
  const [productCarts, setProductCarts] = useState([]);

  const decrementCounter = async (cart_id) => {
    setProductCarts((productCarts) =>
      productCarts.map((item) =>
        cart_id === item.id
          ? {
            ...item,
            qty: item.qty - (item.qty > 1 ? 1 : 0),
          }
          : item
      )
    );

    setProductCarts((productCarts) =>
      productCarts.map((item) =>
        cart_id === item.id
          ? { ...item, total_sale: item.sale * item.qty }
          : item
      )
    );

    const data = {
      qty: 1,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    };

    await axios
      .post(api + "api/product_cart_decrement/" + cart_id, data, { headers })
      .then((res) => {
        if (res.data.is_delete !== undefined) {
          alert(res.data.message);
          window.location.reload();
        }
      });
  };

  const incrementCounter = async (cart_id) => {
    setProductCarts((productCarts) =>
      productCarts.map((item) =>
        cart_id === item.id ? { ...item, qty: item.qty + 1 } : item
      )
    );

    setProductCarts((productCarts) =>
      productCarts.map((item) =>
        cart_id === item.id
          ? { ...item, total_sale: item.sale * item.qty }
          : item
      )
    );

    const data = {
      qty: 1,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    };

    await axios
      .post(api + "api/product_cart_increment/" + cart_id, data, { headers })
      .then((res) => { });
  };

  const deleteProductCart = async (cart_id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    };

    await axios
      .delete(api + "api/product_cart/" + cart_id, { headers })
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      });
  };

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
          const data = err.response.data;
          setProductCarts(data);
        });
    };
    getProducts();
  }, []);

  let priceRandom = Math.floor(Math.random() * 100000 + 1);
  let totalCart = 0;
  let grandTotalProducts = 0;
  let discountAll = 0;
  return (
    <>
      {productCarts.result?.length === 0 ? (
        <center>
          <div style={{ marginTop: "5rem", marginBottom: "5rem" }}>
            <h1>
              <b>{productCarts.message}</b>
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
                  {productCarts.map((item, i) => {
                    totalCart += item.qty;
                    grandTotalProducts += item.total_sale;
                    discountAll += item.discount;
                    return (
                      <Card.Body key={i}>
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
                                  width: "7.5rem",
                                  marginLeft: "1.5rem",
                                  cursor: "pointer",
                                }}
                              ></Card.Img>
                            </div>
                          </Col>
                          <Col sm={8}>
                            <Link
                              to={`/products/${item.product_id}`}
                              style={{
                                cursor: "pointer",
                                textDecoration: "none",
                                color: "#000",
                              }}
                            >
                              {" "}
                              <Card.Text>{item.title}</Card.Text>
                            </Link>
                            <Card.Text>
                              <b>
                                {item.sale === 1
                                  ? "Rp " +
                                  priceRandom.toLocaleString('id', {
                                    minimumFractionDigits: 2,
                                  })
                                  : "Rp " +
                                  item.sale.toLocaleString('id', {
                                    minimumFractionDigits: 2,
                                  })}
                              </b>
                            </Card.Text>
                          </Col>
                        </Row>
                        <div
                          className="d-flex"
                          style={{
                            margin: "1rem",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlTextarea1"
                            >
                              <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Catatan Tambahan (Pastikan tidak ada data pribadi)"
                              />
                            </Form.Group>
                          </Form>
                          <span>
                            Pindahkan ke Wishlist <FcLike /> |{" "}
                            <FiTrash2
                              onClick={() => deleteProductCart(item.id)}
                              style={{ cursor: "pointer" }}
                            />
                          </span>
                          <span>
                            <button
                              className="btn btn-secondary"
                              style={{
                                marginLeft: "1rem",
                                marginRight: "1rem",
                              }}
                              onClick={() => decrementCounter(item.id)}
                              type="button"
                            >
                              -
                            </button>
                            <span>{item.qty}</span>
                            <button
                              className="btn btn-secondary"
                              style={{
                                marginLeft: "1rem",
                                marginRight: "1rem",
                              }}
                              onClick={() => incrementCounter(item.id)}
                              type="button"
                            >
                              +
                            </button>
                          </span>
                        </div>
                      </Card.Body>
                    );
                  })}
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
                    Total Harga ({totalCart} Qty)
                    <b>
                      Rp{" "}
                      {grandTotalProducts.toLocaleString('id', {
                        minimumFractionDigits: 2,
                      })}
                    </b>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Total Diskon
                    <b>
                      Rp{" "}
                      {discountAll.toLocaleString('id', {
                        minimumFractionDigits: 2,
                      })}
                    </b>
                  </div>
                  <hr />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Total Harga
                    <b>
                      Rp{" "}
                      {(grandTotalProducts - discountAll).toLocaleString(
                        "id",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </b>
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
                  as={Link} to="/checkout"
                >
                  <h5 style={{ marginTop: "5px" }}>Checkout</h5>
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
