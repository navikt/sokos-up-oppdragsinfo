import useSWRImmutable from "swr/immutable";
import { AttestantList } from "../types/Attestant";
import { FagGruppeList } from "../types/FagGruppe";
import { GjelderNavn } from "../types/GjelderNavn";
import { GradList } from "../types/Grad";
import { KidList } from "../types/Kid";
import { KravhaverList } from "../types/Kravhaver";
import { LinjeenhetList } from "../types/LinjeEnhet";
import { LinjeStatusList } from "../types/LinjeStatus";
import { MaksdatoList } from "../types/Maksdato";
import { OmposteringList } from "../types/Ompostering";
import { OppdragsEnhetList } from "../types/OppdragsEnhet";
import { OppdragsEnhetDTO } from "../types/OppdragsEnhetDTO";
import { OppdragsLinjeDetaljerDTO } from "../types/OppdragsLinjeDetaljerDTO";
import { OppdragsStatusList } from "../types/OppdragsStatus";
import { OppdragsLinjeList } from "../types/Oppdragslinje";
import { OvrigList } from "../types/Ovrig";
import { SkyldnerList } from "../types/Skyldner";
import { TekstList } from "../types/Tekst";
import { ValutaList } from "../types/Valuta";
import { WrappedResponseWithErrorDTO } from "../types/WrappedResponseWithErrorDTO";
import { axiosFetcher, axiosPostFetcher } from "./apiConfig";
import { BestilleSkattekortRequest } from "./models/BestilleSkattekortRequest";
import { GjelderIdRequest } from "./models/GjelderIdRequest";
import { OppdragsRequest } from "./models/OppdragsRequest";

const BASE_URI = {
  OPPDRAGSINFO_API: "/oppdrag-api/api/v1/oppdragsinfo",
  INTEGRATION_API: "/oppdrag-api/api/v1/integration",
  KODEVERK_API: "/oppdrag-api/api/v1/kodeverk",
  SKATTEKORT_API: "/sokos-skattekort/api/v1",
};

function swrConfig<T>(fetcher: (uri: string) => Promise<T>) {
  return {
    fetcher,
    suspense: true,
    revalidateOnFocus: false,
    refreshInterval: 600000,
  };
}

export function useFetchHentFaggrupper() {
  const { data, error, isValidating } = useSWRImmutable<FagGruppeList>(
    `/faggrupper`,
    {
      ...swrConfig<FagGruppeList>((url) =>
        axiosFetcher<FagGruppeList>(BASE_URI.KODEVERK_API, url),
      ),
      fallbackData: [],
      revalidateOnMount: true,
    },
  );
  const isLoading = (!error && !data) || isValidating;
  return { data, error, isLoading };
}

export async function hentOppdrag(request: OppdragsRequest) {
  return await axiosPostFetcher<OppdragsRequest, WrappedResponseWithErrorDTO>(
    BASE_URI.OPPDRAGSINFO_API,
    "/sok",
    request,
  ).then((response) => {
    if (response.errorMessage) {
      throw new Error(response.errorMessage);
    }

    return response.data;
  });
}

export async function hentNavn(request: GjelderIdRequest) {
  return await axiosPostFetcher<GjelderIdRequest, GjelderNavn>(
    BASE_URI.INTEGRATION_API,
    "/hentnavn",
    request,
  );
}

