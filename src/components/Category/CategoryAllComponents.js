import React, { useState, useEffect } from "react";
import { Card, Spinner, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/Category.css";

const api = "http://lara-kamerapengintai.my.id/";

function CategoryAllComponents() {
  const [categoryAll, setCategoryAll] = useState([]);
  useEffect(() => {
    const getCategoryAll = async () => {
      await axios
        .get(api + "api/product_categories_grouping")
        .then((res) => {
          const data = res.data.result;
          setCategoryAll(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getCategoryAll();
  }, []);
  // eslint-disable-next-line eqeqeq
  let cekCategoryAll = categoryAll == "" ? true : false;
  return (
    <Container>
      <Card style={{ marginTop: "2rem" }}>
        <Card.Header>Semua Kategori</Card.Header>
        {cekCategoryAll ? (
          <center>
            <Spinner animation="border" />
          </center>
        ) : (
          <>
            <Row
              style={{
                margin: "1rem",
                padding: "1rem",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#6c6c6c",
              }}
            >
              <Col sm={4}>
                {categoryAll.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                  >
                    <span>
                      <h5>{item.name}</h5>
                    </span>
                    {item.grouping_par_id?.map((item1, index1) => (
                      <Link key={index1} to='/' className="text_product"
                      >
                        {item1.name}
                        &nbsp;|&nbsp;
                      </Link>
                    ))}
                  </div>
                ))}
              </Col>
              <Col sm={4}>
                {categoryAll.slice(3, 6).map((item, index) => (
                  <div
                    key={index}
                  >
                    <span>
                      <h5>{item.name}</h5>
                    </span>
                    {item.grouping_par_id?.map((item1, index1) => (
                      <Link key={index1} to='/' className="text_product"
                      >
                        {item1.name}
                        &nbsp;|&nbsp;
                      </Link>
                    ))}
                  </div>
                ))}
              </Col>
              <Col sm={4}>
                {categoryAll.slice(6, 9).map((item, index) => (
                  <div
                    key={index}
                  >
                    <span>
                      <h5>{item.name}</h5>
                    </span>
                    {item.grouping_par_id?.map((item1, index1) => (
                      <Link key={index1} to='/' className="text_product"
                      >
                        {item1.name}
                        &nbsp;|&nbsp;
                      </Link>
                    ))}
                  </div>
                ))}
              </Col>
            </Row>
          </>
        )}
      </Card>
    </Container>
  );
}

export default CategoryAllComponents;
