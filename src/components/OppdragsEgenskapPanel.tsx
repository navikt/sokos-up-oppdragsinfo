import apiService from "../api/apiService";
import EnhetLabel from "../pages/oppdragslinje/EnhetLabel";
import styles from "../pages/oppdragslinje/OppdragsLinjePage.module.css";
import { useStore } from "../store/AppState";
import { Oppdrag } from "../types/OppdragsListe";
import LabelText from "./LabelText";

interface OppdragsEgenskapPanelProps {
  oppdrag: Oppdrag;
}

export default function OppdragsEgenskapPanel(
  props: OppdragsEgenskapPanelProps,
) {
  const oppdragsEnhet = apiService.useFetchHentOppdragsEnheter(
    props.oppdrag.oppdragsId,
  ).data;
  const { gjelderId, gjelderNavn } = useStore.getState();

  return (
    <div className={styles.oppdragslinjer__columns}>
      <div className={styles.oppdragslinjer__column}>
        <LabelText label={"Gjelder ID"} text={gjelderId} />
        <LabelText label={"Fagsystem ID"} text={props.oppdrag.fagSystemId} />
        <LabelText label={"Status"} text={props.oppdrag.kodeStatus} />
        {oppdragsEnhet && oppdragsEnhet.behandlendeEnhet && (
          <EnhetLabel enhet={oppdragsEnhet.behandlendeEnhet} />
        )}
      </div>
      <div className={styles.oppdragslinjer__column}>
        <LabelText label={"Navn"} text={gjelderNavn} />
        <LabelText label={"Oppdrags ID"} text={props.oppdrag.oppdragsId} />
        <LabelText label={"Beregnes nå"} text={props.oppdrag.kjorIdag} />
        {oppdragsEnhet && oppdragsEnhet.enhet && (
          <EnhetLabel enhet={oppdragsEnhet.enhet} />
        )}
      </div>
      <div className={styles.oppdragslinjer__column}>
        <LabelText label={"Fagområde"} text={props.oppdrag.navnFagOmraade} />
      </div>
    </div>
  );
}
