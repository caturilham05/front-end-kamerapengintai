import React, { useState, useEffect } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "../style/Category.css";

const api = "http://127.0.0.1:8000/";
const getToken = localStorage.getItem("token");

function ProductComponents() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get(api + "api/products?page=1", {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => {
          const data = res.data.result;
          setProducts(data);
        })
        .catch((err) => {
        console.log(err.message);
        });
    };
    getProducts();
  }, []);
  // eslint-disable-next-line eqeqeq
  let cekProducts = products == "" ? true : false;
  const fetchProducts = async (currentPage) => {
    const res = await axios.get(api + `api/products?page=${currentPage}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    const data = res.data.result;
    return data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const paginateProducts = await fetchProducts(currentPage);
    setProducts(paginateProducts);
  };

  return (
    <>
      <Card style={{ marginTop: "2rem" }}>
        <Card.Header>Semua Produk</Card.Header>
        {cekProducts ? (
          <center>
            <Spinner animation="border" />
          </center>
        ) : (
          <Container>
            <div className="container_products">
              {products.data?.map((item, index) => (
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
                        >
                          {item.sku}
                        </Link>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </center>
              ))}
            </div>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={products.last_page}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            ></ReactPaginate>
          </Container>
        )}
      </Card>
    </>
  );
}

export default ProductComponents;
