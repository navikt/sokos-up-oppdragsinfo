import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs";
import LabelText from "../components/common/LabelText";
import EnhetLabel from "../components/oppdragsdetaljer/EnhetLabel";
import EnhetshistorikkModal from "../components/oppdragsdetaljer/EnhetshistorikkModal";
import OmposteringModal from "../components/oppdragsdetaljer/OmposteringModal";
import OppdragTable from "../components/oppdragsdetaljer/OppdragTable";
import StatushistorikkModal from "../components/oppdragsdetaljer/StatushistorikkModal";
import { Oppdrag } from "../models/Oppdrag";
import { getOppdragFromTreffliste } from "../models/Treffliste";
import RestService from "../services/rest-service";
import commonstyles from "../util/common-styles.module.css";
import { firstOf, retrieveId } from "../util/commonUtils";
import { BASENAME } from "../util/constants";
import styles from "./Oppdragsdetaljer.module.css";

type OppdragsdetaljerParams = {
  oppdragsID: string;
};
const OppdragsdetaljerPage = () => {
  const { oppdragsID = "" } = useParams<OppdragsdetaljerParams>();
  const gjelderId = retrieveId();
  const { treffliste } = RestService.useFetchTreffliste(gjelderId);
  const { oppdrag: oppdragsdetaljer } = RestService.useFetchOppdrag(
    gjelderId,
    oppdragsID,
  );

  const oppdrag: Oppdrag | null = getOppdragFromTreffliste(
    treffliste,
    +oppdragsID,
  );

  if (!gjelderId) window.location.replace(BASENAME);

  return (
    <>
      <h1>Oppdragsinfo</h1>
      {oppdragsdetaljer && (
        <div className={styles.oppdragsdetaljer}>
          <div className={styles.oppdragsdetaljer__top}>
            <Breadcrumbs searchLink trefflistelink oppdrag />
            <div className={styles.oppdragsdetaljer__toppinfo}>
              <h2>Oppdrag</h2>
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
                      <LabelText
                        label={"Fagområde"}
                        text={oppdrag.navnFagOmraade}
                      />
                    </div>
                    <div className={styles.oppdragsdetaljer__column}>
                      <LabelText
                        label={"Fagsystem ID"}
                        text={oppdrag.fagsystemId}
                      />
                      <LabelText
                        label={"Oppdrags ID"}
                        text={oppdrag.oppdragsId}
                      />
                    </div>
                    <div className={styles.oppdragsdetaljer__column}>
                      <LabelText
                        label={"Beregnes nå"}
                        text={oppdrag.kjorIdag}
                      />
                      <LabelText label={"Status"} text={oppdrag.kodeStatus} />
                    </div>
                  </div>
                )}
                {gjelderId && oppdragsdetaljer.behandlendeEnhet && (
                  <EnhetLabel enhet={oppdragsdetaljer.behandlendeEnhet} />
                )}
                {gjelderId && oppdragsdetaljer.enhet && (
                  <EnhetLabel enhet={oppdragsdetaljer.enhet} />
                )}
              </div>
              <div className={commonstyles.knapperad__right}>
                {gjelderId && (
                  <OmposteringModal
                    enabled={oppdragsdetaljer.harOmposteringer}
                    gjelderId={gjelderId}
                    id={oppdragsID}
                  />
                )}
                <StatushistorikkModal id={oppdragsID} />
                <EnhetshistorikkModal id={oppdragsID} />
              </div>
            </div>
          </div>
          <OppdragTable
            oppdragsid={oppdragsID}
            oppdragsdetaljer={oppdragsdetaljer}
          />
        </div>
      )}
    </>
  );
};
export default OppdragsdetaljerPage;
