import React, { useState, useEffect } from 'react'
import {
  Card,
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from "axios";

const api = "http://lara-kamerapengintai.my.id/";
const getToken = localStorage.getItem("token");

function BiodataStoreComponents(props) {
  const [recipient, setRecipient] = useState([])
  useEffect(() => {
    if (props.userId !== 'undefined') {
      const getUsers = async () => {
        await axios.get(api + "api/recipient_detail/" + props.email, {
          headers: {
            Authorization: `Bearer ${getToken}`
          }
        })
          .then((res) => {
            setRecipient(res.data.result)
          })
          .catch((err) => {
            console.log(err)
          })
      }
      getUsers()
    }
  }, [props.email])

  return (
    <>
      <Container>
        {
          recipient.length === 0
            ?
            (
              <center>
                <Skeleton style={{ marginBottom: '1rem' }} />
              </center>

            )
            :
            (
              <Row>
                <Col sm={4}>
                  <Card className="card_profile">
                    <Card.Body>
                      {
                        recipient.length === 0
                          ?
                          (
                            <center>
                              <Skeleton circle height={100} width={100} style={{ marginBottom: '1rem' }} />
                            </center>
                          )
                          :
                          (
                            <>
                              <Card.Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Foto Toko</Card.Text>
                              <Card.Img variant="top" src={recipient.store_image === "" ? "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg" : "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"} />
                              <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem' }}>
                                <Button variant="light" style={{ borderColor: "#e4e4e4", width: '100%' }}>Pilih Foto</Button>
                              </div>
                              <hr />
                              <Card.Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Foto Pemilik Toko di Depan Toko</Card.Text>
                              <Card.Img variant="top" src={recipient.store_image === "" ? "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg" : "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"} />
                              <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem' }}>
                                <Button variant="light" style={{ borderColor: "#e4e4e4", width: '100%' }}>Pilih Foto</Button>
                              </div>
                            </>
                          )
                      }
                      <Card.Text style={{ color: '#6c6c6c' }}>
                        Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={8}>
                  <Card.Text style={{ color: "#6c6c6c", fontWeight: '600' }}>Biodata Toko</Card.Text>
                  <Row style={{ paddingBottom: '1rem' }}>
                    {
                      recipient.length === 0
                        ?
                        (
                          <center>
                            <Skeleton count={4} style={{ marginBottom: '1rem' }} />
                          </center>
                        )
                        :
                        (
                          <>
                            <Col sm={4}>
                              <span>Nama Toko:</span>
                              <br />
                              <br />
                              <span>Email:</span>
                              <br />
                              <br />
                              <span>Alamat Toko:</span>
                              <br />
                              <br />
                              <span>Deskripsi Toko:</span>
                              <br />
                              <br />
                              <span>Lebar Jalan:</span>
                              <br />
                              <br />
                              <span>Posisi Toko:</span>
                              <br />
                              <br />
                            </Col>
                            <Col sm={5}>
                              {
                                recipient.name === null ? (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Nama toko belum diisi</Link>) : (<span>{recipient.name}</span>)
                              }
                              <br />
                              <br />
                              {
                                recipient.email === null ? (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Email belum diisi</Link>) : (<span>{recipient.email}</span>)
                              }
                              <br />
                              <br />
                              {
                                recipient.location.length === 0 ? (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Lokasi toko belum diisi</Link>) : (<span>{recipient.location.detail}</span>)
                              }
                              <br />
                              <br />
                              {
                                recipient.description === null ? (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Deskripsi toko belum diisi</Link>) : (<span>{recipient.name}</span>)
                              }
                              <br />
                              <br />
                              {
                                recipient.street_width === 0 ? (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Lebar Jalan belum diisi</Link>) : (<span>{recipient.name}</span>)
                              }
                              <br />
                              <br />
                              {
                                recipient.store_position === 0 ? (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Posisi toko belum diisi</Link>) : (<span>{recipient.name}</span>)
                              }
                              <br />
                              <br />
                            </Col>
                            <Col sm={3} style={{ textAlign: 'end' }}>
                              {
                                recipient.name === null ? ('') : (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Edit</Link>)
                              }
                              <br />
                              <br />
                              {
                                recipient.email === null ? ('') : (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Edit</Link>)
                              }
                              <br />
                              <br />
                              {
                                recipient.location.length === 0 ? ('') : (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Edit</Link>)
                              }
                              <br />
                              <br />
                              {
                                recipient.description === null ? ('') : (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Edit</Link>)
                              }
                              <br />
                              <br />
                              {
                                recipient.street_width === 0 ? ('') : (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Edit</Link>)
                              }
                              <br />
                              <br />
                              {
                                recipient.store_position === 0 ? ('') : (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Edit</Link>)
                              }
                              <br />
                            </Col>
                          </>
                        )
                    }
                  </Row>
                </Col>
              </Row>
            )
        }
      </Container>
    </>
  )
}

export default BiodataStoreComponents