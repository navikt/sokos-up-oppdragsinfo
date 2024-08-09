import { Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Heading, Loader } from "@navikt/ds-react";
import apiService from "../api/apiService";
import Breadcrumbs from "../components/common/Breadcrumbs";
import OppdragsEgenskapPanel from "../components/common/OppdragsEgenskapPanel";
import EnhetshistorikkModal from "../components/oppdragslinjer/EnhetshistorikkModal";
import OmposteringModal from "../components/oppdragslinjer/OmposteringModal";
import OppdragLinjerTable from "../components/oppdragslinjer/OppdragLinjerTable";
import StatushistorikkModal from "../components/oppdragslinjer/StatushistorikkModal";
import { useAppState } from "../store/AppState";
import commonstyles from "../styles/common-styles.module.css";
import { BASENAME } from "../util/constant";
import styles from "./OppdragsLinjePage.module.css";

const OppdragsLinjePage = () => {
  const location = useLocation();
  const { gjelderId } = useAppState.getState();
  const { oppdrag, setOppdrag } = useAppState((state) => ({
    oppdrag: state.oppdrag!,
    setOppdrag: state.setOppdrag,
  }));
  const oppdragsLinjer = apiService.useFetchHentOppdragsLinjer(
    oppdrag?.oppdragsId,
  ).data;

  useEffect(() => {
    if (!gjelderId || (!location.state && oppdrag === undefined)) {
      window.location.replace(BASENAME);
      return;
    }

    if (
      oppdrag === undefined ||
      (location.state !== null &&
        oppdrag.oppdragsId !== location.state.oppdragsId)
    ) {
      setOppdrag(location.state);
    }
  }, [gjelderId, location.state, oppdrag, setOppdrag]);

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large">
          Oppdragsinfo
        </Heading>
      </div>
      {oppdragsLinjer && (
        <div className={styles.oppdragslinjer}>
          <div className={styles.oppdragslinjer__top}>
            <Breadcrumbs searchLink trefflistelink oppdrag />
            <div className={styles.oppdragslinjer__toppinfo}>
              <div className={styles.oppdragslinjer__column}>
                {gjelderId && oppdrag && (
                  <OppdragsEgenskapPanel oppdrag={oppdrag} />
                )}
              </div>
            </div>
            <div className={commonstyles.knapperad__left}>
              <Suspense fallback={<Loader size="medium" title="Laster ..." />}>
                <OmposteringModal oppdragsId={oppdrag.oppdragsId} />
              </Suspense>
              <Suspense fallback={<Loader size="medium" title="Laster ..." />}>
                <StatushistorikkModal oppdragsId={oppdrag.oppdragsId} />
              </Suspense>
              <Suspense fallback={<Loader size="medium" title="Laster ..." />}>
                <EnhetshistorikkModal oppdragsId={oppdrag.oppdragsId} />
              </Suspense>
            </div>
          </div>

          <OppdragLinjerTable
            oppdragsId={oppdrag.oppdragsId}
            oppdragsLinjer={oppdragsLinjer}
          />
        </div>
      )}
    </>
  );
};
export default OppdragsLinjePage;
