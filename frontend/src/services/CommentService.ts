import axios from "axios";
import type { CommentGet, CommentPost } from "../models/Comment";

const API = import.meta.env.VITE_API_URL as string;

export const getCommentsAPI = async (symbol: string) => {
  return axios.get<CommentGet[]>(`${API}/comment?symbol=${symbol}`);
};

export const createCommentAPI = async (
  symbol: string,
  comment: CommentPost
) => {
  return axios.post<CommentGet>(`${API}/comment/${symbol}`, comment);
};