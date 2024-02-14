import axios from "axios";
import useSWR from "swr";
import { ApiError, HttpStatusCodeError } from "../types/errors";
import { Faggruppe, OppdragSearchResults } from "../models/OppdragsinfoData";

const BASE_API_URL = "/oppdragsinfo/api";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: { Pragma: "no-cache", "Cache-Control": "no-cache", "Content-Type": "application/json" },
  validateStatus: (status) => status < 400,
});

const axiosFetcher = <T>(url: string) => api.get<T>(url).then((res) => res.data);
const axiosPostFetcher = <T>(url: string, body: { gjelderId: string; faggruppe?: string }) =>
  api.post<T>(url, { body }).then((res) => res.data);

const swrConfig = {
  fetcher: axiosFetcher,
  suspense: true,
  revalidateOnFocus: false,
  refreshInterval: 120000,
};

api.interceptors.response.use(
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
  },
);

const useFetchFaggrupper = () => {
  const { data: faggrupper, isLoading } = useSWR<Faggruppe[]>("/faggrupper", swrConfig);
  return { faggrupper, isLoading };
};

const useFetchOppdragSearchResults = (gjelderId: string, faggruppe: string) =>
  axiosPostFetcher<OppdragSearchResults>("/oppdrag", { gjelderId, faggruppe });

const useFetchOppdrag = (gjelderId: string, id: number) =>
  axiosPostFetcher<OppdragSearchResults>(`/${id}`, { gjelderId });

const RestService = {
  useFetchFaggrupper,
  useFetchOppdragSearchResults,
  useFetchOppdrag,
};

export default RestService;
