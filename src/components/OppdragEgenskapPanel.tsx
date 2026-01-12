import { useFetchHentOppdragsEnheter } from "../api/apiService";
import EnhetLabel from "../pages/oppdrag/EnhetLabel";
import { useStore } from "../store/AppState";
import type { Oppdrag } from "../types/Oppdrag";
import LabelText from "./LabelText";
import styles from "./OppdragEgenskapPanel.module.css";

interface OppdragsEgenskapPanelProps {
	oppdrag: Oppdrag;
	skattekortStatus?: string;
	isSkattepliktig?: boolean;
}

export default function OppdragEgenskapPanel(
	props: OppdragsEgenskapPanelProps,
) {
	const { data: oppdragsEnhet } = useFetchHentOppdragsEnheter(
		props.oppdrag.oppdragsId,
	);
	const { gjelderId, gjelderNavn } = useStore.getState();

	return (
		<div className={styles["oppdrag-panel"]}>
			<div className={styles["oppdrag-panel__column"]}>
				<LabelText label={"Gjelder"} text={gjelderId} />
				<LabelText label={"Fagsystem id"} text={props.oppdrag.fagsystemId} />
				<LabelText label={"Status"} text={props.oppdrag.kodeStatus} />
				{oppdragsEnhet?.behandlendeEnhet && (
					<EnhetLabel enhet={oppdragsEnhet.behandlendeEnhet} />
				)}
			</div>
			<div className={styles["oppdrag-panel__column"]}>
				<LabelText label={"Navn"} text={gjelderNavn} />
				<LabelText label={"Oppdrags id"} text={props.oppdrag.oppdragsId} />
				<LabelText label={"Beregnes nå"} text={props.oppdrag.kjorIdag} />
				{oppdragsEnhet?.enhet && <EnhetLabel enhet={oppdragsEnhet.enhet} />}
			</div>
			<div className={styles["oppdrag-panel__column"]}>
				<LabelText
					nowrap
					label={"Fagområde"}
					text={props.oppdrag.navnFagomraade}
				/>
				{props.skattekortStatus && props.isSkattepliktig && (
					<LabelText
						nowrap
						label={"Skattekort status"}
						text={statusMessage(props.skattekortStatus)}
					/>
				)}
			</div>
		</div>
	);
}

function statusMessage(status?: string) {
	switch (status) {
		case "IKKE_FORESPURT":
			return "Kan bestilles";
		case "UGYLDIG_FNR":
			return "Ugyldig fødselsnummer";
		case "IKKE_BESTILT":
			return "Venter på bestilling";
		case "BESTILT":
			return "Bestilt";
		case "VENTER_PAA_UTSENDING":
			return "Venter på utsending";
		case "SENDT_FORSYSTEM":
			return "Skattekort OK";
		default:
			return "Feil ved henting av skattekortstatus";
	}
}
