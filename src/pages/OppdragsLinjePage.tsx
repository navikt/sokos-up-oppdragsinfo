import { useLocation } from "react-router-dom";
import { Heading } from "@navikt/ds-react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import LabelText from "../components/common/LabelText";
import EnhetLabel from "../components/oppdragslinjer/EnhetLabel";
import EnhetshistorikkModal from "../components/oppdragslinjer/EnhetshistorikkModal";
import OmposteringModal from "../components/oppdragslinjer/OmposteringModal";
import OppdragTable from "../components/oppdragslinjer/OppdragTable";
import StatushistorikkModal from "../components/oppdragslinjer/StatushistorikkModal";
import RestService from "../services/rest-service";
import commonstyles from "../util/common-styles.module.css";
import { retrieveId, retrieveNavn } from "../util/commonUtils";
import { BASENAME } from "../util/constants";
import styles from "./OppdragsLinjePage.module.css";

const OppdragsLinjePage = () => {
  const location = useLocation();
  const oppdragsEgenskap = location.state;

  const gjelderId = retrieveId();
  const { oppdragslinjeListe } = RestService.useFetchOppdragslinjer(
    gjelderId,
    oppdragsEgenskap.oppdragsId,
  );

  if (!gjelderId) window.location.replace(BASENAME);

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large">
          Oppdragsinfo
        </Heading>
      </div>
      {oppdragslinjeListe && (
        <div className={styles.oppdragsdetaljer}>
          <div className={styles.oppdragsdetaljer__top}>
            <Breadcrumbs searchLink trefflistelink oppdrag />
            <div className={styles.oppdragsdetaljer__toppinfo}>
              <Heading level="2" size="medium">
                Oppdrag
              </Heading>
              <div className={styles.oppdragsdetaljer__columns}></div>
              <div className={styles.oppdragsdetaljer__column}>
                {gjelderId && oppdragsEgenskap && (
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
                        text={oppdragsEgenskap.navnFagOmraade}
                      />
                    </div>
                    <div className={styles.oppdragsdetaljer__column}>
                      <LabelText
                        label={"Fagsystem ID"}
                        text={oppdragsEgenskap.fagsystemId}
                      />
                      <LabelText
                        label={"Oppdrags ID"}
                        text={oppdragsEgenskap.oppdragsId}
                      />
                    </div>
                    <div className={styles.oppdragsdetaljer__column}>
                      <LabelText
                        label={"Beregnes nå"}
                        text={oppdragsEgenskap.kjorIdag}
                      />
                      <LabelText
                        label={"Status"}
                        text={oppdragsEgenskap.kodeStatus}
                      />
                    </div>
                  </div>
                )}
                // TODO: Lag mock-endepunkt for den nye DTO klassen fra backend
                {/* {gjelderId && oppdrag.behandlendeEnhet && (
                  <EnhetLabel enhet={oppdrag.behandlendeEnhet} />
                )}
                {gjelderId && oppdrag.enhet && (
                  <EnhetLabel enhet={oppdrag.enhet} />
                )} */}
              </div>
              <div className={commonstyles.knapperad__right}>
                {gjelderId && (
                  <OmposteringModal
                    enabled={oppdragsEgenskap.harOmposteringer}
                    gjelderId={gjelderId}
                    id={oppdragsEgenskap.oppdragsId}
                  />
                )}
                <StatushistorikkModal id={oppdragsEgenskap.oppdragsId} />
                <EnhetshistorikkModal id={oppdragsEgenskap.oppdragsId} />
              </div>
            </div>
          </div>
          <OppdragTable
            oppdragsId={oppdragsEgenskap.oppdragsId}
            oppdragsLinjer={oppdragslinjeListe}
            oppdragsEgenskap={oppdragsEgenskap}
          />
        </div>
      )}
    </>
  );
};
export default OppdragsLinjePage;
