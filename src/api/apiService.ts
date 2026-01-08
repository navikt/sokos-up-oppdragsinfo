import useSWRImmutable from "swr/immutable";
import type { AttestantList } from "../types/Attestant";
import type { FagGruppeList } from "../types/FagGruppe";
import type { GjelderNavn } from "../types/GjelderNavn";
import type { GradList } from "../types/Grad";
import type { KidList } from "../types/Kid";
import type { KravhaverList } from "../types/Kravhaver";
import type { LinjeenhetList } from "../types/LinjeEnhet";
import type { LinjeStatusList } from "../types/LinjeStatus";
import type { MaksdatoList } from "../types/Maksdato";
import type { OmposteringList } from "../types/Ompostering";
import type { OppdragsEnhetList } from "../types/OppdragsEnhet";
import type { OppdragsEnhetDTO } from "../types/OppdragsEnhetDTO";
import type { OppdragsLinjeDetaljerDTO } from "../types/OppdragsLinjeDetaljerDTO";
import type { OppdragsLinjeList } from "../types/Oppdragslinje";
import type { OppdragsStatusList } from "../types/OppdragsStatus";
import type { OvrigList } from "../types/Ovrig";
import type { SkyldnerList } from "../types/Skyldner";
import type { TekstList } from "../types/Tekst";
import type { ValutaList } from "../types/Valuta";
import type { WrappedResponseWithErrorDTO } from "../types/WrappedResponseWithErrorDTO";
import { axiosFetcher, axiosPostFetcher } from "./apiConfig";
import type { ForespoerselRequest } from "./models/ForespoerselRequest";
import type { GjelderIdRequest } from "./models/GjelderIdRequest";
import type { OppdragsRequest } from "./models/OppdragsRequest";

const BASE_URI = {
	OPPDRAGSINFO_API: "/oppdrag-api/api/v1/oppdragsinfo",
	INTEGRATION_API: "/oppdrag-api/api/v1/integration",
	KODEVERK_API: "/oppdrag-api/api/v1/kodeverk",
	SOKOS_SKATTEKORT_API: "/sokos-skattekort/api/v1",
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

export function useFetchIsSkattepliktig(oppdragsId?: string) {
	return useSWRImmutable<boolean>(
		oppdragsId ? `/${oppdragsId}/skattepliktig` : null,
		swrConfig<boolean>((url) =>
			axiosFetcher<boolean>(BASE_URI.OPPDRAGSINFO_API, url),
		),
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

export async function bestillSkattekort(request: ForespoerselRequest) {
	return await axiosPostFetcher<ForespoerselRequest, { errorMessage?: string }>(
		BASE_URI.SOKOS_SKATTEKORT_API,
		"/skattekort/bestille",
		request,
	).then((response) => {
		if (response.errorMessage) {
			return response.errorMessage;
		}
		return "Success";
	});
}
export function useFetchSkattekortStatus(
	request: ForespoerselRequest,
	shouldRefresh: boolean,
) {
	const { data, error, isValidating } = useSWRImmutable<{
		status: string;
	}>("/skattekort/status", {
		...swrConfig<{ status: string }>((url) =>
			axiosPostFetcher<ForespoerselRequest, { status: string }>(
				BASE_URI.SOKOS_SKATTEKORT_API,
				url,
				request,
			),
		),
		fallbackData: {
			status: "API_ERROR",
		},
		revalidateOnMount: true,
		refreshInterval: shouldRefresh ? 1000 : 0,
		shouldRetryOnError: true,
		errorRetryCount: 3,
		errorRetryInterval: 3000,
	});
	const isLoading = (!error && !data) || isValidating;
	return { data, error, isLoading };
}
