import { useLocation, useParams } from "react-router-dom";
import { Heading } from "@navikt/ds-react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import LabelText from "../components/common/LabelText";
import EnhetLabel from "../components/oppdragsdetaljer/EnhetLabel";
import EnhetshistorikkModal from "../components/oppdragsdetaljer/EnhetshistorikkModal";
import OmposteringModal from "../components/oppdragsdetaljer/OmposteringModal";
import OppdragTable from "../components/oppdragsdetaljer/OppdragTable";
import StatushistorikkModal from "../components/oppdragsdetaljer/StatushistorikkModal";
import { OppdragsEgenskap } from "../models/OppdragsEgenskaper";
import RestService from "../services/rest-service";
import commonstyles from "../util/common-styles.module.css";
import { retrieveId, retrieveNavn } from "../util/commonUtils";
import { BASENAME } from "../util/constants";
import styles from "./Oppdragsdetaljer.module.css";

const OppdragsdetaljerPage = () => {
  //const { oppdragsID = "" } = useParams<OppdragsdetaljerParams>();
  const location = useLocation();
  const oppdragsEgenskap = location.state;

  console.log("OppdragsEgenskap:", oppdragsEgenskap); // Debugging line

  const gjelderId = retrieveId();
  const { oppdragslinjeListe } = RestService.useFetchOppdragslinjer(
    gjelderId,
    oppdragsEgenskap.oppdragsId,
  );

  if (!gjelderId) window.location.replace(BASENAME);

  console.log("OppdragsEgenskap after fetch:", oppdragsEgenskap); // Debugging line
  console.log("OppdragslinjeListe:", oppdragslinjeListe); // Debugging line


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
                    id={oppdragsEgenskap.oppdragsID}
                  />
                )}
                <StatushistorikkModal id={oppdragsEgenskap.oppdragsID} />
                <EnhetshistorikkModal id={oppdragsEgenskap.oppdragsID} />
              </div>
            </div>
          </div>
          <OppdragTable
            oppdragsid={oppdragsEgenskap.oppdragsID}
            oppdragsdetaljer={oppdragsEgenskap.oppdrag}
          />
        </div>
      )}
    </>
  );
};
export default OppdragsdetaljerPage;
