import axios from "axios";

const baseUrl = process.env.REACT_APP_Base_Url
console.log(process.env.REACT_APP_Base_Url,"<<<<<thisisbaseurlenvs") 
export const BASE_CALL = {
  post: async (url, payload) => await axios.post(baseUrl + url, payload),
  put: async (url, payload) =>
    await axios.put(baseUrl + url + `/${payload.id}`, payload),
  get: async (url, params) =>
    await axios.get(baseUrl + url, {
      params
    }),
  delete: async (url) => await axios.delete(baseUrl + url),
  formData: async (url, payload) => {
    const FormData = require("form-data");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: baseUrl + url,
      data: payload
    };

    let response = await axios.request(config);
    return response;
  },
  formDataPut: async (url, payload) => {
    const FormData = require("form-data");
    

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: baseUrl + url,
      data: payload
    };

    let response = await axios.request(config);
    return response;
  }
};
