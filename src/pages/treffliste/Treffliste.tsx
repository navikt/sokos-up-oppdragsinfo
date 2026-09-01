import { Alert, Heading, Loader } from "@navikt/ds-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { hentNavn, hentOppdrag } from "../../api/apiService";
import AlertWithCloseButton from "../../components/AlertWithCloseButton";
import Breadcrumbs from "../../components/Breadcrumbs";
import LabelText from "../../components/LabelText";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/common-styles.module.css";
import type { ErrorMessage } from "../../types/ErrorMessage";
import { formaterSistOppdatert, isEmpty } from "../../util/commonUtil";
import { ROOT } from "../../util/routenames";
import ReloadButton, { type ReloadStatus } from "./ReloadButton";
import TrefflisteTable from "./TrefflisteTable";

export default function Treffliste() {
	const navigate = useNavigate();
	const {
		gjelderId,
		fagGruppe,
		oppdragsListe,
		gjelderNavn,
		setGjelderNavn,
		setOppdragsListe,
	} = useStore();
	const [isReloading, setIsReloading] = useState(true);
	// Statusikonet gjelder kun manuelle klikk på "Last inn på nytt". Den
	// automatiske hentingen ved mount/refresh skal ikke gi hake eller kryss.
	const [reloadStatus, setReloadStatus] = useState<ReloadStatus>("idle");
	const [reloadError, setReloadError] = useState<ErrorMessage | null>(null);
	// Settes kun ved vellykket henting, slik at tidspunktet alltid beskriver den
	// trefflisten som faktisk vises.
	const [sistOppdatert, setSistOppdatert] = useState<Date | null>(null);

	const hentTreffliste = useCallback(
		(erManuell: boolean) => {
			if (!gjelderId) {
				return;
			}

			setIsReloading(true);
			setReloadError(null);
			setReloadStatus("idle");

			hentOppdrag({
				gjelderId,
				fagGruppeKode: fagGruppe?.type,
			})
				.then((response) => {
					setOppdragsListe(response);
					setSistOppdatert(new Date());
					if (erManuell) {
						setReloadStatus("success");
					}
				})
				.catch((error) => {
					// Behold tidligere treffliste i minnet som bevisst fallback hvis
					// oppdateringen feiler, slik at brukeren fortsatt ser et faktisk
					// gyldig innhold mens feilen vises i alerten.
					setReloadError({
						variant: "error",
						message:
							error.message ||
							"Klarte ikke å oppdatere trefflisten. Prøv igjen.",
					});
					if (erManuell) {
						setReloadStatus("error");
					}
				})
				.finally(() => {
					setIsReloading(false);
				});
		},
		[fagGruppe?.type, gjelderId, setOppdragsListe],
	);

	useEffect(() => {
		if (!gjelderId) {
			navigate(ROOT, { replace: true });
			return;
		}
	}, [gjelderId, navigate]);

	useEffect(() => {
		hentTreffliste(false);
	}, [hentTreffliste]);

	useEffect(() => {
		if (gjelderNavn === "") {
			hentNavn({ gjelderId }).then((response) => {
				setGjelderNavn(response.navn);
			});
		}
	}, [gjelderId, gjelderNavn, setGjelderNavn]);

	return (
		<div className={commonstyles.page}>
			<div className={commonstyles.page__top}>
				<Heading level="1" size="large" align="center">
					Oppdragsinfo: Treffliste
				</Heading>
				<Breadcrumbs searchLink treffliste />

				<div className={commonstyles["page__top-sokekriterier"]}>
					<Heading size="small" level="2">
						Søkekriterier benyttet:
					</Heading>
					<div className={commonstyles["page__top-sokekriterier__content"]}>
						<LabelText label={"Gjelder"} text={gjelderId ?? ""} />
						<LabelText label={"Navn"} text={gjelderNavn ?? ""} />
						<LabelText
							label={"Faggruppe"}
							text={fagGruppe ? `${fagGruppe.navn}(${fagGruppe.type})` : "Alle"}
						/>
					</div>
					<div className={commonstyles["page__top-sokekriterier__footer"]}>
						<ReloadButton
							isLoading={isReloading}
							status={reloadStatus}
							lastUpdatedText={
								sistOppdatert
									? `Sist oppdatert ${formaterSistOppdatert(sistOppdatert)}`
									: undefined
							}
							onClick={() => hentTreffliste(true)}
						/>
					</div>
				</div>
				{!!reloadError && (
					<div className={commonstyles["page__top-alert"]}>
						<AlertWithCloseButton
							show={!!reloadError}
							setShow={() => setReloadError(null)}
							variant={reloadError.variant}
						>
							{reloadError.message}
						</AlertWithCloseButton>
					</div>
				)}
			</div>

			{isReloading && !oppdragsListe && (
				<Loader size="2xlarge" title="Laster ..." variant="interaction" />
			)}
			{oppdragsListe && !isEmpty(oppdragsListe) && (
				<TrefflisteTable oppdragsListe={oppdragsListe} />
			)}
			{oppdragsListe && isEmpty(oppdragsListe) && !isReloading && (
				<Alert variant="info" role="status">
					Fant ingen oppdrag for {gjelderId}
					{fagGruppe ? ` med faggruppe ${fagGruppe.type}` : ""}
				</Alert>
			)}
		</div>
	);
}
