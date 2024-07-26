import { useLocation } from "react-router-dom";
import { Heading } from "@navikt/ds-react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import LabelText from "../components/common/LabelText";
import EnhetshistorikkModal from "../components/oppdragslinjer/EnhetshistorikkModal";
import OmposteringModal from "../components/oppdragslinjer/OmposteringModal";
import StatushistorikkModal from "../components/oppdragslinjer/StatushistorikkModal";
import RestService from "../api/rest-service";
import commonstyles from "../styles/common-styles.module.css";
import { BASENAME } from "../util/constant";
import styles from "./OppdragsLinjePage.module.css";
import { useAppState } from "../store/AppState";
import { useEffect } from "react";
import EnhetLabel from "../components/oppdragslinjer/EnhetLabel";
import OppdragTable from "../components/oppdragslinjer/OppdragTable";

const OppdragsLinjePage = () => {
  const location = useLocation();
  const { gjelderId, gjelderNavn } = useAppState.getState();
  const { oppdragsEgenskap, setOppdragsEgenskap } = useAppState((state) => ({
    oppdragsEgenskap: state.selectedOppdragsEgenskap!,
    setOppdragsEgenskap: state.setSelectedOppdragsEgenskap
  }));
  const oppdragsLinjer = RestService.useFetchHentOppdragsLinjer(oppdragsEgenskap?.oppdragsId).data;
  const oppdragsEnhet = RestService.useFetchHentOppdragsEnheter(oppdragsEgenskap?.oppdragsId).data;

  useEffect(() => {
    if (!gjelderId || (!location.state && oppdragsEgenskap === undefined)) {
      window.location.replace(BASENAME);
      return;
    }

    if (oppdragsEgenskap === undefined || (location.state !== null && oppdragsEgenskap.oppdragsId !== location.state.oppdragsId)) {
      setOppdragsEgenskap(location.state);
    }
  }, [oppdragsLinjer]);

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large">
          Oppdragsinfo
        </Heading>
      </div>
      {oppdragsLinjer && (
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
                          text={`${gjelderId}, ${gjelderNavn}`}
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
                {oppdragsEnhet && oppdragsEnhet.behandlendeEnhet && (
                  <EnhetLabel enhet={oppdragsEnhet.behandlendeEnhet} />
                )}
                {oppdragsEnhet && oppdragsEnhet.enhet && (
                  <EnhetLabel enhet={oppdragsEnhet.enhet} />
                )}
              </div>
              <div className={commonstyles.knapperad__right}>
                <OmposteringModal oppdragsId={oppdragsEgenskap.oppdragsId} />
                <StatushistorikkModal oppdragsId={oppdragsEgenskap.oppdragsId} />
                <EnhetshistorikkModal oppdragsId={oppdragsEgenskap.oppdragsId} />
              </div>
            </div>
          </div>
          <OppdragTable
            oppdragsId={oppdragsEgenskap.oppdragsId}
            oppdragsLinjer={oppdragsLinjer}
            oppdragsEgenskap={oppdragsEgenskap}
          />
        </div>
      )}
    </>
  )
    ;
};
export default OppdragsLinjePage;
