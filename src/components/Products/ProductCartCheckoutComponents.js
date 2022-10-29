import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineHome, AiOutlinePlus, AiOutlineInfoCircle } from "react-icons/ai";
import { GrTicket } from "react-icons/gr";
import { FiTruck } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";
import "../style/Category.css";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { shipping, address, payment } from '../../utils/data.js'
import axios from "axios";
import { RootContext } from '../../utils/Context';
import context from 'react-bootstrap/esm/AccordionContext';


const api = process.env.REACT_APP_API;
const getToken = localStorage.getItem("token");
const getIdUser = localStorage.getItem("id");

function ProductCartCheckoutComponents() {
  const [checkout, setCheckout] = useState([]);

  useEffect(() => {
    axios.get(api + "api/product_cart_checkout/" + getIdUser, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      }
    })
      .then((res) => {
        const data = res.data.result
        setCheckout(data)
      })
      .catch((err) => {
        if (err.response.status !== 200) {
          alert('Pengguna tidak ditemukan')
        }
      })
  }, [])

  const [show, setShow] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selected, setSelected] = useState([])

  const handleClose = () => setShow(false);
  const handleCloseAddress = () => setShowAddress(false);
  const handleCloseShipping = () => setShowShipping(false);
  const handleCloseVoucher = () => setShowVoucher(false);
  const handleClosePayment = () => setShowPayment(false);

  const handleShow = () => setShow(true);
  const handleShowAddress = () => setShowAddress(true);
  const handleShowShipping = () => setShowShipping(true);
  const handleShowVoucher = () => setShowVoucher(true);
  const handleShowPayment = () => setShowPayment(true);

  const [changePayment, setChangePayment] = useState('Pilih metode pembayaran');

  const InfoTax = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Form>
          <Form.Check type='checkbox' label='Lampirkan Faktur Pajak' />
        </Form>
        <AiOutlineInfoCircle style={{ cursor: 'pointer' }} onClick={() => handleShow()} />
      </div>
    )
  }

  const InfoAddress = () => {
    const { contextAddress } = useContext(RootContext)
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Card.Text>Alamat Rumah</Card.Text>
          <Card.Text style={{ color: '#03AC0E', cursor: 'pointer' }} onClick={() => handleShowAddress()}><AiOutlineHome style={{ marginRight: '0.2rem', color: '#000' }} /> Ganti Alamat Rumah</Card.Text>
        </div>
        <h5>{contextAddress && contextAddress.name}</h5>
        <Card.Text>{contextAddress && contextAddress.address}, {contextAddress && contextAddress.location_name}</Card.Text>
        <Card.Text>{contextAddress && contextAddress.description}</Card.Text>
        <Card.Text>{contextAddress && contextAddress.phone}</Card.Text>
      </>
    )
  }

  const ShippingOptions = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {selected.length === 0 ? (<p>Silahkan pilih ekspedisi</p>) : (<p>{selected}</p>)}
        <p style={{ color: '#03AC0E', cursor: 'pointer' }} onClick={() => handleShowShipping()}><FiTruck style={{ color: '#000', marginRight: '0.2rem' }} /> Ganti Ekspedisi</p>
      </div>
    )
  }

  const VoucherOptions = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p>Promo Gratis Ongkos Kirim Dengan Minimal Pembelian Rp 1.000.000</p>
        <p style={{ color: '#03AC0E', cursor: 'pointer' }} onClick={() => handleShowVoucher()}><GrTicket style={{ marginRight: '0.2rem' }} /> Ganti Promo Voucher</p>
      </div>
    )
  }

  const PaymentMethod = () => {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p>{changePayment}</p>
          <p style={{ color: '#03AC0E', cursor: 'pointer' }} onClick={() => handleShowPayment()}><MdOutlinePayment style={{ marginRight: '0.2rem', color: '#000' }} /> Ganti Metode Pembayaran</p>
        </div>
        {
          changePayment === 'Tempo' && <small>Sisa Limit Anda Rp {checkout.user_address && checkout.user_address.remaining_credit_limit.toLocaleString('id', { minimumFractionDigits: 2 })}</small>
        }
      </>
    )
  }

  const ProcessPayment = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
        <Button
          variant="success"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#f0ffee",
            width: '30%'
          }}
        >
          <span style={{ fontSize: '20px', margin: '5px 0' }}>Buat Pesanan</span>
        </Button>
      </div>
    )
  }

  const AddressModal = () => {
    const { handleDispatchContext } = useContext(RootContext)
    const handleUpdateAddress = async (addressId, newDatas) => {
      const data = {
        address_primary: 1,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken}`,
      };
      await axios.post(api + "api/product_cart_checkout/" + addressId, data, { headers })
        .then((res) => {
          if (res.status === 200) {
            handleDispatchContext('CHANGE_ADDRESS', { newAddress: newDatas })
          }
        })
      handleCloseAddress(false);
    }

    return (
      <Modal show={showAddress} onHide={handleCloseAddress}>
        <Modal.Header closeButton>
          <Modal.Title>Ganti Alamat Rumah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            checkout.user_address_list && checkout.user_address_list.map((v, k) => {
              const isAddressPrimary = v.address_primary === 1 ? 'Alamat utama' : 'Alamat Lainnya'
              const storeType = v.store_type === 1 ? ('Toko') : (v.store_type === 2 ? ('Gudang') : (v.store_type === 3 ? ('Rumah') : (v.store_type === 4 ? ('Kantor') : (v.store_type === 5 ? ('Lainnya') : ''))))
              return (
                <Card className='card_on_modal' key={k} onClick={() => handleUpdateAddress(v.id, v)}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <p>{storeType}</p>
                    <p>{isAddressPrimary}</p>
                  </div>
                  <div style={{ cursor: 'pointer' }}>
                    <h4>{v.name}</h4>
                    <h5>{v.address}, {v.location_name}</h5>
                    <p>{v.description}</p>
                    <p>{v.phone}</p>
                  </div>
                </Card>
              )
            })
          }
          <div style={{ display: 'flex', justifyContent: '' }}>
            <Button
              variant="outline-success"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: '100%'
              }}
            >
              <span style={{ fontSize: '20px', margin: '5px 0' }}><AiOutlinePlus /> Tambah Alamat Baru</span>
            </Button>
          </div>
        </Modal.Body>
      </Modal>
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

  const ShippingOptionsModal = () => {
    return (
      <Modal show={showShipping} onHide={handleCloseShipping}>
        <Modal.Header closeButton>
          <Modal.Title>Pilih Ekspedisi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typeahead id="shipping" onChange={setSelected} options={shipping} placeholder='Pilih Ekspedisi ...' selected={selected} />
        </Modal.Body>
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

  const PaymentMethodModal = () => {
    return (
      <Modal show={showPayment} onHide={handleClosePayment}>
        <Modal.Header closeButton>
          <Modal.Title>Pilih Metode Pembayaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            checkout.payment_method && checkout.payment_method.map((v, k) => {
              const paymentType = v.type === 1 ? ('Cash') : (v.type === 2 ? ('COD') : (v.type === 3 ? ('Tempo') : ''))
              const limitCredit = v.limit === 0 ? ('') : v.limit.toLocaleString('id', { minimumFractionDigits: 2 })
              const handlePayment = (value) => {
                setChangePayment(value);
                handleClosePayment(false);
              }
              return (
                <Card className='card_on_modal' key={k} onClick={() => handlePayment(paymentType)}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <p>{v.title}</p>
                    <p>{v.text !== "" && v.text}</p>
                  </div>
                  {
                    v.text === "" && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p>Sisa Limit Anda</p>
                        <p>Rp {limitCredit}</p>
                      </div>
                    )
                  }
                </Card>
              )
            })
          }
        </Modal.Body>
      </Modal>
    )
  }

  let userAddress = checkout && checkout.user_address;
  const [contextAddress, setContextAddress] = useState({})
  useEffect(() => { setContextAddress(userAddress) })
  let baru = '';
  const handleDispatchContext = (action, payload) => {
    switch (action) {
      case 'CHANGE_ADDRESS':
        let newAddress = payload.newAddress
        let newAddressId = payload.newAddress.id
        setContextAddress((contextAddress) => {
            let baru = contextAddress.id !== newAddressId && { ...contextAddress, newAddress }
          }
          );
          return baru;
        break;

      default:
        break;
    }
  }

  console.log(baru)

  return (
    <>
      <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Row>
          <Col sm={4}>
            <Card className='card_profile' style={{ position: 'fixed', width: '28%' }}>
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
                    <Card.Text>Product Abal - abal 1 (10)</Card.Text>
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
                    <Card.Text>Product Abal - abal 2 (1)</Card.Text>
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
            <RootContext.Provider value={{ contextAddress, handleDispatchContext }}>
              <InfoAddress />
              <AddressModal />
              <hr />
              <ShippingOptions />
              <ShippingOptionsModal />
              <hr />
              <InfoTax />
              <InfoTaxModal />
              <hr />
              <VoucherOptions />
              <VoucherOptionsModal />
              <hr />
              <PaymentMethod />
              <PaymentMethodModal />
              <ProcessPayment />
            </RootContext.Provider>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProductCartCheckoutComponents