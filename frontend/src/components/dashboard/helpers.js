import axios from "axios";
export const getPractitioners = () => {
  return axios.get("/api/practitioners").then((res) => res.data);
};
