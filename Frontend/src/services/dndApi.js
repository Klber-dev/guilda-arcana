import axios from "axios";

const dndApi = axios.create({
  baseURL: "https://www.dnd5eapi.co/api/2014",
});

export default dndApi;