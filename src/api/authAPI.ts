import axiosClient from "./axiosClient";

export const signin = (data) => {
  const url = "/auth/signin";
  return axiosClient.post(url, data);
};

export const signup = (data) => {
  const url = "/auth/signup";
  return axiosClient.post(url, data);
};
