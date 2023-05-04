import axios from "axios";

export const endpoints = {
  login: "/auth/login",
  orders: "/marketplace/orders/find",
  completeOrder: "/marketplace/orders/complete",
};

export const baseURL = "https://beer-api.rembrain.ai";

export const instance = axios.create({ baseURL });