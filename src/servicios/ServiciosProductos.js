import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://my-json-server.typicode.com/alvarezrod/dbjson/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  obtenerProducto() {
    return apiClient.get("/productos/");
  },

  obtenerProductoId(id) {
    return apiClient.get("/productos/" + id);
  },
  obtenerProductos(perPage, page) {
    console.log("obtenerProductos: perPage =", perPage, "page =", page);
    return apiClient.get("/productos?_limit=" + perPage + "&_page=" + page);
  },
};
