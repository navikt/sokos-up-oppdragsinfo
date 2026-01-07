import { useFetchHentOppdragsEnheter } from "../api/apiService";
import EnhetLabel from "../pages/oppdrag/EnhetLabel";
import { useStore } from "../store/AppState";
import type { Oppdrag } from "../types/Oppdrag";
import LabelText from "./LabelText";
import styles from "./OppdragEgenskapPanel.module.css";

interface OppdragsEgenskapPanelProps {
	oppdrag: Oppdrag;
	skattekortStatus?: string;
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
				{props.skattekortStatus && (
					<LabelText
						nowrap
						label={"Skattekort status"}
						text={props.skattekortStatus!}
					/>
				)}
			</div>
		</div>
	);
}
