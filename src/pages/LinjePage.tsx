import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Accordion, Heading } from "@navikt/ds-react";
import { useFetchOppdragslinjeDetaljer } from "../api/apiService";
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
  const { data } = useFetchOppdragslinjeDetaljer(oppdragsId, linjeId);

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

        {data && <KorrigerteLinjerTable oppdragsLinjeDetaljer={data} />}

        {data && (
          <Accordion>
            <LinjeDetaljerAccordion title={"Enheter"} enabled={data.harEnheter}>
              <EnheterTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion title={"Grader"} enabled={data.harGrader}>
              <GraderTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion
              title={"Kravhavere"}
              enabled={data.harKravhavere}
            >
              <KravhaverTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion
              title={"Valutaer"}
              enabled={data.harValutaer}
            >
              <ValutaerTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion title={"Tekster"} enabled={data.harTekster}>
              <TeksterTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion title={"Kid"} enabled={data.harKidliste}>
              <KidTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion
              title="Skyldnere"
              enabled={data.harSkyldnere}
            >
              <SkyldnereTable oppdragsId={oppdragsId} linjeId={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion
              title={"Maksdato"}
              enabled={data.harMaksdatoer}
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
