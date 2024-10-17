import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Loader } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import Breadcrumbs from "../../components/Breadcrumbs";
import OppdragsEgenskapPanel from "../../components/OppdragsEgenskapPanel";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/common-styles.module.css";
import { ROOT } from "../../util/constant";
import EnhetshistorikkModal from "./EnhetshistorikkModal";
import OmposteringModal from "./OmposteringModal";
import OppdragLinjeTable from "./OppdragLinjeTable";
import styles from "./OppdragsLinjePage.module.css";
import StatushistorikkModal from "./StatushistorikkModal";

export default function OppdragsLinjePage() {
  const navigate = useNavigate();

  const { gjelderId } = useStore.getState();
  const { oppdrag } = useStore();
  const { data: oppdragsLinjer } = apiService.useFetchHentOppdragsLinjer(
    oppdrag?.oppdragsId,
  );

  useEffect(() => {
    if (!gjelderId || oppdrag === undefined) {
      navigate(ROOT);
    }
  }, [gjelderId, oppdrag, navigate]);

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
                <OmposteringModal oppdragsId={oppdrag!.oppdragsId} />
              </Suspense>
              <Suspense fallback={<Loader size="medium" title="Laster ..." />}>
                <StatushistorikkModal oppdragsId={oppdrag!.oppdragsId} />
              </Suspense>
              <Suspense fallback={<Loader size="medium" title="Laster ..." />}>
                <EnhetshistorikkModal oppdragsId={oppdrag!.oppdragsId} />
              </Suspense>
            </div>
          </div>

          <OppdragLinjeTable
            oppdragsId={oppdrag!.oppdragsId}
            oppdragsLinjer={oppdragsLinjer}
          />
        </div>
      )}
    </>
  );
}
