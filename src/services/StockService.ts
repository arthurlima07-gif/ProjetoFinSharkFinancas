import axios from "axios";
import type { SearchResults, CompanyProfile, StockQuote } from "../models/Stock";

const TOKEN = import.meta.env.VITE_FINNHUB_TOKEN as string;
const BASE = "https://finnhub.io/api/v1";

export const searchStocksAPI = async (
  query: string
): Promise<SearchResults | null> => {
  try {
    const { data } = await axios.get<SearchResults>(
      `${BASE}/search?q=${encodeURIComponent(query)}&token=${TOKEN}`
    );
    return data;
  } catch (error) {
    console.error("Erro ao buscar ações:", error);
    return null;
  }
};

export const getCompanyProfileAPI = async (
  symbol: string
): Promise<CompanyProfile | null> => {
  try {
    const { data } = await axios.get<CompanyProfile>(
      `${BASE}/stock/profile2?symbol=${symbol}&token=${TOKEN}`
    );
    return data;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return null;
  }
};

export const getStockQuoteAPI = async (
  symbol: string
): Promise<StockQuote | null> => {
  try {
    const { data } = await axios.get<StockQuote>(
      `${BASE}/quote?symbol=${symbol}&token=${TOKEN}`
    );
    return data;
  } catch (error) {
    console.error("Erro ao buscar cotação:", error);
    return null;
  }
};