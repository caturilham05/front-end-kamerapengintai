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

const api = "http://127.0.0.1:8000/";
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
    <div>BiodataStoreComponents</div>
  )
}

export default BiodataStoreComponents