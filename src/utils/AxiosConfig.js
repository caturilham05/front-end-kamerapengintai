import axios from "axios";

function AxiosConfig() {
    const api = "http://localhost:8000/";
    const getToken = localStorage.getItem("token");
    const getId = localStorage.getItem("id");

    const authAxios = axios.create({
        baseURL: api,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
        id: getId,
      });
    
        return authAxios;
}
export default AxiosConfig;