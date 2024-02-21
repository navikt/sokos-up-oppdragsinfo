import axios from "axios";
import useSWR from "swr";
import { ApiError, HttpStatusCodeError } from "../types/errors";
import { Faggruppe, Oppdrag, Treffliste } from "../models/OppdragsinfoData";
import { useEffect, useState } from "react";

const BASE_API_URL = "/nav-oppdrag-api/api/v1/oppdragsinfo";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: { Pragma: "no-cache", "Cache-Control": "no-cache", "Content-Type": "application/json" },
  validateStatus: (status) => status < 400,
});

const axiosGetFetcher = <T>(url: string) => api.get<T>(url).then((res) => res.data);

// Brukes av omposteringer, oppdrag og treffliste for å kunne sende med fnr i requestbody
const axiosPostFetcher = <T>(url: string, body: { gjelderId?: string; faggruppe?: string } | undefined) =>
  api.post<T>(url, body).then((res) => res.data);

const swrConfig = {
  fetcher: axiosGetFetcher,
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
  const { data: faggrupper, isLoading: faggrupperIsLoading } = useSWR<Faggruppe[]>("/faggrupper", swrConfig);
  return { faggrupper, faggrupperIsLoading };
};

const useFetchTreffliste = (gjelderId?: string, faggruppe?: string) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  useEffect(() => {
    setShouldFetch(!!gjelderId && [9, 11].includes(gjelderId.length));
  }, [gjelderId]);
  const { data, error, isLoading } = useSWR<Treffliste>(shouldFetch ? "/oppdrag" : null, {
    ...swrConfig,
    fetcher: (url) => axiosPostFetcher<Treffliste>(url, { gjelderId, faggruppe: faggruppe }),
  });
  return { treffliste: data, trefflisteError: error, trefflisteIsLoading: isLoading };
};

const fetchOppdrag = (gjelderId: string | undefined, id: string) => axiosPostFetcher<Oppdrag>(`/${id}`, { gjelderId });

const RestService = {
  useFetchFaggrupper,
  useFetchTreffliste,
  fetchOppdrag,
};

export default RestService;
