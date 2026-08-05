import { FileCsvIcon } from "@navikt/aksel-icons";
import { Button, Heading, LocalAlert } from "@navikt/ds-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
	useFetchHentOppdragsLinjer,
	useFetchIsSkattepliktig,
} from "../../api/apiService";
import Breadcrumbs from "../../components/Breadcrumbs";
import OppdragEgenskapPanel from "../../components/OppdragEgenskapPanel";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/common-styles.module.css";
import { OPPDRAG } from "../../umami/umami";
import { downloadAsCsv } from "../../util/csvExport";
import { ROOT } from "../../util/routenames";
import BestilleSkattekortButton from "./BestilleSkattekortButton";
import EnhetshistorikkModal from "./EnhetshistorikkModal";
import OmposteringModal from "./OmposteringModal";
import styles from "./Oppdrag.module.css";
import OppdragLinjeTable from "./OppdragTable";
import StatushistorikkModal from "./StatushistorikkModal";

export default function Oppdrag() {
	const navigate = useNavigate();

	const { gjelderId } = useStore.getState();
	const { oppdrag } = useStore();
	const { data } = useFetchHentOppdragsLinjer(oppdrag?.oppdragsId);
	const { data: isOppdragSkattepliktig, error: isOppdragSkattepliktigError } =
		useFetchIsSkattepliktig(oppdrag?.oppdragsId);
	const [skattekortstatus, setSkattekortstatus] = useState<string>("UKJENT");

	useEffect(() => {
		if (!gjelderId || oppdrag === undefined) {
			navigate(ROOT, { replace: true });
		}
	}, [gjelderId, oppdrag, navigate]);
	const [alertMessage, setAlertMessage] = useState<{
		message: string;
		status: "success" | "error" | "warning";
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
										variant="secondary"
										data-color="neutral"
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
										variant="secondary"
										data-color="neutral"
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
										variant="secondary"
										data-color="neutral"
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
								variant="secondary"
								data-color="neutral"
								icon={<FileCsvIcon aria-hidden fontSize="1.5rem" />}
								iconPosition={"right"}
								onClick={() =>
									downloadAsCsv(gjelderId, oppdrag!.navnFagomraade, data ?? [])
								}
							>
								Til Excel
							</Button>
						</div>
					</div>
				</div>
			</div>
			{!!alertMessage && (
				<LocalAlert status={alertMessage.status}>
					<LocalAlert.Header>
						<LocalAlert.Title as="h3">{alertMessage.message}</LocalAlert.Title>
						<LocalAlert.CloseButton onClick={() => setAlertMessage(null)} />
					</LocalAlert.Header>
				</LocalAlert>
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
