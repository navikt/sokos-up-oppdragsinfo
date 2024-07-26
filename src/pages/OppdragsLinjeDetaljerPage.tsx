import { useLocation } from "react-router-dom";
import { Accordion, Heading, Table } from "@navikt/ds-react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import LabelText from "../components/common/LabelText";
import GraderTable from "../components/oppdragslinjedetaljer/GraderTable";
import KidlisteTable from "../components/oppdragslinjedetaljer/KidlisteTable";
import KravhaverTable from "../components/oppdragslinjedetaljer/KravhaverTable";
import LinjedetaljAccordion from "../components/oppdragslinjedetaljer/LinjedetaljAccordion";
import LinjeenheterTable from "../components/oppdragslinjedetaljer/LinjeenheterTable";
import MaksdatoerTable from "../components/oppdragslinjedetaljer/MaksdatoerTable";
import OvrigTable from "../components/oppdragslinjedetaljer/OvrigTable";
import SkyldnersListTable from "../components/oppdragslinjedetaljer/SkyldnerslistTable";
import TeksterTable from "../components/oppdragslinjedetaljer/TeksterTable";
import ValutaerTable from "../components/oppdragslinjedetaljer/ValutaerTable";
import RestService from "../services/rest-service";
import commonstyles from "../util/common-styles.module.css";
import { retrieveId, retrieveNavn } from "../util/commonUtils";
import { BASENAME } from "../util/constants";
import styles from "./OppdragsLinjeDetaljerPage.module.css";

const OppdragsLinjeDetaljerPage = () => {
  const location = useLocation();
  const oppdragsId = location.state.oppdragsId;
  const linjeId = location.state.linjeId;
  const gjelderId = retrieveId();

  const [linjedetalj] = RestService.useFetchOppdragslinjeDetaljer(
    oppdragsId,
    linjeId,
  );

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
                  text={`${gjelderId}, ${retrieveNavn()} `}
                />
              )}
            </div>
          </div>
        </div>

        <div className={commonstyles.sortabletable}>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  key={"Linje-ID"}
                  scope="col"
                  children={"Linje-ID"}
                />
                <Table.HeaderCell
                  key={"DelytelseId"}
                  scope="col"
                  children={"DelytelseId"}
                />
                <Table.HeaderCell key={"Sats"} scope="col" children={"Sats"} />
                <Table.HeaderCell
                  key={"Dato Vedtak FOM"}
                  scope="col"
                  children={"Dato Vedtak FOM"}
                />
                <Table.HeaderCell
                  key={"Dato Vedtak TOM"}
                  scope="col"
                  children={"Dato Vedtak TOM"}
                />
                <Table.HeaderCell
                  key={"Utbetales til"}
                  scope="col"
                  children={"Utbetales til"}
                />
                <Table.HeaderCell
                  key={"refunderesOrgnr"}
                  scope="col"
                  children={"refunderesOrgnr"}
                />
                <Table.HeaderCell
                  key={"tidspktReg"}
                  scope="col"
                  children={"tidspktReg"}
                />
                <Table.HeaderCell
                  key={"brukerId"}
                  scope="col"
                  children={"brukerId"}
                />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {linjedetalj?.korrigerteLinjeIder.map((linje) => (
                <Table.Row key={btoa("" + linje.linjeId)}>
                  <Table.DataCell>{linje.linjeId}</Table.DataCell>
                  <Table.DataCell>{linje.delytelseId}</Table.DataCell>
                  <Table.DataCell>{linje.sats}</Table.DataCell>
                  <Table.DataCell>{linje.datoVedtakFom}</Table.DataCell>
                  <Table.DataCell>{linje.datoVedtakTom}</Table.DataCell>
                  <Table.DataCell>{linje.utbetalesTilId}</Table.DataCell>
                  <Table.DataCell>{linje.refunderesOrgnr}</Table.DataCell>
                  <Table.DataCell>{linje.tidspktReg}</Table.DataCell>
                  <Table.DataCell>{linje.brukerId}</Table.DataCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Accordion>
            <LinjedetaljAccordion
              title={"Enheter"}
              enabled={!!linjedetalj?.harEnheter}
            >
              <LinjeenheterTable oppdragsid={oppdragsId} linjeid={linjeId} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Grader"}
              enabled={!!linjedetalj?.harGrader}
            >
              <GraderTable oppdragsid={oppdragsId} linjeid={linjeId} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Kravhavere"}
              enabled={!!linjedetalj?.harKravhavere}
            >
              <KravhaverTable oppdragsid={oppdragsId} linjeid={linjeId} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Valutaer"}
              enabled={!!linjedetalj?.harValutaer}
            >
              <ValutaerTable oppdragsid={oppdragsId} linjeid={linjeId} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Tekster"}
              enabled={!!linjedetalj?.harTekster}
            >
              <TeksterTable oppdragsid={oppdragsId} linjeid={linjeId} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Kidliste"}
              enabled={!!linjedetalj?.harKidliste}
            >
              <KidlisteTable oppdragsid={oppdragsId} linjeid={linjeId} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Skyldnere"}
              enabled={!!linjedetalj?.harSkyldnere}
            >
              <SkyldnersListTable oppdragsid={oppdragsId} linjeid={linjeId} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Maksdato"}
              enabled={!!linjedetalj?.harMaksdatoer}
            >
              <MaksdatoerTable oppdragsid={oppdragsId} linjeid={linjeId} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Øvrig"} enabled>
              <OvrigTable oppdragsid={oppdragsId} linjeid={linjeId} />
            </LinjedetaljAccordion>
          </Accordion>
        </div>
      </div>
    </>
  );
};
export default OppdragsLinjeDetaljerPage;
