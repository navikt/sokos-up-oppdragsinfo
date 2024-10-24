import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, Heading } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import Breadcrumbs from "../../components/Breadcrumbs";
import OppdragEgenskapPanel from "../../components/OppdragEgenskapPanel";
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
  const navigate = useNavigate();

  const { gjelderId, oppdrag, linjeId } = useStore.getState();
  const oppdragsId = oppdrag?.oppdragsId || "";
  const oppdragsLinjeDetaljer = apiService.useFetchOppdragslinjeDetaljer(
    oppdragsId,
    linjeId,
  ).data;

  useEffect(() => {
    if (!gjelderId || !oppdrag) {
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
      <div className={styles["oppdragslinjedetaljer"]}>
        <div className={styles["oppdragslinjedetaljer-top"]}>
          <Breadcrumbs
            searchLink
            trefflistelink
            oppdraglink={oppdrag?.oppdragsId}
            oppdragsdetaljer
          />
          <div className={styles["oppdragslinjedetaljer-toppinfo"]}>
            {gjelderId && oppdrag && <OppdragEgenskapPanel oppdrag={oppdrag} />}
          </div>
        </div>

        {oppdragsLinjeDetaljer && (
          <OppdragsLinjeDetaljerTable
            oppdragsLinjeDetaljer={oppdragsLinjeDetaljer}
          />
        )}

        {oppdragsLinjeDetaljer && (
          <Accordion>
            <LinjeDetaljerAccordion
              title={"Enheter"}
              enabled={oppdragsLinjeDetaljer.harEnheter}
            >
              <EnheterTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion
              title={"Grader"}
              enabled={oppdragsLinjeDetaljer.harEnheter}
            >
              <GraderTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion
              title={"Kravhavere"}
              enabled={oppdragsLinjeDetaljer.harKravhavere}
            >
              <KravhaverTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion
              title={"Valutaer"}
              enabled={oppdragsLinjeDetaljer.harValutaer}
            >
              <ValutaerTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion
              title={"Tekster"}
              enabled={oppdragsLinjeDetaljer.harTekster}
            >
              <TeksterTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion
              title={"Kid"}
              enabled={oppdragsLinjeDetaljer.harKidliste}
            >
              <KidTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion
              title="Skyldnere"
              enabled={oppdragsLinjeDetaljer.harSkyldnere}
            >
              <SkyldnereTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion
              title={"Maksdato"}
              enabled={oppdragsLinjeDetaljer.harMaksdatoer}
            >
              <MaksdatoerTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion title={"Øvrig"} enabled={true}>
              <OvrigTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
          </Accordion>
        )}
      </div>
    </>
  );
}
