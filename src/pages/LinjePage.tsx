import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, Heading } from "@navikt/ds-react";
import apiService from "../api/apiService";
import Breadcrumbs from "../components/Breadcrumbs";
import OppdragEgenskapPanel from "../components/OppdragEgenskapPanel";
import { useStore } from "../store/AppState";
import commonstyles from "../styles/common-styles.module.css";
import { ROOT } from "../util/constant";
import EnheterTable from "./linje/EnheterTable";
import GraderTable from "./linje/GraderTable";
import KidTable from "./linje/KidTable";
import KorrigerteLinjerTable from "./linje/KorrigerteLinjerTable";
import KravhaverTable from "./linje/KravhaverTable";
import LinjeDetaljerAccordion from "./linje/LinjeDetaljerAccordion";
import MaksdatoerTable from "./linje/MaksdatoerTable";
import OvrigTable from "./linje/OvrigTable";
import SkyldnereTable from "./linje/SkyldnereTable";
import TeksterTable from "./linje/TeksterTable";
import ValutaerTable from "./linje/ValutaerTable";

export default function LinjePage() {
  const navigate = useNavigate();

  const { gjelderId, oppdrag, linjeId } = useStore.getState();
  const oppdragsId = oppdrag?.oppdragsId || "";
  const oppdragsLinjeDetaljer = apiService.useFetchOppdragslinjeDetaljer(
    oppdragsId,
    linjeId,
  ).data;

  useEffect(() => {
    if (!gjelderId || !oppdrag) {
      navigate(ROOT, { replace: true });
    }
  }, [gjelderId, oppdrag, navigate]);

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large">
          Oppdragsinfo: Linje
        </Heading>
      </div>
      <div className={commonstyles.container}>
        <div className={commonstyles.header}>
          <Breadcrumbs searchLink trefflistelink oppdraglink linje />
          <div className={commonstyles.headerInfo}>
            {gjelderId && oppdrag && <OppdragEgenskapPanel oppdrag={oppdrag} />}
          </div>
        </div>

        {oppdragsLinjeDetaljer && (
          <KorrigerteLinjerTable
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
