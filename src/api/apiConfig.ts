import axios, { CreateAxiosDefaults } from "axios";

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

  return instance;
}

export const BASE_URI = {
  OPPDRAGSINFO: "/oppdrag-api/api/v1/oppdragsinfo",
  INTEGRATION: "/oppdrag-api/api/v1/integration",
};

export function axiosFetcher<T>(baseUri: string, url: string) {
  return api(baseUri)
    .get<T>(url)
    .then((res) => res.data);
}

export function axiosPostFetcher<T, U>(baseUri: string, url: string, body?: T) {
  return api(baseUri)
    .post<U>(url, body)
    .then((res) => res.data);
}
