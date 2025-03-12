import apiService from "../api/apiService";
import EnhetLabel from "../pages/oppdrag/EnhetLabel";
import styles from "../pages/oppdrag/OppdragPage.module.css";
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
      <div className={styles["oppdragslinjer-column"]}>
        <LabelText label={"Gjelder"} text={gjelderId} />
        <LabelText label={"Fagsystem id"} text={props.oppdrag.fagSystemId} />
        <LabelText label={"Status"} text={props.oppdrag.kodeStatus} />
        {oppdragsEnhet && oppdragsEnhet.behandlendeEnhet && (
          <EnhetLabel enhet={oppdragsEnhet.behandlendeEnhet} />
        )}
      </div>
      <div className={styles["oppdragslinjer-column"]}>
        <LabelText label={"Navn"} text={gjelderNavn} />
        <LabelText label={"Oppdrags id"} text={props.oppdrag.oppdragsId} />
        <LabelText label={"Beregnes nå"} text={props.oppdrag.kjorIdag} />
        {oppdragsEnhet && oppdragsEnhet.enhet && (
          <EnhetLabel enhet={oppdragsEnhet.enhet} />
        )}
      </div>
      <div className={styles["oppdragslinjer-column"]}>
        <LabelText
          nowrap
          label={"Fagområde"}
          text={props.oppdrag.navnFagOmraade}
        />
      </div>
    </div>
  );
}
