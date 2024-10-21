import apiService from "../api/apiService";
import EnhetLabel from "../pages/oppdragslinje/EnhetLabel";
import styles from "../pages/oppdragslinje/OppdragsLinjePage.module.css";
import { useStore } from "../store/AppState";
import { Oppdrag } from "../types/Oppdrag";
import LabelText from "./LabelText";

interface OppdragsEgenskapPanelProps {
  oppdrag: Oppdrag;
}

export default function OppdragEgenskapPanel(
  props: OppdragsEgenskapPanelProps,
) {
  const { data: oppdragsEnhet } = apiService.useFetchHentOppdragsEnheter(
    props.oppdrag.oppdragsId,
  );
  const { gjelderId, gjelderNavn } = useStore.getState();

  return (
    <div className={styles["oppdragslinjer-panel"]}>
      <div className={styles.oppdragslinjerColumn}>
        <LabelText label={"Gjelder ID"} text={gjelderId} />
        <LabelText label={"Fagsystem ID"} text={props.oppdrag.fagSystemId} />
        <LabelText label={"Status"} text={props.oppdrag.kodeStatus} />
        {oppdragsEnhet &&
          typeof oppdragsEnhet.behandlendeEnhet === "object" && (
            <EnhetLabel enhet={oppdragsEnhet.behandlendeEnhet} />
          )}
      </div>
      <div className={styles["oppdragslinjer-column"]}>
        <LabelText label={"Navn"} text={gjelderNavn} />
        <LabelText label={"Oppdrags ID"} text={props.oppdrag.oppdragsId} />
        <LabelText label={"Beregnes nå"} text={props.oppdrag.kjorIdag} />
        {oppdragsEnhet && typeof oppdragsEnhet.enhet === "object" && (
          <EnhetLabel enhet={oppdragsEnhet.enhet} />
        )}
      </div>
      <div className={styles["oppdragslinjer-column"]}>
        <LabelText label={"Fagområde"} text={props.oppdrag.navnFagOmraade} />
      </div>
    </div>
  );
}
