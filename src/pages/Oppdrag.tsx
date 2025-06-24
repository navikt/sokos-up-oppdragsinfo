import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router";
import { FileCsvIcon } from "@navikt/aksel-icons";
import { Button, Heading } from "@navikt/ds-react";
import { useFetchHentOppdragsLinjer } from "../api/apiService";
import Breadcrumbs from "../components/Breadcrumbs";
import OppdragEgenskapPanel from "../components/OppdragEgenskapPanel";
import { useStore } from "../store/AppState";
import commonstyles from "../styles/bem-common.module.css";
import { OPPDRAG } from "../umami/umami";
import { downloadAsCsv } from "../util/csvExport";
import { ROOT } from "../util/routenames";
import EnhetshistorikkModal from "./oppdrag/EnhetshistorikkModal";
import OmposteringModal from "./oppdrag/OmposteringModal";
import OppdragLinjeTable from "./oppdrag/OppdragLinjeTable";
import StatushistorikkModal from "./oppdrag/StatushistorikkModal";

export default function Oppdrag() {
  const navigate = useNavigate();

  const { gjelderId } = useStore.getState();
  const { oppdrag } = useStore();
  const { data } = useFetchHentOppdragsLinjer(oppdrag?.oppdragsId);

  useEffect(() => {
    if (!gjelderId || oppdrag === undefined) {
      navigate(ROOT, { replace: true });
    }
  }, [gjelderId, oppdrag, navigate]);

  return (
    <div className={commonstyles["container"]}>
      <div className={commonstyles["container__header"]}>
        <Heading level="1" size="large" align="center">
          Oppdragsinfo: Oppdrag
        </Heading>
        <Breadcrumbs searchLink trefflistelink oppdrag />
        <div className={commonstyles["container__header-info"]}>
          {gjelderId && oppdrag && <OppdragEgenskapPanel oppdrag={oppdrag} />}
          <div className={commonstyles["button-row"]}>
            <div className={commonstyles["button-row--left"]}>
              <Suspense
                fallback={
                  <Button
                    data-umami-event={OPPDRAG.OMPOSTERINGER}
                    size="small"
                    loading
                    variant="secondary-neutral"
                  >
                    Omposteringer
                  </Button>
                }
              >
                <OmposteringModal oppdragsId={oppdrag!.oppdragsId} />
              </Suspense>
              <Suspense
                fallback={
                  <Button
                    data-umami-event={OPPDRAG.STATUS_HISTORIKK}
                    size="small"
                    loading
                    variant="secondary-neutral"
                  >
                    Status historikk
                  </Button>
                }
              >
                <StatushistorikkModal oppdragsId={oppdrag!.oppdragsId} />
              </Suspense>
              <Suspense
                fallback={
                  <Button
                    data-umami-event={OPPDRAG.ENHETSHISTORIKK}
                    size="small"
                    loading
                    variant="secondary-neutral"
                  >
                    Enhetshistorikk
                  </Button>
                }
              >
                <EnhetshistorikkModal oppdragsId={oppdrag!.oppdragsId} />
              </Suspense>
            </div>
            <div className={commonstyles["button-row--right"]}>
              <Button
                data-umami-event={OPPDRAG.EKSPORT_TIL_EXCEL}
                size={"small"}
                variant={"secondary-neutral"}
                icon={<FileCsvIcon title="Til Excel" fontSize="1.5rem" />}
                iconPosition={"right"}
                onClick={() =>
                  downloadAsCsv(gjelderId, oppdrag!.navnFagomraade, data ?? [])
                }
              >
                Til Excel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {data && (
        <OppdragLinjeTable
          oppdragsId={oppdrag!.oppdragsId}
          oppdragsLinjer={data}
        />
      )}
    </div>
  );
}
