import RestService from "../services/rest-service";
import { Accordion, Table } from "@navikt/ds-react";
import { isEmpty, retrieveId } from "../util/commonUtils";
import { isArray } from "@grafana/faro-web-sdk";
import KravhaverVisning from "../components/oppdragslinjedetaljer/KravhaverVisning";
import OvrigVisning from "../components/oppdragslinjedetaljer/OvrigVisning";
import KidlisteVisning from "../components/oppdragslinjedetaljer/KidlisteVisning";
import ValutaerVisning from "../components/oppdragslinjedetaljer/ValutaerVisning";
import TeksterVisning from "../components/oppdragslinjedetaljer/TeksterVisning";
import SkyldnersListVisning from "../components/oppdragslinjedetaljer/SkyldnerslistVisning";
import MaksdatoerVisning from "../components/oppdragslinjedetaljer/MaksdatoerVisning";
import LinjeenheterVisning from "../components/oppdragslinjedetaljer/LinjeenheterVisning";
import GraderVisning from "../components/oppdragslinjedetaljer/GraderVisning";
import { ChevronLeftIcon } from "@navikt/aksel-icons";
import commonstyles from "../util/common-styles.module.css";
import LinjedetaljAccordion from "../components/util/LinjedetaljAccordion";
import ContentLoader from "../components/util/ContentLoader";
import { Link, Navigate, useParams } from "react-router-dom";

type OppdragslinjedetaljerParams = {
  oppdragsID: string;
  linjeID: string;
};
const OppdragslinjedetaljerPage = () => {
  const { oppdragsID = "", linjeID = "" } = useParams<OppdragslinjedetaljerParams>();
  const gjelderId = retrieveId();
  const { oppdrag } = RestService.useFetchOppdrag(gjelderId, oppdragsID);
  const [linjedetaljer] = RestService.useFetchOppdragslinje(oppdragsID, linjeID ?? "", !!linjeID);
  const linjedetalj = isArray(linjedetaljer) && !isEmpty(linjedetaljer) ? linjedetaljer[0] : undefined;

  return (
    <>
      {gjelderId === "" && <Navigate to={"/"} />}
      <div className={commonstyles.knapperad__right}>
        <Link to={"/"}>
          <div className={commonstyles.singlerow}>
            <ChevronLeftIcon /> Treffliste{" "}
          </div>
        </Link>
        <Link to={`/${oppdragsID}`}>
          <div className={commonstyles.singlerow}>
            <ChevronLeftIcon /> Oppdragsdetaljer{" "}
          </div>
        </Link>
      </div>
      {!isArray(linjedetaljer) || isEmpty(linjedetaljer) ? (
        <ContentLoader />
      ) : (
        <>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"Linje-ID"} scope="col" children={"Linje-ID"} />
                <Table.HeaderCell key={"DelytelseId"} scope="col" children={"DelytelseId"} />
                <Table.HeaderCell key={"Sats"} scope="col" children={"Sats"} />
                <Table.HeaderCell key={"Dato Vedtak FOM"} scope="col" children={"Dato Vedtak FOM"} />
                <Table.HeaderCell key={"Dato Vedtak TOM"} scope="col" children={"Dato Vedtak TOM"} />
                <Table.HeaderCell key={"Utbetales til"} scope="col" children={"Utbetales til"} />
                <Table.HeaderCell key={"refunderesOrgnr"} scope="col" children={"refunderesOrgnr"} />
                <Table.HeaderCell key={"tidspktReg"} scope="col" children={"tidspktReg"} />
                <Table.HeaderCell key={"brukerId"} scope="col" children={"brukerId"} />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {(oppdrag?.oppdragsLinjer ?? [])
                .filter((linje) => linjedetalj?.korrigerteLinjeIder.includes(linje.linjeId))
                .map((linje) => (
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
            <LinjedetaljAccordion title={"Enheter"} enabled={!!linjedetalj?.harEnheter}>
              <LinjeenheterVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Grader"} enabled={!!linjedetalj?.harGrader}>
              <GraderVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Kravhavere"} enabled={!!linjedetalj?.harKravhavere}>
              <KravhaverVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Valutaer"} enabled={!!linjedetalj?.harValutaer}>
              <ValutaerVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Tekster"} enabled={!!linjedetalj?.harTekster}>
              <TeksterVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Kidliste"} enabled={!!linjedetalj?.harKidliste}>
              <KidlisteVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Skyldnere"} enabled={!!linjedetalj?.harSkyldnere}>
              <SkyldnersListVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Maksdato"} enabled={!!linjedetalj?.harMaksdatoer}>
              <MaksdatoerVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Øvrig"} enabled>
              <OvrigVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
          </Accordion>
        </>
      )}
    </>
  );
};
export default OppdragslinjedetaljerPage;
