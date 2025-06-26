import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Accordion, Heading } from "@navikt/ds-react";
import { useFetchOppdragslinjeDetaljer } from "../../api/apiService";
import Breadcrumbs from "../../components/Breadcrumbs";
import OppdragEgenskapPanel from "../../components/OppdragEgenskapPanel";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/bem-common.module.css";
import { ROOT } from "../../util/routenames";
import EnheterTable from "./EnheterTable";
import GraderTable from "./GraderTable";
import KidTable from "./KidTable";
import KorrigerteLinjerTable from "./KorrigerteLinjerTable";
import KravhaverTable from "./KravhaverTable";
import LinjeDetaljerAccordion from "./LinjeDetaljerAccordion";
import MaksdatoerTable from "./MaksdatoerTable";
import OvrigTable from "./OvrigTable";
import SkyldnereTable from "./SkyldnereTable";
import TeksterTable from "./TeksterTable";
import ValutaerTable from "./ValutaerTable";

export default function Linje() {
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
    <div className={commonstyles["container"]}>
      <div className={commonstyles["container__header"]}>
        <Heading level="1" size="large" align="center">
          Oppdragsinfo: Linje
        </Heading>
        <Breadcrumbs searchLink trefflistelink oppdraglink linje />
        <div className={commonstyles["container__header-info"]}>
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
          <LinjeDetaljerAccordion title={"Valutaer"} enabled={data.harValutaer}>
            <ValutaerTable oppdragsId={oppdragsId} linjeId={linjeId} />
          </LinjeDetaljerAccordion>
          <LinjeDetaljerAccordion title={"Tekster"} enabled={data.harTekster}>
            <TeksterTable oppdragsId={oppdragsId} linjeId={linjeId} />
          </LinjeDetaljerAccordion>
          <LinjeDetaljerAccordion title={"Kid"} enabled={data.harKidliste}>
            <KidTable oppdragsId={oppdragsId} linjeId={linjeId} />
          </LinjeDetaljerAccordion>
          <LinjeDetaljerAccordion title="Skyldnere" enabled={data.harSkyldnere}>
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
  );
}
