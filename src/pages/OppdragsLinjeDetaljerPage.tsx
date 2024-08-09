import { useLocation } from "react-router-dom";
import { Accordion, Heading } from "@navikt/ds-react";
import apiService from "../api/apiService";
import Breadcrumbs from "../components/common/Breadcrumbs";
import OppdragsEgenskapPanel from "../components/common/OppdragsEgenskapPanel";
import EnheterTable from "../components/oppdragslinjedetaljer/EnheterTable";
import GraderTable from "../components/oppdragslinjedetaljer/GraderTable";
import KidTable from "../components/oppdragslinjedetaljer/KidTable";
import KravhaverTable from "../components/oppdragslinjedetaljer/KravhaverTable";
import LinjeDetaljerAccordion from "../components/oppdragslinjedetaljer/LinjeDetaljerAccordion";
import MaksdatoerTable from "../components/oppdragslinjedetaljer/MaksdatoerTable";
import OppdragsLinjeDetaljerTable from "../components/oppdragslinjedetaljer/OppdragLinjeDetaljerTable";
import OvrigTable from "../components/oppdragslinjedetaljer/OvrigTable";
import SkyldnereTable from "../components/oppdragslinjedetaljer/SkyldnereTable";
import TeksterTable from "../components/oppdragslinjedetaljer/TeksterTable";
import ValutaerTable from "../components/oppdragslinjedetaljer/ValutaerTable";
import { useAppState } from "../store/AppState";
import commonstyles from "../styles/common-styles.module.css";
import { BASENAME } from "../util/constant";
import styles from "./OppdragsLinjeDetaljerPage.module.css";

const OppdragsLinjeDetaljerPage = () => {
  const location = useLocation();
  const oppdragsId = location.state.oppdragsId;
  const linjeId = location.state.linjeId;
  const { gjelderId, oppdrag } = useAppState.getState();
  const oppdragsLinjeDetajer = apiService.useFetchOppdragslinjeDetaljer(
    oppdragsId,
    linjeId,
  ).data;

  if (!gjelderId) window.location.replace(BASENAME);

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large">
          Oppdragsinfo
        </Heading>
      </div>
      <div className={styles.oppdragslinjedetaljer}>
        <div className={styles.oppdragslinjedetaljer__top}>
          <Breadcrumbs
            searchLink
            trefflistelink
            oppdraglink={oppdragsId}
            oppdragsdetaljer
          />
          <div className={styles.oppdragslinjedetaljer__toppinfo}>
            {gjelderId && oppdrag && (
              <OppdragsEgenskapPanel oppdrag={oppdrag} />
            )}
          </div>
        </div>
        <OppdragsLinjeDetaljerTable
          oppdragsLinjeDetajer={oppdragsLinjeDetajer!}
        />

        <Accordion>
          <LinjeDetaljerAccordion
            title={"Enheter"}
            enabled={!!oppdragsLinjeDetajer?.harEnheter}
          >
            <EnheterTable oppdragsId={oppdragsId} linjeId={linjeId} />
          </LinjeDetaljerAccordion>
          <LinjeDetaljerAccordion
            title={"Grader"}
            enabled={!!oppdragsLinjeDetajer?.harGrader}
          >
            <GraderTable oppdragsId={oppdragsId} linjeId={linjeId} />
          </LinjeDetaljerAccordion>
          <LinjeDetaljerAccordion
            title={"Kravhavere"}
            enabled={!!oppdragsLinjeDetajer?.harKravhavere}
          >
            <KravhaverTable oppdragsId={oppdragsId} linjeId={linjeId} />
          </LinjeDetaljerAccordion>
          <LinjeDetaljerAccordion
            title={"Valutaer"}
            enabled={!!oppdragsLinjeDetajer?.harValutaer}
          >
            <ValutaerTable oppdragsId={oppdragsId} linjeId={linjeId} />
          </LinjeDetaljerAccordion>
          <LinjeDetaljerAccordion
            title={"Tekster"}
            enabled={!!oppdragsLinjeDetajer?.harTekster}
          >
            <TeksterTable oppdragsId={oppdragsId} linjeId={linjeId} />
          </LinjeDetaljerAccordion>
          <LinjeDetaljerAccordion
            title={"Kid"}
            enabled={!!oppdragsLinjeDetajer?.harKidliste}
          >
            <KidTable oppdragsId={oppdragsId} linjeId={linjeId} />
          </LinjeDetaljerAccordion>
          <LinjeDetaljerAccordion
            title="Skyldnere"
            enabled={!!oppdragsLinjeDetajer?.harSkyldnere}
          >
            <SkyldnereTable oppdragsId={oppdragsId} linjeId={linjeId} />
          </LinjeDetaljerAccordion>
          <LinjeDetaljerAccordion
            title={"Maksdato"}
            enabled={!!oppdragsLinjeDetajer?.harMaksdatoer}
          >
            <MaksdatoerTable oppdragsId={oppdragsId} linjeId={linjeId} />
          </LinjeDetaljerAccordion>
          <LinjeDetaljerAccordion title={"Øvrig"} enabled>
            <OvrigTable oppdragsId={oppdragsId} linjeId={linjeId} />
          </LinjeDetaljerAccordion>
        </Accordion>
      </div>
    </>
  );
};
export default OppdragsLinjeDetaljerPage;
