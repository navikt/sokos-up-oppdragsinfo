import useSWRImmutable from "swr/immutable";
import { Faggrupper } from "../types/Faggruppe";
import { axiosFetcher, axiosPostFetcher, BASE_URI } from "./apiConfig";
import { Oppdrag } from "../types/Oppdrag";
import { OppdragsRequest } from "./models/OppdragsRequest";
import { OppdragsLinjer } from "../types/Oppdragslinje";
import { OppdragsEnhet } from "../types/OppdragsEnhet";
import { Attestanter } from "../types/Attestant";
import { Statuser } from "../types/Status";
import { OppdragsStatuser } from "../types/OppdragsStatus";
import { Enhetshistorikk } from "../types/Enhetshistorikk";
import { Omposteringer } from "../types/Ompostering";
import { OppdragsLinjeDetaljer } from "../types/OppdragsLinjeDetaljer";
import { Kravhavere } from "../types/Kravhaver";
import { Ovrige } from "../types/Ovrig";
import { Valutaer } from "../types/Valuta";
import { KidListe } from "../types/Kid";
import { Tekster } from "../types/Tekst";
import { Skyldnere } from "../types/Skyldner";
import { Maksdatoer } from "../types/Maksdato";
import { Linjeenheter } from "../types/LinjeEnhet";
import { Grader } from "../types/Grad";
import { GjelderIdRequest } from "./models/GjelderIdRequest";
import { GjelderNavn } from "../types/GjelderNavn";

const swrConfig = {
  fetcher: <T>(url: string) => axiosFetcher<T>(BASE_URI.OPPDRAGSINFO, url),
  suspense: true,
  revalidateOnFocus: false,
  refreshInterval: 120000
};

async function useHentOppdrag(request: OppdragsRequest) {
  return await axiosPostFetcher<OppdragsRequest, Oppdrag>(BASE_URI.OPPDRAGSINFO, "/sok", request);
}

async function useHentNavn(request: GjelderIdRequest) {
  return await axiosPostFetcher<GjelderIdRequest, GjelderNavn>(BASE_URI.INTEGRATION, "/hentnavn", request);
}

function useFetchHentFaggrupper() {
  return useSWRImmutable<Faggrupper>(`/faggrupper`, {
    ...swrConfig,
    fallbackData: [],
    revalidateOnMount: true
  });
}

function useFetchHentOppdragsLinjer(oppdragsId?: string) {
  return useSWRImmutable<OppdragsLinjer>(oppdragsId ? `/${oppdragsId}/oppdragslinjer` : null, swrConfig);
}

function useFetchHentOppdragsEnheter(oppdragsId: string) {
  return useSWRImmutable<OppdragsEnhet>(oppdragsId ? `/${oppdragsId}/enheter` : null, swrConfig);
}

function useFetchHentAttestanter(oppdragsId: string, linjeId: string, call: boolean) {
  return useSWRImmutable<Attestanter>(call ? `/${oppdragsId}/${linjeId}/attestanter` : null, swrConfig);
}

function useFetchHentOppdragsLinjeStatuser(oppdragsId: string, oppdragsLinjeId: string, call: boolean) {
  return useSWRImmutable<Statuser>(call ? `/${oppdragsId}/${oppdragsLinjeId}/statuser` : null, swrConfig);
}

function useFetchHentOppdragsStatushistorikk(oppdragsId: string, call: boolean) {
  return useSWRImmutable<OppdragsStatuser>(call ? `/${oppdragsId}/statushistorikk` : null, swrConfig);
}

function useFetchHentOppdragsEnhethistorikk(oppdragsId: string, call: boolean) {
  return useSWRImmutable<Enhetshistorikk>(call ? `/${oppdragsId}/enhetshistorikk` : null, swrConfig);
}

function useFetchHentOppdragsOmposteringer(oppdragsId: string, call: boolean) {
  return useSWRImmutable<Omposteringer>(call ? `/${oppdragsId}/omposteringer` : null, swrConfig);
}

function useFetchOppdragslinjeDetaljer(oppdragsId: string, oppdragsLinjeId: string) {
  return useSWRImmutable<OppdragsLinjeDetaljer>(oppdragsId ? `/${oppdragsId}/${oppdragsLinjeId}/detaljer` : null, swrConfig);
}

function useFetchKravhaver(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<Kravhavere>(`/${oppdragsId}/${linjeId}/kravhavere`, swrConfig);
}

function useFetchOvrig(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<Ovrige>(`/${oppdragsId}/${linjeId}/ovrig`, swrConfig);
}

function useFetchValuta(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<Valutaer>(`/${oppdragsId}/${linjeId}/valutaer`, swrConfig);
}

function useFetchKid(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<KidListe>(`/${oppdragsId}/${linjeId}/kid`, swrConfig);
}

function useFetchTekster(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<Tekster>(`/${oppdragsId}/${linjeId}/tekster`, swrConfig);
}

function useFetchSkyldnere(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<Skyldnere>(`/${oppdragsId}/${linjeId}/skyldnere`, swrConfig);
}

function useFetchMaksdato(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<Maksdatoer>(`/${oppdragsId}/${linjeId}/maksdatoer`, swrConfig);
}

function useFetchLinjeEnheter(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<Linjeenheter>(`/${oppdragsId}/${linjeId}/enheter`, swrConfig);
}

function useFetchGrad(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<Grader>(`/${oppdragsId}/${linjeId}/grader`, swrConfig);
}

const RestService = {
  useHentOppdrag,
  useHentNavn,

  useFetchHentFaggrupper,
  useFetchHentOppdragsLinjer,
  useFetchHentAttestanter,
  useFetchHentOppdragsLinjeStatuser,
  useFetchHentOppdragsEnheter,
  useFetchHentOppdragsStatushistorikk,
  useFetchHentOppdragsEnhethistorikk,
  useFetchHentOppdragsOmposteringer,
  useFetchOppdragslinjeDetaljer,
  useFetchKid,
  useFetchKravhaver,
  useFetchOvrig,
  useFetchTekster,
  useFetchValuta,
  useFetchSkyldnere,
  useFetchMaksdato,
  useFetchLinjeEnheter,
  useFetchGrad
};

export default RestService;