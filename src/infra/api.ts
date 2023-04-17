import axios from "axios";
import config from "../config";

export default axios.create({
  baseURL: config.api,
  timeout: 5000,
});