export function useFetchHentOppdragsLinjer(oppdragsId?: string) {
  return useSWRImmutable<OppdragsLinjeList>(
    oppdragsId ? `/${oppdragsId}/oppdragslinjer` : null,
    swrConfig<OppdragsLinjeList>((url) =>
      axiosFetcher<OppdragsLinjeList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchHentOppdragsEnheter(oppdragsId: string) {
  return useSWRImmutable<OppdragsEnhetDTO>(
    oppdragsId ? `/${oppdragsId}/enheter` : null,
    swrConfig<OppdragsEnhetDTO>((url) =>
      axiosFetcher<OppdragsEnhetDTO>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchHentAttestanter(
  oppdragsId: string,
  linjeId: string,
  call: boolean,
) {
  return useSWRImmutable<AttestantList>(
    call ? `/${oppdragsId}/${linjeId}/attestanter` : null,
    swrConfig<AttestantList>((url) =>
      axiosFetcher<AttestantList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchHentOppdragsLinjeStatuser(
  oppdragsId: string,
  oppdragsLinjeId: string,
  call: boolean,
) {
  return useSWRImmutable<LinjeStatusList>(
    call ? `/${oppdragsId}/${oppdragsLinjeId}/statuser` : null,
    swrConfig<LinjeStatusList>((url) =>
      axiosFetcher<LinjeStatusList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchHentOppdragsStatushistorikk(
  oppdragsId: string,
  call: boolean,
) {
  return useSWRImmutable<OppdragsStatusList>(
    call ? `/${oppdragsId}/statushistorikk` : null,
    swrConfig<OppdragsStatusList>((url) =>
      axiosFetcher<OppdragsStatusList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchHentOppdragsEnhethistorikk(
  oppdragsId: string,
  call: boolean,
) {
  return useSWRImmutable<OppdragsEnhetList>(
    call ? `/${oppdragsId}/enhetshistorikk` : null,
    swrConfig<OppdragsEnhetList>((url) =>
      axiosFetcher<OppdragsEnhetList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchHentOppdragsOmposteringer(
  oppdragsId: string,
  call: boolean,
) {
  return useSWRImmutable<OmposteringList>(
    call ? `/${oppdragsId}/omposteringer` : null,
    swrConfig<OmposteringList>((url) =>
      axiosFetcher<OmposteringList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchOppdragslinjeDetaljer(
  oppdragsId: string,
  oppdragsLinjeId: string,
) {
  return useSWRImmutable<OppdragsLinjeDetaljerDTO>(
    oppdragsId ? `/${oppdragsId}/${oppdragsLinjeId}/detaljer` : null,
    swrConfig<OppdragsLinjeDetaljerDTO>((url) =>
      axiosFetcher<OppdragsLinjeDetaljerDTO>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchKravhaver(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<KravhaverList>(
    `/${oppdragsId}/${linjeId}/kravhavere`,
    swrConfig<KravhaverList>((url) =>
      axiosFetcher<KravhaverList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchOvrig(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<OvrigList>(
    `/${oppdragsId}/${linjeId}/ovrig`,
    swrConfig<OvrigList>((url) =>
      axiosFetcher<OvrigList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchValuta(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<ValutaList>(
    `/${oppdragsId}/${linjeId}/valutaer`,
    swrConfig<ValutaList>((url) =>
      axiosFetcher<ValutaList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchKid(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<KidList>(`/${oppdragsId}/${linjeId}/kid`, {
    ...swrConfig,
  });
}

export function useFetchTekster(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<TekstList>(
    `/${oppdragsId}/${linjeId}/tekster`,
    swrConfig<TekstList>((url) =>
      axiosFetcher<TekstList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchSkyldnere(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<SkyldnerList>(
    `/${oppdragsId}/${linjeId}/skyldnere`,
    swrConfig<SkyldnerList>((url) =>
      axiosFetcher<SkyldnerList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchMaksdato(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<MaksdatoList>(
    `/${oppdragsId}/${linjeId}/maksdatoer`,
    swrConfig<MaksdatoList>((url) =>
      axiosFetcher<MaksdatoList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchLinjeEnheter(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<LinjeenhetList>(
    `/${oppdragsId}/${linjeId}/enheter`,
    swrConfig<LinjeenhetList>((url) =>
      axiosFetcher<LinjeenhetList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export function useFetchGrad(oppdragsId: string, linjeId: string) {
  return useSWRImmutable<GradList>(
    `/${oppdragsId}/${linjeId}/grader`,
    swrConfig<GradList>((url) =>
      axiosFetcher<GradList>(BASE_URI.OPPDRAGSINFO_API, url),
    ),
  );
}

export async function bestillSkattekort(request: BestilleSkattekortRequest) {
  return await axiosPostFetcher<
    BestilleSkattekortRequest,
    { errorMessage?: string }
  >(BASE_URI.SKATTEKORT_API, "/skattekort/bestille", request).then(
    (response) => {
      if (response.errorMessage) {
        return response.errorMessage;
      }
      return "Success";
    },
  );
}
