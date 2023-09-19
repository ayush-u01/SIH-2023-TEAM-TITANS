import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import axios from "axios";
import { useSelector } from "react-redux";

export const axiosPrivate = axios.create({
  baseURL: "https://ec2-13-232-131-158.ap-south-1.compute.amazonaws.com/api",
  headers: { "Content-Type": "application/json" },
  //   withCredentials: true,
});

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  const requestIntercept = axiosPrivate.interceptors.request.use(
    (config) => {
      if (
        !config.headers["Authorization"] &&
        !config.headers["X-Refresh-Token"]
      ) {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "accessToken"
        )}`;
        config.headers["X-Refresh-Token"] = `Bearer ${localStorage.getItem(
          "refreshToken"
        )}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  axiosPrivate.interceptors.request.eject(requestIntercept);

  const responseIntercept = axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refresh();
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        prevRequest.headers["X-Refresh-Token"] = `Bearer ${localStorage.getItem(
          "refreshToken"
        )}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );
  axiosPrivate.interceptors.response.eject(responseIntercept);

  return axiosPrivate;
};

export default useAxiosPrivate;
