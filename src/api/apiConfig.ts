import axios, { CreateAxiosDefaults } from "axios";
import { HttpStatusCodeError } from "../types/Errors";

const config = (baseUri: string): CreateAxiosDefaults => ({
  baseURL: baseUri,
  timeout: 30000,
  withCredentials: true,
  headers: {
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
  validateStatus: (status) => status < 400,
});

function api(baseUri: string) {
  const instance = axios.create(config(baseUri));

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Uinnlogget - vil ikke skje i miljø da appen er beskyttet
        return Promise.reject(error);
      } else {
        throw new HttpStatusCodeError(
          error.response?.status || 500, // Default 500 hvis status ikke er definert
          error.response?.data?.message ||
            "Nettverksproblemer. Hvis feilen oppstår, meld sak i Porten.", // Default melding hvis message ikke er definert
        );
      }
    },
  );
  return instance;
}

export async function axiosFetcher<T>(baseUri: string, url: string) {
  const res = await api(baseUri).get<T>(url);
  return res.data;
}

export async function axiosPostFetcher<T, U>(
  baseUri: string,
  url: string,
  body?: T,
) {
  const res = await api(baseUri).post<U>(url, body);
  return res.data;
}
