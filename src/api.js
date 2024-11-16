import axios from "axios";

const api = axios.create({
  baseURL: "https://backendnextplayer.onrender.com/api", // Cambia esta URL si tu backend está en otra dirección o puerto
});

export default api;
