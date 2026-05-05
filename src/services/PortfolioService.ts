import axios from "axios";
import type { PortfolioGet } from "../models/Portfolio";

const API = import.meta.env.VITE_API_URL as string;

export const getPortfolioAPI = async () => {
  return axios.get<PortfolioGet[]>(`${API}/portfolio`);
};

export const addPortfolioAPI = async (symbol: string) => {
  return axios.post(`${API}/portfolio?symbol=${symbol}`);
};

export const deletePortfolioAPI = async (symbol: string) => {
  return axios.delete(`${API}/portfolio?symbol=${symbol}`);
};