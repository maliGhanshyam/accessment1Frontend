// src/utils/auth.ts
import { getToken } from "../Model/authCrud";

export const isAuthenticated = () => {
  const token = getToken();
  return token !== null;
};
