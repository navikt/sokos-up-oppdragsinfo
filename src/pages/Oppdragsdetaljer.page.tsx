import { Loader } from "@navikt/ds-react";
import RestService from "../services/rest-service";
import EnhetshistorikkVisning from "../components/oppdragsdetaljer/EnhetshistorikkVisning";
import StatushistorikkVisning from "../components/oppdragsdetaljer/StatushistorikkVisning";
import OmposteringerVisning from "../components/oppdragsdetaljer/OmposteringerVisning";
import styles from "./Oppdragsdetaljer.module.css";
import commonstyles from "../util/common-styles.module.css";
import LabelText from "../components/common/LabelText";
import { useParams } from "react-router-dom";
import { firstOf, formatDate, isEmpty, retrieveId } from "../util/commonUtils";
import { isArray } from "@grafana/faro-web-sdk";
import { BASENAME } from "../util/constants";
import NullstillButton from "../components/common/NullstillButton";
import OppdragTable from "../components/oppdragsdetaljer/OppdragTable";
import { Oppdrag } from "../models/Oppdrag";
import Breadcrumbs from "../components/common/Breadcrumbs";

type OppdragsdetaljerParams = {
  oppdragsID: string;
};
const OppdragsdetaljerPage = () => {
  const { oppdragsID = "" } = useParams<OppdragsdetaljerParams>();
  const gjelderId = retrieveId();
  const { treffliste } = RestService.useFetchTreffliste(gjelderId);
  const { oppdrag: oppdragsdetaljer, isLoading } = RestService.useFetchOppdrag(gjelderId, oppdragsID);

  const oppdrag: Oppdrag | null =
    isArray(treffliste) &&
    !isEmpty(treffliste) &&
    !isEmpty(firstOf(treffliste).oppdragsListe) &&
    firstOf(treffliste).oppdragsListe.some((a) => a.oppdragsId === +oppdragsID)
      ? treffliste
          .reduce((a) => a)
          .oppdragsListe.filter((o) => o.oppdragsId === +oppdragsID)
          .reduce((a) => a)
      : null;

  if (!gjelderId) window.location.replace(BASENAME);

  return (
    <>
      <Breadcrumbs soklink trefflistelink />
      {isLoading && (
        <div className={commonstyles.contentloader}>
          <Loader size="3xlarge" title="Laster oppdragsdetaljer..." />
        </div>
      )}
      {!isLoading && oppdragsdetaljer && (
        <div className={styles.oppdragsdetaljer}>
          <div className={commonstyles.knapperad__right}>
            {gjelderId && (
              <OmposteringerVisning enabled={oppdragsdetaljer.harOmposteringer} gjelderId={gjelderId} id={oppdragsID} />
            )}
            <StatushistorikkVisning id={oppdragsID} />
            <EnhetshistorikkVisning id={oppdragsID} />
          </div>
          <div className={styles.oppdragsdetaljer__toppinfo}>
            <div className={styles.oppdragsdetaljer__columns}>
              {gjelderId && treffliste && (
                <LabelText
                  label={"Gjelder ID"}
                  text={`${gjelderId.substring(0, 6)} ${gjelderId.substring(6)}, ${firstOf(treffliste)?.gjelderNavn ?? "N.N."} `}
                />
              )}
            </div>
            <div className={styles.oppdragsdetaljer__columns}>
              {gjelderId && oppdragsdetaljer.behandlendeEnhet && (
                <div className={styles.oppdragsdetaljer__column}>
                  <LabelText label={"Enhetstype"} text={oppdragsdetaljer.behandlendeEnhet.type} />
                  <LabelText label={"Enhetsnr"} text={oppdragsdetaljer.behandlendeEnhet.enhet} />
                  <LabelText label={"Dato fom"} text={formatDate(oppdragsdetaljer.behandlendeEnhet.datoFom)} />
                </div>
              )}
              {gjelderId && oppdragsdetaljer.enhet && (
                <div className={styles.oppdragsdetaljer__column}>
                  <LabelText label={"Enhetstype"} text={oppdragsdetaljer.enhet.type} />
                  <LabelText label={"Enhetsnr"} text={oppdragsdetaljer.enhet.enhet} />
                  <LabelText label={"Dato fom"} text={formatDate(oppdragsdetaljer.enhet.datoFom)} />
                </div>
              )}
              {gjelderId && oppdrag && (
                <>
                  <div className={styles.oppdragsdetaljer__column}>
                    <LabelText label={"Fagområde"} text={oppdrag.navnFagOmraade} />
                    <LabelText label={"Fagsystem ID"} text={oppdrag.fagsystemId} />
                    <LabelText label={"Oppdrags ID"} text={oppdrag.oppdragsId} />
                  </div>
                  <div className={styles.oppdragsdetaljer__column}>
                    <LabelText label={"Beregnes nå"} text={oppdrag.kjorIdag} />
                    <LabelText label={"Status"} text={oppdrag.kodeStatus} />
                  </div>
                </>
              )}
            </div>
            <div className={commonstyles.knapperad__right}>
              <NullstillButton />
            </div>
          </div>
          <h1 className={styles.oppdragsdetaljer__heading}>Oppdrag</h1>
          <OppdragTable oppdragsid={oppdragsID} oppdragsdetaljer={oppdragsdetaljer} />
        </div>
      )}
    </>
  );
};
export default OppdragsdetaljerPage;
