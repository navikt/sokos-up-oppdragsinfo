import axios, { CreateAxiosDefaults } from "axios";
import { ApiError, HttpStatusCodeError } from "../types/errors";

const config = (baseUri: string): CreateAxiosDefaults => ({
  baseURL: baseUri,
  timeout: 30000,
  withCredentials: true,
  headers: {
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json"
  },
  validateStatus: (status) => status < 400
});

const api = (baseUri: string) => {
  const instance = axios.create(config(baseUri));

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 400) {
        // her kan vi legge feilkoder også som vi fra backend
        throw new HttpStatusCodeError(error.response?.status);
      }
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Uinnlogget - vil ikke skje i miljø da appen er beskyttet
        return Promise.reject(error);
      }
      throw new ApiError("Issues with connection to backend");
    }
  );
  return instance;
};

export const BASE_URI = {
  OPPDRAGSINFO: "/oppdrag-api/api/v1/oppdragsinfo",
  INTEGRATION: "/oppdrag-api/api/v1/integration"
};

export const axiosFetcher = <T>(baseUri: string, url: string) =>
  api(baseUri)
    .get<T>(url)
    .then((res) => res.data);

export const axiosPostFetcher = <T, U>(
  baseUri: string,
  url: string,
  body?: T
) =>
  api(baseUri)
    .post<U>(url, body)
    .then((res) => res.data);

