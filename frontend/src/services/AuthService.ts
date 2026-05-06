import axios from "axios";

const API = import.meta.env.VITE_API_URL as string;

type AuthResponse = {
  token: string;
  userName: string;
  email: string;
};

export const loginAPI = async (username: string, password: string) => {
  return axios.post<AuthResponse>(`${API}/account/login`, {
    username,
    password,
  });
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  return axios.post<AuthResponse>(`${API}/account/register`, {
    email,
    username,
    password,
  });
};