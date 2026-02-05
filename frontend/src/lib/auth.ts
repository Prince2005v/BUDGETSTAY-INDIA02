import api from "./api";

export const registerUser = (data: {
  name: string;
  phone: string;
  password: string;
}) => {
  return api.post("/auth/register", data);
};

export const loginUser = (data: {
  phone: string;
  password: string;
}) => {
  return api.post("/auth/login", data);
};
