import { useLocation } from "react-router-dom";
import { Accordion, Heading, Table } from "@navikt/ds-react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import LabelText from "../components/common/LabelText";
import GraderTable from "../components/oppdragslinjedetaljer/GraderTable";
import KidTable from "../components/oppdragslinjedetaljer/KidTable";
import KravhaverTable from "../components/oppdragslinjedetaljer/KravhaverTable";
import LinjeDetaljerAccordion from "../components/oppdragslinjedetaljer/LinjeDetaljerAccordion";
import EnheterTable from "../components/oppdragslinjedetaljer/EnheterTable";
import MaksdatoerTable from "../components/oppdragslinjedetaljer/MaksdatoerTable";
import OvrigTable from "../components/oppdragslinjedetaljer/OvrigTable";
import SkyldnereTable from "../components/oppdragslinjedetaljer/SkyldnereTable";
import TeksterTable from "../components/oppdragslinjedetaljer/TeksterTable";
import ValutaerTable from "../components/oppdragslinjedetaljer/ValutaerTable";
import RestService from "../api/rest-service";
import commonstyles from "../styles/common-styles.module.css";
import { BASENAME } from "../util/constant";
import styles from "./OppdragsLinjeDetaljerPage.module.css";
import { useAppState } from "../store/AppState";
import { formatDateTime } from "../util/commonUtil";

const OppdragsLinjeDetaljerPage = () => {
  const location = useLocation();
  const oppdragsId = location.state.oppdragsId;
  const linjeId = location.state.linjeId;
  const { gjelderId, gjelderNavn } = useAppState.getState();

  const oppdragsLinjeDetajer = RestService.useFetchOppdragslinjeDetaljer(oppdragsId, linjeId).data;

  if (!gjelderId) window.location.replace(BASENAME);

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large">
          Oppdragsinfo
        </Heading>
      </div>
      <div className={styles.oppdragslinjedetaljer}>
        <div className={styles.oppdragsdetaljer}>
          <div className={styles.oppdragslinjedetaljer__top}>
            <Breadcrumbs
              searchLink
              trefflistelink
              oppdraglink={oppdragsId}
              oppdragsdetaljer
            />
            <div className={styles.oppdragslinjedetaljer__toppinfo}>
              <h2>Oppdragslinjedetaljer</h2>
              {gjelderId && (
                <LabelText
                  label={"Gjelder ID"}
                  text={`${gjelderId}, ${gjelderNavn} `}
                />
              )}
            </div>
          </div>
        </div>

        <div className={commonstyles.sortabletable}>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell scope="col">Linje Id</Table.HeaderCell>
                <Table.HeaderCell scope="col">Delytelse Id</Table.HeaderCell>
                <Table.HeaderCell scope="col">Sats</Table.HeaderCell>
                <Table.HeaderCell scope="col">Vedtak fom</Table.HeaderCell>
                <Table.HeaderCell scope="col">Vedtak tom</Table.HeaderCell>
                <Table.HeaderCell scope="col">Utbetales til</Table.HeaderCell>
                <Table.HeaderCell scope="col">Refund Id</Table.HeaderCell>
                <Table.HeaderCell scope="col">Tidspunkt registrert</Table.HeaderCell>
                <Table.HeaderCell scope="col">Bruker Id</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {oppdragsLinjeDetajer?.korrigerteLinjeIder.map((linje) => (
                <Table.Row key={btoa("" + linje.linjeId)}>
                  <Table.DataCell>{linje.linjeId}</Table.DataCell>
                  <Table.DataCell>{linje.delytelseId}</Table.DataCell>
                  <Table.DataCell>{linje.sats}</Table.DataCell>
                  <Table.DataCell>{linje.datoVedtakFom}</Table.DataCell>
                  <Table.DataCell>{linje.datoVedtakTom}</Table.DataCell>
                  <Table.DataCell>{linje.utbetalesTilId}</Table.DataCell>
                  <Table.DataCell>{linje.refunderesOrgnr}</Table.DataCell>
                  <Table.DataCell>{formatDateTime(linje.tidspktReg)}</Table.DataCell>
                  <Table.DataCell>{linje.brukerId}</Table.DataCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
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
              <KidTable oppdragsid={oppdragsId} linjeid={linjeId} />
            </LinjeDetaljerAccordion>
            <LinjeDetaljerAccordion
              title={"Skyldnere"}
              enabled={!!oppdragsLinjeDetajer?.harSkyldnere}
            >
              <SkyldnereTable oppdragsid={oppdragsId} linjeid={linjeId} />
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
      </div>
    </>
  );
};
export default OppdragsLinjeDetaljerPage;
