import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Attestanter } from "../models/Attestant";
import { Enhetshistorikk } from "../models/Enhetshistorikk";
import { Faggruppe } from "../models/Faggruppe";
import { Grader } from "../models/Grad";
import { Kidliste } from "../models/Kid";
import { Kravhavere } from "../models/Kravhaver";
import { Linjeenheter } from "../models/Linjeenhet";
import { Maksdatoer } from "../models/Maksdato";
import { Omposteringer } from "../models/Ompostering";
import { Oppdrag } from "../models/Oppdrag";
import { Oppdragslinjedetaljer } from "../models/Oppdragslinjedetaljer";
import { Ovrige } from "../models/Ovrig";
import { SkyldnersList } from "../models/Skyldner";
import { Statuser } from "../models/Status";
import { Statushistorikk } from "../models/StatushistorikkStatus";
import { Tekster } from "../models/Tekst";
import { Treffliste } from "../models/Treffliste";
import { Valutaer } from "../models/Valuta";
import { ApiError, HttpStatusCodeError } from "../types/errors";
import { isString, storeNavn } from "../util/commonUtils";

const BASE_API_URL = "/oppdrag-api/api/v1/oppdragsinfo";
const BASE_INTEGRATION_URL = "/oppdrag-api/api/v1/integration";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
  validateStatus: (status) => status < 400,
});

const integrationApi = axios.create({
  baseURL: BASE_INTEGRATION_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
  validateStatus: (status) => status < 400,
});

const axiosGetFetcher = <T>(url: string) =>
  api.get<T>(url).then((res) => res.data);

// Brukes av omposteringer, oppdrag og treffliste for å kunne sende med fnr i requestbody
const axiosPostFetcher = <T>(
  url: string,
  body: { gjelderId?: string; fagGruppeKode?: string | null },
) => api.post<T>(url, body).then((res) => res.data);

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

const fetchFaggrupper = async () => {
  const response = await api.get<Faggruppe[]>("/faggrupper");
  return response.data;
};

export const fetchAndStoreNavn = async (gjelderId: string) => {
  integrationApi
    .post<string>("/hent-navn", {
      gjelderId,
    })
    .then((it) => it.data)
    .then(storeNavn);
};

const useFetchTreffliste = (gjelderId?: string, faggruppe?: string | null) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  useEffect(() => {
    setShouldFetch(!!gjelderId && [9, 11].includes(gjelderId.length));
  }, [gjelderId]);
  const { data, error, mutate, isValidating } = useSWR<Treffliste>(
    shouldFetch ? "/oppdragsinfo" : null,
    {
      ...swrConfig,
      fetcher: (url) =>
        axiosPostFetcher<Treffliste>(url, {
          gjelderId,
          fagGruppeKode: faggruppe,
        }),
    },
  );

  const isLoading = (!error && !data) || isValidating;

  return {
    treffliste: data,
    trefflisteError: error,
    mutate,
    trefflisteIsLoading: isLoading,
  };
};

const useFetchOppdrag = (gjelderId?: string, id?: string) => {
  const [oppdragsId, setOppdragsId] = useState<string>();
  useEffect(() => {
    setOppdragsId(id);
  }, [id]);
  const { data: oppdrag } = useSWR<Oppdrag>(
    isString(oppdragsId) ? `/${oppdragsId}` : null,
    {
      ...swrConfig,
      fetcher: (url) => axiosPostFetcher<Oppdrag>(url, { gjelderId }),
    },
  );

  return { oppdrag };
};

const usePostFetch = <T>(url: string, gjelderId: string) => {
  const { data } = useSWR<T>(url, {
    ...swrConfig,
    fetcher: (url) => axiosPostFetcher<T>(url, { gjelderId }),
  });
  return [data];
};

const useFetch = <T>(url: string) => {
  const { data } = useSWR<T>(url, {
    ...swrConfig,
    fetcher: (url) => axiosGetFetcher<T>(url),
  });
  return [data];
};

const useFetchEnhetshistorikk = (id: string) =>
  useFetch<Enhetshistorikk>(`/${id}/enhetshistorikk`);
const useFetchOmposteringer = (gjelderId: string, id: string) =>
  usePostFetch<Omposteringer>(`/${id}/omposteringer`, gjelderId);
const useFetchStatushistorikk = (id: string) =>
  useFetch<Statushistorikk>(`/${id}/statushistorikk`);

const useFetchOppdragslinje = (oppdragsid: string, linjeid: string) =>
  useFetch<Oppdragslinjedetaljer>(`/${oppdragsid}/${linjeid}/detaljer`);

const useFetchAttestant = (oppdragsid: string, linjeid: string) =>
  useFetch<Attestanter>(`/${oppdragsid}/${linjeid}/attestant`);

const useFetchKravhaver = (oppdragsid: string, linjeid: string) =>
  useFetch<Kravhavere>(`/${oppdragsid}/${linjeid}/kravhaver`);

const useFetchOvrig = (oppdragsid: string, linjeid: string) =>
  useFetch<Ovrige>(`/${oppdragsid}/${linjeid}/ovrig`);

const useFetchStatus = (oppdragsid: string, linjeid: string) =>
  useFetch<Statuser>(`/${oppdragsid}/${linjeid}/status`);

const useFetchValuta = (oppdragsid: string, linjeid: string) =>
  useFetch<Valutaer>(`/${oppdragsid}/${linjeid}/valuta`);

const useFetchKidliste = (oppdragsid: string, linjeid: string) =>
  useFetch<Kidliste>(`/${oppdragsid}/${linjeid}/kidliste`);

const useFetchTekster = (oppdragsid: string, linjeid: string) =>
  useFetch<Tekster>(`/${oppdragsid}/${linjeid}/tekst`);

const useFetchSkyldnersList = (oppdragsid: string, linjeid: string) =>
  useFetch<SkyldnersList>(`/${oppdragsid}/${linjeid}/skyldner`);

const useFetchMaksdato = (oppdragsid: string, linjeid: string) =>
  useFetch<Maksdatoer>(`/${oppdragsid}/${linjeid}/maksdato`);

const useFetchLinjeenheter = (oppdragsid: string, linjeid: string) =>
  useFetch<Linjeenheter>(`/${oppdragsid}/${linjeid}/enhet`);

const useFetchGrad = (oppdragsid: string, linjeid: string) =>
  useFetch<Grader>(`/${oppdragsid}/${linjeid}/grad`);

const RestService = {
  fetchFaggrupper,
  useFetchTreffliste,
  useFetchOppdrag,
  useFetchEnhetshistorikk,
  useFetchStatushistorikk,
  useFetchOmposteringer,
  useFetchOppdragslinje,
  useFetchAttestant,
  useFetchKidliste,
  useFetchKravhaver,
  useFetchOvrig,
  useFetchStatus,
  useFetchTekster,
  useFetchValuta,
  useFetchSkyldnersList,
  useFetchMaksdato,
  useFetchLinjeenheter,
  useFetchGrad,
};

export default RestService;
