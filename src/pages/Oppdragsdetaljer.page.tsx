import { useParams } from "react-router-dom";
import { Heading } from "@navikt/ds-react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import LabelText from "../components/common/LabelText";
import EnhetLabel from "../components/oppdragsdetaljer/EnhetLabel";
import EnhetshistorikkModal from "../components/oppdragsdetaljer/EnhetshistorikkModal";
import OmposteringModal from "../components/oppdragsdetaljer/OmposteringModal";
import OppdragTable from "../components/oppdragsdetaljer/OppdragTable";
import StatushistorikkModal from "../components/oppdragsdetaljer/StatushistorikkModal";
import { Oppdragegenskaper } from "../models/Oppdragegenskaper";
import RestService from "../services/rest-service";
import commonstyles from "../util/common-styles.module.css";
import { retrieveId, retrieveNavn } from "../util/commonUtils";
import { BASENAME } from "../util/constants";
import styles from "./Oppdragsdetaljer.module.css";

type OppdragsdetaljerParams = {
  oppdragsID: string;
};
const OppdragsdetaljerPage = () => {
  const { oppdragsID = "" } = useParams<OppdragsdetaljerParams>();
  const gjelderId = retrieveId();
  const { oppdrag } = RestService.useFetchOppdrag(gjelderId, oppdragsID);

  const oppdragsegenskaper: Oppdragegenskaper | undefined =
    oppdrag?.oppdragsegenskaper;

  if (!gjelderId) window.location.replace(BASENAME);

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large">
          Oppdragsinfo
        </Heading>
      </div>
      {oppdrag && (
        <div className={styles.oppdragsdetaljer}>
          <div className={styles.oppdragsdetaljer__top}>
            <Breadcrumbs searchLink trefflistelink oppdrag />
            <div className={styles.oppdragsdetaljer__toppinfo}>
              <Heading level="2" size="medium">
                Oppdrag
              </Heading>
              <div className={styles.oppdragsdetaljer__columns}></div>
              <div className={styles.oppdragsdetaljer__column}>
                {gjelderId && oppdragsegenskaper && (
                  <div className={styles.oppdragsdetaljer__columns}>
                    <div className={styles.oppdragsdetaljer__column}>
                      {gjelderId && (
                        <LabelText
                          label={"Gjelder ID"}
                          text={`${gjelderId}, ${retrieveNavn()}`}
                        />
                      )}
                      <LabelText
                        label={"Fagområde"}
                        text={oppdragsegenskaper.navnFagOmraade}
                      />
                    </div>
                    <div className={styles.oppdragsdetaljer__column}>
                      <LabelText
                        label={"Fagsystem ID"}
                        text={oppdragsegenskaper.fagsystemId}
                      />
                      <LabelText
                        label={"Oppdrags ID"}
                        text={oppdragsegenskaper.oppdragsId}
                      />
                    </div>
                    <div className={styles.oppdragsdetaljer__column}>
                      <LabelText
                        label={"Beregnes nå"}
                        text={oppdragsegenskaper.kjorIdag}
                      />
                      <LabelText
                        label={"Status"}
                        text={oppdragsegenskaper.kodeStatus}
                      />
                    </div>
                  </div>
                )}
                {gjelderId && oppdrag.behandlendeEnhet && (
                  <EnhetLabel enhet={oppdrag.behandlendeEnhet} />
                )}
                {gjelderId && oppdrag.enhet && (
                  <EnhetLabel enhet={oppdrag.enhet} />
                )}
              </div>
              <div className={commonstyles.knapperad__right}>
                {gjelderId && (
                  <OmposteringModal
                    enabled={oppdrag.harOmposteringer}
                    gjelderId={gjelderId}
                    id={oppdragsID}
                  />
                )}
                <StatushistorikkModal id={oppdragsID} />
                <EnhetshistorikkModal id={oppdragsID} />
              </div>
            </div>
          </div>
          <OppdragTable oppdragsid={oppdragsID} oppdragsdetaljer={oppdrag} />
        </div>
      )}
    </>
  );
};
export default OppdragsdetaljerPage;
