import React, { useState, useEffect } from 'react'
import {
  Card,
  Spinner,
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

function BiodataComponents(props) {
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
              <div style={{ marginBottom: '1rem', fontWeight: '600', fontSize: '1.5rem' }}>
                {
                  recipient.approved === 1 ? (<span style={{color: '#ff9500'}}>Akun anda dalam proses verifikasi</span>) : (recipient.approved === 2 ? (<span style={{color: '#03AC0E'}}>Akun Terverifikasi</span>) : (<span style={{color: '#c63232'}}>Akun anda gagal dalam proses verifikasi</span>))
                }
              </div>

            )
        }
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
                      <Card.Img variant="top" src={recipient.owner_store_image === "" ? "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg" : "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"} />
                    )
                }
                <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem' }}>
                  <Button variant="light" style={{ borderColor: "#e4e4e4", width: '100%' }}>Pilih Foto</Button>
                </div>
                <Card.Text style={{ color: '#6c6c6c' }}>
                  Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
                </Card.Text>
              </Card.Body>
            </Card>
            <Button variant='light' style={{ borderColor: "#e4e4e4", width: '100%', marginBottom: '1rem', marginTop: '1rem' }}>Ganti Kata sandi</Button>
          </Col>
          <Col sm={8}>
            <Card.Text style={{ color: "#6c6c6c", fontWeight: '600' }}>Biodata Diri</Card.Text>
            <Row>
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
                        <span>Nama:</span>
                        <br />
                        <span>Alamat:</span>
                        <br />
                        <span>Tanggal Lahir:</span>
                        <br />
                        <span>Jenis Kelamin:</span>
                      </Col>
                      <Col sm={5} >
                        <span>{recipient.owner}</span>
                        <br />
                        {
                          recipient.address === null ? (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Tambah Alamat</Link>) : (<span>{recipient.address}</span>)
                        }
                        <br />
                        {
                          recipient.date_birth === null ? (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Tambah Tanggal Lahir</Link>) : (<span>{recipient.date_birth}</span>)
                        }
                        <br />
                        {
                          recipient.gender === 0 ? (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Tambah Jenis Kelamin</Link>) : (recipient.gender === 1 ? (<span>Laki - Laki</span>) : (<span>Perempuan</span>))
                        }
                      </Col>
                      <Col sm={3} style={{ textAlign: 'end' }}>
                        <Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Edit</Link>
                        <br />
                        {
                          recipient.date_birth === null ? ('') : (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Edit</Link>)
                        }
                        <br />
                        {
                          recipient.gender === 0 ? ('') : (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Edit</Link>)
                        }
                        <br />
                        {
                          recipient.gender === 0 ? ('') : (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Edit</Link>)
                        }
                      </Col>
                    </>
                  )
              }
            </Row>

            {/* Contact Person */}
            <Card.Text style={{ color: "#6c6c6c", fontWeight: '600', marginTop: '4rem' }}>Personal Kontak</Card.Text>
            <Row>
              {
                recipient.length === 0
                  ?
                  (
                    <center>
                      <Skeleton count={2} style={{ marginBottom: '1rem' }} />
                    </center>
                  )
                  :
                  (
                    <>
                      <Col sm={4}>
                        <span>Email:</span>
                        <br />
                        <span>Nomor HP:</span>
                      </Col>
                      <Col sm={5} >
                        {
                          recipient.email === null ? (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Tambah Email</Link>) : (<span>{recipient.email}</span>)
                        }
                        <br />
                        {
                          recipient.phone === null ? (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Tambah Nomor HP</Link>) : (<span>{recipient.phone}</span>)
                        }
                      </Col>
                      <Col sm={3} style={{ textAlign: 'end' }}>
                        {
                          recipient.email === null ? ('') : (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Edit</Link>)
                        }
                        <br />
                        {
                          recipient.phone === null ? ('') : (<Link to="/profile/biodata/edit" style={{ textDecoration: 'none', color: '#03AC0E' }}>Edit</Link>)
                        }
                      </Col>
                    </>
                  )
              }
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default BiodataComponents