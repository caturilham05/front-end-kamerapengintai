import React, { useState, useEffect } from "react";
import axios from "axios";

const api = "http://127.0.0.1:8000/";

function UserProfileComponents(props) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(api + "api/user", {
          headers: {
            Authorization: `Bearer ${props.userId}`,
          },
        })
        .then((res) => {
          const data = res.data;
          setUser(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getUser();
  }, [props.userId]);
  return (
    <>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
    </>
  );
}

export default UserProfileComponents;
