import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileCsvIcon } from "@navikt/aksel-icons";
import { Button, Heading } from "@navikt/ds-react";
import apiService from "../api/apiService";
import Breadcrumbs from "../components/Breadcrumbs";
import OppdragEgenskapPanel from "../components/OppdragEgenskapPanel";
import { useStore } from "../store/AppState";
import commonstyles from "../styles/common-styles.module.css";
import { ROOT } from "../util/constant";
import { downloadAsCsv } from "../util/csvExport";
import EnhetshistorikkModal from "./oppdrag/EnhetshistorikkModal";
import OmposteringModal from "./oppdrag/OmposteringModal";
import OppdragLinjeTable from "./oppdrag/OppdragLinjeTable";
import styles from "./oppdrag/OppdragPage.module.css";
import StatushistorikkModal from "./oppdrag/StatushistorikkModal";

export default function OppdragPage() {
  const navigate = useNavigate();

  const { gjelderId } = useStore.getState();
  const { oppdrag } = useStore();
  const { data: oppdragsLinjer } = apiService.useFetchHentOppdragsLinjer(
    oppdrag?.oppdragsId,
  );

  useEffect(() => {
    if (!gjelderId || oppdrag === undefined) {
      navigate(ROOT, { replace: true });
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
              <div className={styles["oppdragslinjer-buttons"]}>
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
                        Status historikk
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
                <div className={commonstyles.knapperad}>
                  <Button
                    size={"small"}
                    variant={"secondary-neutral"}
                    onClick={() =>
                      downloadAsCsv(
                        gjelderId,
                        oppdrag!.navnFagOmraade,
                        oppdragsLinjer,
                      )
                    }
                  >
                    Til Excel <FileCsvIcon title="a11y-title" fontSize="1rem" />
                  </Button>
                </div>
              </div>
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
