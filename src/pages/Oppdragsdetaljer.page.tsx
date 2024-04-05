import Breadcrumbs from "../components/common/Breadcrumbs";
import EnhetVisning from "../components/oppdragsdetaljer/EnhetVisning";
import EnhetshistorikkVisning from "../components/oppdragsdetaljer/EnhetshistorikkVisning";
import LabelText from "../components/common/LabelText";
import OmposteringerVisning from "../components/oppdragsdetaljer/OmposteringerVisning";
import OppdragTable from "../components/oppdragsdetaljer/OppdragTable";
import RestService from "../services/rest-service";
import StatushistorikkVisning from "../components/oppdragsdetaljer/StatushistorikkVisning";
import commonstyles from "../util/common-styles.module.css";
import styles from "./Oppdragsdetaljer.module.css";
import { BASENAME } from "../util/constants";
import { Loader } from "@navikt/ds-react";
import { Oppdrag } from "../models/Oppdrag";
import { firstOf, retrieveId } from "../util/commonUtils";
import { useParams } from "react-router-dom";
import { getOppdragFromTreffliste } from "../models/Treffliste";

type OppdragsdetaljerParams = {
  oppdragsID: string;
};
const OppdragsdetaljerPage = () => {
  const { oppdragsID = "" } = useParams<OppdragsdetaljerParams>();
  const gjelderId = retrieveId();
  const { treffliste } = RestService.useFetchTreffliste(gjelderId);
  const { oppdrag: oppdragsdetaljer, isLoading } = RestService.useFetchOppdrag(gjelderId, oppdragsID);

  const oppdrag: Oppdrag | null = getOppdragFromTreffliste(treffliste, +oppdragsID);

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
          <div className={styles.oppdragsdetaljer__toppinfo}>
            <h1>Oppdrag</h1>
            <div className={styles.oppdragsdetaljer__columns}></div>
            <div className={styles.oppdragsdetaljer__column}>
              {gjelderId && oppdrag && (
                <div className={styles.oppdragsdetaljer__columns}>
                  <div className={styles.oppdragsdetaljer__column}>
                    {gjelderId && treffliste && (
                      <LabelText
                        label={"Gjelder ID"}
                        text={`${gjelderId}, ${firstOf(treffliste)?.gjelderNavn ?? "N.N."} `}
                      />
                    )}
                    <LabelText label={"Fagområde"} text={oppdrag.navnFagOmraade} />
                  </div>
                  <div className={styles.oppdragsdetaljer__column}>
                    <LabelText label={"Fagsystem ID"} text={oppdrag.fagsystemId} />
                    <LabelText label={"Oppdrags ID"} text={oppdrag.oppdragsId} />
                  </div>
                  <div className={styles.oppdragsdetaljer__column}>
                    <LabelText label={"Beregnes nå"} text={oppdrag.kjorIdag} />
                    <LabelText label={"Status"} text={oppdrag.kodeStatus} />
                  </div>
                </div>
              )}
              {gjelderId && oppdragsdetaljer.behandlendeEnhet && (
                <EnhetVisning enhet={oppdragsdetaljer.behandlendeEnhet} />
              )}
              {gjelderId && oppdragsdetaljer.enhet && <EnhetVisning enhet={oppdragsdetaljer.enhet} />}
            </div>
            <div className={commonstyles.knapperad__right}>
              {gjelderId && (
                <OmposteringerVisning
                  enabled={oppdragsdetaljer.harOmposteringer}
                  gjelderId={gjelderId}
                  id={oppdragsID}
                />
              )}
              <StatushistorikkVisning id={oppdragsID} />
              <EnhetshistorikkVisning id={oppdragsID} />
            </div>
          </div>
          <OppdragTable oppdragsid={oppdragsID} oppdragsdetaljer={oppdragsdetaljer} />
        </div>
      )}
    </>
  );
};
export default OppdragsdetaljerPage;
