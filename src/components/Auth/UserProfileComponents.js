import React, { useState, useEffect } from "react";
import {
  Card,
  Spinner,
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";
import axios from "axios";
import "../style/Category.css";
import BiodataComponents from "../Profile/BiodataComponents";
import AddressComponents from "../Profile/AddressComponents";
import PaymentComponents from "../Profile/PaymentComponents";
import NotificationComponents from "../Profile/NotificationComponents";
import BiodataStoreComponents from "../Profile/BiodataStoreComponents";

const api = "http://127.0.0.1:8000/";
const getToken = localStorage.getItem("token");

function UserProfileComponents() {
  const [user, setUser] = useState([]);
  const [toggle, setToggle] = useState(1);

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(api + "api/user", {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => {
          const data = res.data;
          setUser(data);
        })
        .catch((err) => {
          console.log(err.response)
          const data = err.response.data;
          setUser(data);
        });
    };
    getUser();
  }, []);

  const handleToggle = (index) => {
    setToggle(index);
  }

  return (
    <>
      {
        user ? (
          <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <Row>
              <Col sm={3} style={{ marginBottom: "2rem" }}>
                <Card style={{ marginTop: "2rem" }}>
                  <Card.Body>
                    <div>
                      <center>
                        <h4>{user.name}</h4>
                      </center>
                      <hr />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Sisa Kredit</span>
                        <span>Rp.1.000.000</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={9} style={{ marginBottom: "2rem" }}>
                <Card style={{ marginTop: "2rem" }}>
                  <div className="container-tabs">
                    <div className="block-tabs">
                      <div onClick={() => handleToggle(1)} className={toggle === 1 ? "tabs active-tabs" : "tabs"}>
                        <h5>Biodata Diri</h5>
                      </div>
                      <div onClick={() => handleToggle(2)} className={toggle === 2 ? "tabs active-tabs" : "tabs"}>
                        <h5>Biodata Toko</h5>
                      </div>
                      <div onClick={() => handleToggle(3)} className={toggle === 3 ? "tabs active-tabs" : "tabs"}>
                        <h5>Daftar Alamat</h5>
                      </div>
                      <div onClick={() => handleToggle(4)} className={toggle === 4 ? "tabs active-tabs" : "tabs"}>
                        <h5>Pembayaran</h5>
                      </div>
                      <div onClick={() => handleToggle(5)} className={toggle === 5 ? "tabs active-tabs" : "tabs"}>
                        <h5>Notifikasi</h5>
                      </div>
                    </div>
                    <div className="content-tabs">
                      <div  className={toggle === 1 ? "content active-content" : "content"}>
                        <BiodataComponents email={user.email} />
                      </div>
                      <div className={toggle === 2 ? "content active-content" : "content"}>
                        <BiodataStoreComponents email={user.email} />
                      </div>
                      <div className={toggle === 3 ? "content active-content" : "content"}>
                        <AddressComponents email={user.email} />
                      </div>
                      <div className={toggle === 4 ? "content active-content" : "content"}>
                        <PaymentComponents email={user.email} />
                      </div>
                      <div className={toggle === 5 ? "content active-content" : "content"}>
                        <NotificationComponents email={user.email} />
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>

        ) : (
          <center>
            <Spinner animation="border" style={{ margin: "15rem" }} />
          </center>
        )
      }
    </>
  );
}

export default UserProfileComponents;
