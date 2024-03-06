import axios from "axios";
import useSWR from "swr";
import { ApiError, HttpStatusCodeError } from "../types/errors";
import { useEffect, useState } from "react";
import { isString } from "../util/commonUtils";
import { Treffliste } from "../models/Treffliste";
import { Faggruppe } from "../models/Faggruppe";
import { Oppdragsdetaljer } from "../models/Oppdragsdetaljer";
import { Enhetshistorikk } from "../models/Enhetshistorikk";
import { Omposteringer } from "../models/Ompostering";
import { Oppdragslinjedetaljer } from "../models/Oppdragslinjedetaljer";
import { Attestanter } from "../models/Attestant";
import { Kravhavere } from "../models/Kravhaver";
import { Ovrige } from "../models/Ovrig";
import { Statuser } from "../models/Status";
import { Kidliste } from "../models/Kid";
import { Valutaer } from "../models/Valuta";
import { Tekster } from "../models/Tekst";
import { SkyldnersList } from "../models/Skyldner";
import { Linjeenheter } from "../models/Linjeenhet";
import { Grader } from "../models/Grad";
import { Maksdatoer } from "../models/Maksdato";

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
const axiosPostFetcher = <T>(url: string, body: { gjelderId?: string; fagGruppeKode?: string }) =>
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
  const { data, error, isLoading, mutate } = useSWR<Treffliste>(shouldFetch ? "/oppdrag" : null, {
    ...swrConfig,
    fetcher: (url) => axiosPostFetcher<Treffliste>(url, { gjelderId, fagGruppeKode: faggruppe }),
  });
  return { treffliste: data, trefflisteError: error, trefflisteIsLoading: isLoading, mutate };
};

const useFetchOppdrag = (gjelderId?: string, id?: string) => {
  const [oppdragsId, setOppdragsId] = useState<string>();
  useEffect(() => {
    setOppdragsId(id);
  }, [id]);
  const { data: oppdrag, isLoading: oppdragIsLoading } = useSWR<Oppdragsdetaljer>(
    isString(oppdragsId) ? `/${oppdragsId}` : null,
    {
      ...swrConfig,
      fetcher: (url) => axiosPostFetcher<Oppdragsdetaljer>(url, { gjelderId }),
    },
  );
  return { oppdrag, oppdragIsLoading };
};

const usePostFetch = <T>(shouldFetch: boolean, url: string, gjelderId: string) => {
  const [should, setShould] = useState<boolean>(false);
  useEffect(() => {
    setShould(shouldFetch);
  }, [shouldFetch]);
  const { data, isLoading } = useSWR<T>(should ? url : null, {
    ...swrConfig,
    fetcher: (url) => axiosPostFetcher<T>(url, { gjelderId }),
  });
  return [data, isLoading];
};

const useFetch = <T>(shouldFetch: boolean, url: string) => {
  const [should, setShould] = useState<boolean>(false);
  useEffect(() => {
    setShould(shouldFetch);
  }, [shouldFetch]);
  const { data, isLoading } = useSWR<T>(should ? url : null, {
    ...swrConfig,
    fetcher: (url) => axiosGetFetcher<T>(url),
  });
  return [data, isLoading];
};

const useFetchEnhetshistorikk = (id: string, shouldFetch: boolean) =>
  useFetch<Enhetshistorikk>(shouldFetch, `/${id}/enhetshistorikk`);
const useFetchOmposteringer = (gjelderId: string, id: string, shouldFetch: boolean) =>
  usePostFetch<Omposteringer>(shouldFetch, `/${id}/omposteringer`, gjelderId);
const useFetchStatushistorikk = (id: string, shouldFetch: boolean) =>
  useFetch<Enhetshistorikk>(shouldFetch, `/${id}/statushistorikk`);

const useFetchOppdragslinje = (oppdragsid: string, linjeid: string, shouldFetch: boolean) =>
  useFetch<Oppdragslinjedetaljer>(shouldFetch, `/${oppdragsid}/${linjeid}/detaljer`);

const useFetchAttestant = (oppdragsid: string, linjeid: string, shouldFetch: boolean) =>
  useFetch<Attestanter>(shouldFetch, `/${oppdragsid}/${linjeid}/attestant`);

const useFetchKravhaver = (oppdragsid: string, linjeid: string, shouldFetch: boolean) =>
  useFetch<Kravhavere>(shouldFetch, `/${oppdragsid}/${linjeid}/kravhaver`);

const useFetchOvrig = (oppdragsid: string, linjeid: string, shouldFetch: boolean) =>
  useFetch<Ovrige>(shouldFetch, `/${oppdragsid}/${linjeid}/ovrig`);

const useFetchStatus = (oppdragsid: string, linjeid: string, shouldFetch: boolean) =>
  useFetch<Statuser>(shouldFetch, `/${oppdragsid}/${linjeid}/status`);

const useFetchValuta = (oppdragsid: string, linjeid: string, shouldFetch: boolean) =>
  useFetch<Valutaer>(shouldFetch, `/${oppdragsid}/${linjeid}/valuta`);

const useFetchKidliste = (oppdragsid: string, linjeid: string, shouldFetch: boolean) =>
  useFetch<Kidliste>(shouldFetch, `/${oppdragsid}/${linjeid}/kidliste`);

const useFetchTekster = (oppdragsid: string, linjeid: string, shouldFetch: boolean) =>
  useFetch<Tekster>(shouldFetch, `/${oppdragsid}/${linjeid}/tekst`);

const useFetchSkyldnersList = (oppdragsid: string, linjeid: string, shouldFetch: boolean) =>
  useFetch<SkyldnersList>(shouldFetch, `/${oppdragsid}/${linjeid}/skyldner`);

const useFetchMaksdato = (oppdragsid: string, linjeid: string, shouldFetch: boolean) =>
  useFetch<Maksdatoer>(shouldFetch, `/${oppdragsid}/${linjeid}/maksdato`);

const useFetchLinjeenheter = (oppdragsid: string, linjeid: string, shouldFetch: boolean) =>
  useFetch<Linjeenheter>(shouldFetch, `/${oppdragsid}/${linjeid}/enhet`);

const useFetchGrad = (oppdragsid: string, linjeid: string, shouldFetch: boolean) =>
  useFetch<Grader>(shouldFetch, `/${oppdragsid}/${linjeid}/grad`);

const RestService = {
  useFetchFaggrupper,
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
