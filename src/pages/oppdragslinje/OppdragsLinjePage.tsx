import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Heading } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import Breadcrumbs from "../../components/Breadcrumbs";
import OppdragEgenskapPanel from "../../components/OppdragEgenskapPanel";
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
          Oppdragsinfo: Oppdrag
        </Heading>
      </div>
      {oppdragsLinjer && (
        <div className={styles["oppdragslinjer"]}>
          <div className={styles["oppdragslinjer-top"]}>
            <Breadcrumbs searchLink trefflistelink oppdrag />
            <div className={styles["oppdragslinjer-toppinfo"]}>
              <div className={styles["oppdragslinjer-column"]}>
                {gjelderId && oppdrag && (
                  <OppdragEgenskapPanel oppdrag={oppdrag} />
                )}
              </div>
            </div>
            <div className={commonstyles["knapperad-left"]}>
              <Suspense
                fallback={
                  <Button size="small" loading variant="secondary-neutral">
                    Omposteringer
                  </Button>
                }
              >
                <OmposteringModal oppdragsId={oppdrag!.oppdragsId} />
              </Suspense>
              <Suspense
                fallback={
                  <Button size="small" loading variant="secondary-neutral">
                    Statushistorikk
                  </Button>
                }
              >
                <StatushistorikkModal oppdragsId={oppdrag!.oppdragsId} />
              </Suspense>
              <Suspense
                fallback={
                  <Button size="small" loading variant="secondary-neutral">
                    Enhetshistorikk
                  </Button>
                }
              >
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
