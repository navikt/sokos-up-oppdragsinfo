import { useLocation, useNavigate } from "react-router-dom";
import { Accordion, Heading } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import Breadcrumbs from "../../components/Breadcrumbs";
import OppdragsEgenskapPanel from "../../components/OppdragsEgenskapPanel";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/common-styles.module.css";
import { ROOT } from "../../util/constant";
import EnheterTable from "./EnheterTable";
import GraderTable from "./GraderTable";
import KidTable from "./KidTable";
import KravhaverTable from "./KravhaverTable";
import LinjeDetaljerAccordion from "./LinjeDetaljerAccordion";
import MaksdatoerTable from "./MaksdatoerTable";
import OppdragsLinjeDetaljerTable from "./OppdragLinjeDetaljerTable";
import styles from "./OppdragsLinjeDetaljerPage.module.css";
import OvrigTable from "./OvrigTable";
import SkyldnereTable from "./SkyldnereTable";
import TeksterTable from "./TeksterTable";
import ValutaerTable from "./ValutaerTable";

export default function OppdragsLinjeDetaljerPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const oppdragsId = location.state.oppdragsId;
  const linjeId = location.state.linjeId;
  const { gjelderId, oppdrag } = useStore.getState();
  const oppdragsLinjeDetajer = apiService.useFetchOppdragslinjeDetaljer(
    oppdragsId,
    linjeId,
  ).data;

  if (!gjelderId) {
    navigate(ROOT);
  }

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
}
