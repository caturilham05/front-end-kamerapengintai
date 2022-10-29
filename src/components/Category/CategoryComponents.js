import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import ProductComponents from "../Products/ProductComponents";
import "../style/Category.css";

const api = process.env.REACT_APP_API;
const getToken = localStorage.getItem("token");

function CategoryComponents() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get(api + "api/product_categories", {
        headers: { Authorization: `Bearer ${getToken}` },
      })
      .then((res) => {
        setCategory(res.data.result);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Row>
          <Col sm={8} style={{marginBottom: "2rem"}}>
            <Card>
              <Card.Header>Kategori Pilihan</Card.Header>
              <Container className="custom_container">
                {category.length !== 0 ? (
                  category
                  .filter((item) => item.image !== "")
                  .map((item, index) => (
                    <Card.Body key={index}>
                      <Card.Img
                        variant="top"
                        src={
                          item.image === ""
                            ? "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                            : "http://kamerapengintai.com/images/modules/warehouse/product_category/" +
                              item.image
                        }
                        style={
                          item.image !== ""
                            ? {
                                backgroundColor: "#6c6c6c",
                                width: "23rem",
                                height: "11rem",
                                borderRadius: "10px",
                                padding: "1rem",
                              }
                            : {
                                backgroundColor: "white",
                                width: "13rem",
                                height: "11rem",
                                borderRadius: "10px",
                                padding: "1rem",
                              }
                        }
                      />
                    </Card.Body>
                  ))
                ) : (
                  <center>
                    <Spinner animation="border" />
                  </center>
                )}
              </Container>
            </Card>
          </Col>
          <Col sm={4}>
            <Card>
              <Card.Header>Promo Spesial Lebaran</Card.Header>
              <Container className="custom_container">
                {category.length !== 0 ? (
                  category
                    .filter((item) => item.name === "VISILINK" || item.name === "AMAZFIT" || item.name === "EZVIZ")
                    .map((item, index) => (
                      <Card.Body key={index}>
                        <Card.Img
                          variant="top"
                          src={
                            "http://kamerapengintai.com/images/modules/warehouse/product_category/" +
                            item.image
                          }
                          style={{
                            backgroundColor: "#6c6c6c",
                            width: "15rem",
                            height: "11rem",
                            borderRadius: "10px",
                            padding: "1rem",
                          }}
                        />
                      </Card.Body>
                    ))
                ) : (
                  <center>
                    <Spinner animation="border" />
                  </center>
                )}
              </Container>
            </Card>
          </Col>
        </Row>
        <Card style={{ marginTop: "2rem" }}>
          <Card.Header>Pencarian Terpopuler</Card.Header>
          <Container className="d-flex">
            <Card.Body>
              <Card.Img
                variant="top"
                src="http://kamerapengintai.com/images/modules/warehouse/product_category/6012a11225f98.png"
                style={{
                  backgroundColor: "#6c6c6c",
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  padding: "1rem",
                }}
              />
            </Card.Body>
            <Card.Body>
              <Card.Img
                variant="top"
                src="http://kamerapengintai.com/images/modules/warehouse/product_category/6012a1231b1ee.png"
                style={{
                  backgroundColor: "#6c6c6c",
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  padding: "1rem",
                }}
              />
            </Card.Body>
            <Card.Body>
              <Card.Img
                variant="top"
                src="http://kamerapengintai.com/images/modules/warehouse/product_category/608ba4cec7a95.png"
                style={{
                  backgroundColor: "#6c6c6c",
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  padding: "1rem",
                }}
              />
            </Card.Body>
          </Container>
        </Card>
        <ProductComponents />
      </Container>
    </>
  );
}

export default CategoryComponents;
