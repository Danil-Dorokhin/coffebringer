import axios from "axios";

export const endpoints = {
  login: "/auth/login",
  orders: "/marketplace/orders/find",
  completeOrder: "/marketplace/orders/complete",
};

export const baseUrl = "https://api.flow.reveel.no";

export const instance = axios.create({ baseURL });
