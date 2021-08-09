import axios from "axios";

export const httpHeader = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "include": ""
  }
};
export const http = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:5000/api/' : 'http://localhost:5000/api/',
  headers: httpHeader,
});

http.interceptors.request.use(config => {
  if (localStorage.sessionApp) {
    let sessionApp = JSON.parse(localStorage.sessionApp);
    config.headers.Authorization = "Bearer " + sessionApp.token;
  }

  return config;
});

http.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response.status == 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);