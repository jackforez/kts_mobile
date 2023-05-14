import axios from "axios";

export const ktsRequest = axios.create({
  baseURL: "https://api.ktscorp.vn/api",
  //react-native
  // baseURL: "http://192.168.1.219:5000/api",
  //reactJS
  // baseURL: "http://localhost:5000/api",
});

export const ktsSocket = "";
