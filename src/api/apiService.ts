import useSWRImmutable from "swr/immutable";
import { AttestantList } from "../types/Attestant";
import { Enhetshistorikk } from "../types/Enhetshistorikk";
import { FagGruppeList } from "../types/FagGruppe";
import { GjelderNavn } from "../types/GjelderNavn";
import { GradList } from "../types/Grad";
import { KidList } from "../types/Kid";
import { KorrigertLinje } from "../types/KorrigertLinje";
import { KravhaverList } from "../types/Kravhaver";
import { LinjeenhetList } from "../types/LinjeEnhet";
import { MaksdatoList } from "../types/Maksdato";
import { OmposteringList } from "../types/Ompostering";
import { OppdragsList } from "../types/Oppdrag";
import { OppdragsEnhet } from "../types/OppdragsEnhet";
import { OppdragsStatusList } from "../types/OppdragsStatus";
import { OppdragsLinjeList } from "../types/Oppdragslinje";
import { OvrigList } from "../types/Ovrig";
import { SkyldnerList } from "../types/Skyldner";
import { StatusList } from "../types/Status";
import { TekstList } from "../types/Tekst";
import { ValutaList } from "../types/Valuta";
import { axiosFetcher, axiosPostFetcher } from "./apiConfig";
import { GjelderIdRequest } from "./models/GjelderIdRequest";
import { OppdragsRequest } from "./models/OppdragsRequest";

export const BASE_URI = {
  OPPDRAGSINFO: "/oppdrag-api/api/v1/oppdragsinfo",
  INTEGRATION: "/oppdrag-api/api/v1/integration",
};

const swrConfig = {
  fetcher: <T>(url: string) => axiosFetcher<T>(BASE_URI.OPPDRAGSINFO, url),
  suspense: true,
  revalidateOnFocus: false,
  refreshInterval: 120000,
};

async function useHentOppdrag(request: OppdragsRequest) {
  return await axiosPostFetcher<OppdragsRequest, OppdragsList>(
    BASE_URI.OPPDRAGSINFO,
    "/sok",
    request,
  );
}

async function useHentNavn(request: GjelderIdRequest) {
  return await axiosPostFetcher<GjelderIdRequest, GjelderNavn>(
    BASE_URI.INTEGRATION,
    "/hentnavn",
    request,
  );
}

function useFetchHentFaggrupper() {
  return useSWRImmutable<FagGruppeList>(`/faggrupper`, {
    ...swrConfig,
    fallbackData: [],
    revalidateOnMount: true,
  });
}

function useFetchHentOppdragsLinjer(oppdragsId?: string) {
  return useSWRImmutable<OppdragsLinjeList>(
    oppdragsId ? `/${oppdragsId}/oppdragslinjer` : null,
    swrConfig,
  );
}

function useFetchHentOppdragsEnheter(oppdragsId: string) {
  return useSWRImmutable<OppdragsEnhet>(
    oppdragsId ? `/${oppdragsId}/enheter` : null,
    swrConfig,
  );
}

function useFetchHentAttestanter(
  oppdragsId: string,
  linjeId: string,
  call: boolean,
) {
  return useSWRImmutable<AttestantList>(
    call ? `/${oppdragsId}/${linjeId}/attestanter` : null,
    swrConfig,
  );
}

function useFetchHentOppdragsLinjeStatuser(
  oppdragsId: string,
  oppdragsLinjeId: string,
  call: boolean,
) {
  return useSWRImmutable<StatusList>(
    call ? `/${oppdragsId}/${oppdragsLinjeId}/statuser` : null,
    swrConfig,
  );
}

function useFetchHentOppdragsStatushistorikk(
  oppdragsId: string,
  call: boolean,
) {
  return useSWRImmutable<OppdragsStatusList>(
    call ? `/${oppdragsId}/statushistorikk` : null,
    swrConfig,
  );
}

function useFetchHentOppdragsEnhethistorikk(oppdragsId: string, call: boolean) {
  return useSWRImmutable<Enhetshistorikk>(
    call ? `/${oppdragsId}/enhetshistorikk` : null,
    swrConfig,
  );
}

function useFetchHentOppdragsOmposteringer(oppdragsId: string, call: boolean) {
  return useSWRImmutable<OmposteringList>(
    call ? `/${oppdragsId}/omposteringer` : null,
    swrConfig,
  );
}

function useFetchOppdragslinjeDetaljer(
  oppdragsId: string,
  oppdragsLinjeId: string,
) {
  return useSWRImmutable<KorrigertLinje>(
    oppdragsId ? `/${oppdragsId}/${oppdragsLinjeId}/detaljer` : null,
    swrConfig,
  );
}

function useFetchKravhaver(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<KravhaverList>(
    `/${oppdragsId}/${linjeId}/kravhavere`,
    swrConfig,
  );
}

function useFetchOvrig(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<OvrigList>(
    `/${oppdragsId}/${linjeId}/ovrig`,
    swrConfig,
  );
}

function useFetchValuta(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<ValutaList>(
    `/${oppdragsId}/${linjeId}/valutaer`,
    swrConfig,
  );
}

function useFetchKid(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<KidList>(`/${oppdragsId}/${linjeId}/kid`, swrConfig);
}

function useFetchTekster(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<TekstList>(
    `/${oppdragsId}/${linjeId}/tekster`,
    swrConfig,
  );
}

function useFetchSkyldnere(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<SkyldnerList>(
    `/${oppdragsId}/${linjeId}/skyldnere`,
    swrConfig,
  );
}

function useFetchMaksdato(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<MaksdatoList>(
    `/${oppdragsId}/${linjeId}/maksdatoer`,
    swrConfig,
  );
}

function useFetchLinjeEnheter(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<LinjeenhetList>(
    `/${oppdragsId}/${linjeId}/enheter`,
    swrConfig,
  );
}

function useFetchGrad(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<GradList>(
    `/${oppdragsId}/${linjeId}/grader`,
    swrConfig,
  );
}

const apiService = {
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
  useFetchGrad,
};

export default apiService;
