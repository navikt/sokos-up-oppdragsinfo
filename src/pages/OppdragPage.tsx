import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Heading } from "@navikt/ds-react";
import apiService from "../api/apiService";
import Breadcrumbs from "../components/Breadcrumbs";
import OppdragEgenskapPanel from "../components/OppdragEgenskapPanel";
import { useStore } from "../store/AppState";
import commonstyles from "../styles/common-styles.module.css";
import { ROOT } from "../util/constant";
import EnhetshistorikkModal from "./oppdrag/EnhetshistorikkModal";
import OmposteringModal from "./oppdrag/OmposteringModal";
import OppdragLinjeTable from "./oppdrag/OppdragLinjeTable";
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
        <div className={commonstyles.container}>
          <div className={commonstyles.header}>
            <Breadcrumbs searchLink trefflistelink oppdrag />
            <div className={commonstyles.headerInfo}>
              <div className={commonstyles.headerInfoColumn}>
                {gjelderId && oppdrag && (
                  <OppdragEgenskapPanel oppdrag={oppdrag} />
                )}
              </div>
            </div>
            <div className={commonstyles.buttonrowLeft}>
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
