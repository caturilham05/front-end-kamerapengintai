import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { AiOutlineInfoCircle } from "react-icons/ai";
import "../style/Category.css";
import axios from "axios";

const api = "http://127.0.0.1:8000/";
const getToken = localStorage.getItem("token");
const getIdUser = localStorage.getItem("id");

function ProductCartCheckoutComponents() {
  const [show, setShow] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseAddress = () => setShowAddress(false);
  const handleCloseShipping = () => setShowShipping(false);
  const handleCloseVoucher = () => setShowVoucher(false);

  const handleShow = () => setShow(true);
  const handleShowAddress = () => setShowAddress(true);
  const handleShowShipping = () => setShowShipping(true);
  const handleShowVoucher = () => setShowVoucher(true);

  const InfoTax = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Form>
          <Form.Check type="checkbox" label="Lampirkan Faktur Pajak" />
        </Form>
        <AiOutlineInfoCircle style={{ cursor: 'pointer' }} onClick={() => handleShow()}
        />
      </div>

    );
  }

  const ShippingOptions = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p>SiCepat Regular Package</p>
        <p style={{ color: '#03AC0E', cursor: 'pointer' }} onClick={() => handleShowShipping()}>Ganti Ekspedisi</p>
      </div>
    )
  }

  const VoucherOptions = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p>Promo Gratis Ongkir Pembelian Minimal Rp 1.000.000</p>
        <p style={{ color: '#03AC0E', cursor: 'pointer' }} onClick={() => handleShowVoucher()}>Ganti Promo Voucher</p>
      </div>
    )
  }

  const InfoTaxModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lampirkan Faktur Pajak</Modal.Title>
        </Modal.Header>
        <Modal.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan sagittis arcu, ac lacinia arcu. Duis turpis mi, luctus non efficitur eu, venenatis non velit. Ut ac quam magna. Sed suscipit nunc ac nisl tempor, a vestibulum arcu pulvinar. Duis in lacinia ante. Proin at turpis cursus, tempus ipsum in, cursus tortor. Maecenas nulla dui, convallis vitae lorem eget, pharetra hendrerit sapien. Morbi sed lacus aliquam, finibus felis ut, viverra urna. Fusce sollicitudin mi iaculis turpis elementum, in rutrum odio fermentum. Fusce mattis, diam ut rutrum iaculis, risus arcu porta leo, quis interdum sem leo vitae purus. Suspendisse dictum erat a purus tempus, non gravida neque tempus. Vivamus vel euismod erat, sed eleifend metus.
          Aliquam erat volutpat. Mauris nunc turpis, volutpat a iaculis vel, faucibus vel sapien. Duis vehicula, felis a dictum vulputate, nisi dolor vehicula quam, ut feugiat sem ipsum eu purus. Ut ut orci dui. Quisque mollis ante et velit convallis mattis. Fusce commodo eu elit ac ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer varius ligula ut turpis ultricies convallis. Quisque porta, lacus ut varius ullamcorper, justo arcu ornare mauris, quis efficitur quam risus eu neque. Quisque ultrices elit eu tellus sagittis, nec mollis risus interdum.</Modal.Body>
      </Modal>
    )
  }

  const AddressModal = () => {
    return (
      <Modal show={showAddress} onHide={handleCloseAddress}>
        <Modal.Header closeButton>
          <Modal.Title>Ganti Alamat Rumah</Modal.Title>
        </Modal.Header>
        <Modal.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan sagittis arcu, ac lacinia arcu. Duis turpis mi, luctus non efficitur eu, venenatis non velit. Ut ac quam magna. Sed suscipit nunc ac nisl tempor, a vestibulum arcu pulvinar. Duis in lacinia ante. Proin at turpis cursus, tempus ipsum in, cursus tortor. Maecenas nulla dui, convallis vitae lorem eget, pharetra hendrerit sapien. Morbi sed lacus aliquam, finibus felis ut, viverra urna. Fusce sollicitudin mi iaculis turpis elementum, in rutrum odio fermentum. Fusce mattis, diam ut rutrum iaculis, risus arcu porta leo, quis interdum sem leo vitae purus. Suspendisse dictum erat a purus tempus, non gravida neque tempus. Vivamus vel euismod erat, sed eleifend metus.
          Aliquam erat volutpat. Mauris nunc turpis, volutpat a iaculis vel, faucibus vel sapien. Duis vehicula, felis a dictum vulputate, nisi dolor vehicula quam, ut feugiat sem ipsum eu purus. Ut ut orci dui. Quisque mollis ante et velit convallis mattis. Fusce commodo eu elit ac ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer varius ligula ut turpis ultricies convallis. Quisque porta, lacus ut varius ullamcorper, justo arcu ornare mauris, quis efficitur quam risus eu neque. Quisque ultrices elit eu tellus sagittis, nec mollis risus interdum.</Modal.Body>
      </Modal>
    )
  }

  const ShippingOptionsModal = () => {
    return (
      <Modal show={showShipping} onHide={handleCloseShipping}>
        <Modal.Header closeButton>
          <Modal.Title>Pilih Ekspedisi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan sagittis arcu, ac lacinia arcu. Duis turpis mi, luctus non efficitur eu, venenatis non velit. Ut ac quam magna. Sed suscipit nunc ac nisl tempor, a vestibulum arcu pulvinar. Duis in lacinia ante. Proin at turpis cursus, tempus ipsum in, cursus tortor. Maecenas nulla dui, convallis vitae lorem eget, pharetra hendrerit sapien. Morbi sed lacus aliquam, finibus felis ut, viverra urna. Fusce sollicitudin mi iaculis turpis elementum, in rutrum odio fermentum. Fusce mattis, diam ut rutrum iaculis, risus arcu porta leo, quis interdum sem leo vitae purus. Suspendisse dictum erat a purus tempus, non gravida neque tempus. Vivamus vel euismod erat, sed eleifend metus.
          Aliquam erat volutpat. Mauris nunc turpis, volutpat a iaculis vel, faucibus vel sapien. Duis vehicula, felis a dictum vulputate, nisi dolor vehicula quam, ut feugiat sem ipsum eu purus. Ut ut orci dui. Quisque mollis ante et velit convallis mattis. Fusce commodo eu elit ac ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer varius ligula ut turpis ultricies convallis. Quisque porta, lacus ut varius ullamcorper, justo arcu ornare mauris, quis efficitur quam risus eu neque. Quisque ultrices elit eu tellus sagittis, nec mollis risus interdum.</Modal.Body>
      </Modal>
    )
  }

  const VoucherOptionsModal = () => {
    return (
      <Modal show={showVoucher} onHide={handleCloseVoucher}>
        <Modal.Header closeButton>
          <Modal.Title>Pilih Promo Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan sagittis arcu, ac lacinia arcu. Duis turpis mi, luctus non efficitur eu, venenatis non velit. Ut ac quam magna. Sed suscipit nunc ac nisl tempor, a vestibulum arcu pulvinar. Duis in lacinia ante. Proin at turpis cursus, tempus ipsum in, cursus tortor. Maecenas nulla dui, convallis vitae lorem eget, pharetra hendrerit sapien. Morbi sed lacus aliquam, finibus felis ut, viverra urna. Fusce sollicitudin mi iaculis turpis elementum, in rutrum odio fermentum. Fusce mattis, diam ut rutrum iaculis, risus arcu porta leo, quis interdum sem leo vitae purus. Suspendisse dictum erat a purus tempus, non gravida neque tempus. Vivamus vel euismod erat, sed eleifend metus.
          Aliquam erat volutpat. Mauris nunc turpis, volutpat a iaculis vel, faucibus vel sapien. Duis vehicula, felis a dictum vulputate, nisi dolor vehicula quam, ut feugiat sem ipsum eu purus. Ut ut orci dui. Quisque mollis ante et velit convallis mattis. Fusce commodo eu elit ac ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer varius ligula ut turpis ultricies convallis. Quisque porta, lacus ut varius ullamcorper, justo arcu ornare mauris, quis efficitur quam risus eu neque. Quisque ultrices elit eu tellus sagittis, nec mollis risus interdum.</Modal.Body>
      </Modal>
    )
  }

  return (
    <>
      <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Row>
          <Col sm={4}>
            <Card className="card_profile" style={{ position: 'fixed', width: '28%' }}>
              <div style={{ textAlign: 'center', marginTop: '5px' }}>
                <h4>Keranjang Belanja</h4>
                <div style={{ border: '0.7px solid grey', margin: '0 30% 1rem 30%' }}></div>
              </div>
              <Card.Body>
                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '2rem' }}>
                  <Card.Img
                    variant="top"
                    src="http://kamerapengintai.com/images/modules/warehouse/product/944/wallmount-bracket.png"
                    onError={(e) => {
                      e.target.src =
                        "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg";
                      e.target.onError = null;
                    }}
                    style={{
                      width: "30%",
                      marginLeft: "1.5rem",
                      marginRight: "1.5rem",
                      cursor: "pointer",
                    }}
                  ></Card.Img>
                  <div>
                    <Card.Text>Product Abal - abal 1 sdbfjkdsfjb ds fbk (10)</Card.Text>
                    <Card.Text>Rp 100.000.000</Card.Text>
                    <Card.Text>Discount: Rp 1.000.000</Card.Text>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '2rem' }}>
                  <Card.Img
                    variant="top"
                    src="http://kamerapengintai.com/images/modules/warehouse/product/1060/lb1-color.png"
                    onError={(e) => {
                      e.target.src =
                        "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg";
                      e.target.onError = null;
                    }}
                    style={{
                      width: "30%",
                      marginLeft: "1.5rem",
                      marginRight: "1.5rem",
                      cursor: "pointer",
                    }}
                  ></Card.Img>
                  <div>
                    <Card.Text>Product Abal - abal dsfbdskfb df jsbd (1)</Card.Text>
                    <Card.Text>Rp 10.000.000</Card.Text>
                    <Card.Text>Discount: Rp 1.000.000</Card.Text>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '1rem', marginRight: '1rem' }}>
                  <span>Total Belanja:</span>
                  <span>Rp 110.000.000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '1rem', marginRight: '1rem' }}>
                  <span>Total Diskon:</span>
                  <span>Rp 2.000.000</span>
                </div>
                <div style={{ border: '0.7px solid grey', margin: '1rem 5% 1rem 5%' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '1rem', marginRight: '1rem' }}>
                  <b>Total Pembayaran:</b>
                  <b>Rp 108.000.000</b>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={8}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <h4>Informasi Pemesanan</h4>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Card.Text>Alamat Rumah</Card.Text>
              <Card.Text style={{ color: '#03AC0E', cursor: 'pointer' }} onClick={() => handleShowAddress()}>Ganti Alamat Rumah</Card.Text>
            </div>
            <Card.Text>Semarang Barat Rt 04 Rw 03 No 299, Kota Semarang, Jawa Tengah, Indonesia</Card.Text>
            <Card.Text>08999999999999</Card.Text>
            <hr />
            <ShippingOptions />
            <hr />
            <InfoTax />
            <hr />
            <VoucherOptions />
            <hr />
          </Col>
        </Row>
      </Container>
      <InfoTaxModal />
      <AddressModal />
      <ShippingOptionsModal />
      <VoucherOptionsModal />
    </>
  )
}

export default ProductCartCheckoutComponents