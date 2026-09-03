import { FileCsvIcon } from "@navikt/aksel-icons";
import { Button, Heading } from "@navikt/ds-react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
	useFetchHentOppdragsLinjer,
	useFetchIsSkattepliktig,
} from "../../api/apiService";
import AlertWithCloseButton from "../../components/AlertWithCloseButton";
import Breadcrumbs from "../../components/Breadcrumbs";
import OppdragEgenskapPanel from "../../components/OppdragEgenskapPanel";
import ReloadButton, { type ReloadStatus } from "../../components/ReloadButton";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/common-styles.module.css";
import type { ErrorMessage } from "../../types/ErrorMessage";
import { OPPDRAG } from "../../umami/umami";
import { formaterSistOppdatert } from "../../util/commonUtil";
import { downloadAsCsv } from "../../util/csvExport";
import { ROOT } from "../../util/routenames";
import BestilleSkattekortButton from "./BestilleSkattekortButton";
import EnhetshistorikkModal from "./EnhetshistorikkModal";
import OmposteringModal from "./OmposteringModal";
import styles from "./Oppdrag.module.css";
import OppdragLinjeTable from "./OppdragTable";
import StatushistorikkModal from "./StatushistorikkModal";

export default function OppdragPage() {
	const navigate = useNavigate();

	const { gjelderId } = useStore.getState();
	const { oppdrag } = useStore();
	const {
		data,
		mutate: mutateOppdragsLinjer,
		isValidating: isReloading,
	} = useFetchHentOppdragsLinjer(oppdrag?.oppdragsId);
	const { data: isOppdragSkattepliktig, error: isOppdragSkattepliktigError } =
		useFetchIsSkattepliktig(oppdrag?.oppdragsId);
	const [skattekortstatus, setSkattekortstatus] = useState<string>("UKJENT");
	// Statusikonet gjelder kun manuelle klikk på "Last inn på nytt". Den
	// automatiske hentingen ved mount skal ikke gi hake eller kryss.
	const [reloadStatus, setReloadStatus] = useState<ReloadStatus>("idle");
	const [reloadError, setReloadError] = useState<ErrorMessage | null>(null);
	// Settes kun ved vellykket henting, slik at tidspunktet alltid beskriver de
	// oppdragslinjene som faktisk vises.
	const [sistOppdatert, setSistOppdatert] = useState<Date | null>(null);

	const hentOppdragsLinjer = useCallback(
		(erManuell: boolean) => {
			setReloadError(null);
			setReloadStatus("idle");

			mutateOppdragsLinjer()
				.then(() => {
					setSistOppdatert(new Date());
					if (erManuell) {
						setReloadStatus("success");
					}
				})
				.catch((error) => {
					setReloadError({
						variant: "error",
						message:
							error.message ||
							"Klarte ikke å oppdatere oppdragslinjene. Prøv igjen.",
					});
					if (erManuell) {
						setReloadStatus("error");
					}
				});
		},
		[mutateOppdragsLinjer],
	);

	// Oppdragslinjene hentes fra backend hver gang siden monteres, slik at
	// saksbehandler ikke ser en utdatert attestert-status fra en tidligere
	// visning av det samme oppdraget.
	useEffect(() => {
		hentOppdragsLinjer(false);
	}, [hentOppdragsLinjer]);

	useEffect(() => {
		if (!gjelderId || oppdrag === undefined) {
			navigate(ROOT, { replace: true });
		}
	}, [gjelderId, oppdrag, navigate]);
	const [alertMessage, setAlertMessage] = useState<{
		message: string;
		variant: "success" | "error" | "warning";
	} | null>(null);

	return (
		<div className={commonstyles.page}>
			<div className={commonstyles.page__top}>
				<Heading level="1" size="large" align="center">
					Oppdragsinfo: Oppdrag
				</Heading>
				<Breadcrumbs searchLink trefflistelink oppdrag />
				<div className={commonstyles["page__top-sokekriterier"]}>
					{gjelderId && oppdrag && (
						<OppdragEgenskapPanel
							oppdrag={oppdrag}
							skattekortStatus={skattekortstatus}
							isSkattepliktig={isOppdragSkattepliktig}
						/>
					)}
					<div className={styles["button-row"]}>
						<div className={styles["button-row--left"]}>
							<Suspense
								fallback={
									<Button
										data-umami-event={OPPDRAG.OMPOSTERINGER}
										size="small"
										loading
										variant="secondary-neutral"
									>
										Omposteringer
									</Button>
								}
							>
								<OmposteringModal oppdragsId={oppdrag!.oppdragsId} />
							</Suspense>
							<Suspense
								fallback={
									<Button
										data-umami-event={OPPDRAG.STATUS_HISTORIKK}
										size="small"
										loading
										variant="secondary-neutral"
									>
										Status historikk
									</Button>
								}
							>
								<StatushistorikkModal oppdragsId={oppdrag!.oppdragsId} />
							</Suspense>
							<Suspense
								fallback={
									<Button
										data-umami-event={OPPDRAG.ENHETSHISTORIKK}
										size="small"
										loading
										variant="secondary-neutral"
									>
										Enhetshistorikk
									</Button>
								}
							>
								<EnhetshistorikkModal oppdragsId={oppdrag!.oppdragsId} />
							</Suspense>
						</div>
						<div className={styles["button-row--right"]}>
							{(isOppdragSkattepliktig || isOppdragSkattepliktigError) && (
								<BestilleSkattekortButton
									gjelderId={gjelderId}
									error={isOppdragSkattepliktigError}
									setSkattekortstatus={setSkattekortstatus}
									setAlertMessage={setAlertMessage}
								/>
							)}
							<Button
								data-umami-event={OPPDRAG.EKSPORT_TIL_EXCEL}
								size={"small"}
								variant={"secondary-neutral"}
								icon={<FileCsvIcon title="Til Excel" fontSize="1.5rem" />}
								iconPosition={"right"}
								onClick={() =>
									downloadAsCsv(gjelderId, oppdrag!.navnFagomraade, data ?? [])
								}
							>
								Til Excel
							</Button>
						</div>
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
							umamiEvent={OPPDRAG.RELOAD}
							onClick={() => hentOppdragsLinjer(true)}
						/>
					</div>
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
			{!!alertMessage && (
				<AlertWithCloseButton
					show={!!alertMessage}
					setShow={() => setAlertMessage(null)}
					variant={alertMessage.variant}
				>
					{alertMessage.message}
				</AlertWithCloseButton>
			)}
			{data && (
				<OppdragLinjeTable
					oppdragsId={oppdrag!.oppdragsId}
					oppdragsLinjer={data}
				/>
			)}
		</div>
	);
}
