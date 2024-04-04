import RestService from "../services/rest-service";
import { Accordion, Table } from "@navikt/ds-react";
import { firstOf, isEmpty, retrieveId } from "../util/commonUtils";
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
import commonstyles from "../util/common-styles.module.css";
import LinjedetaljAccordion from "../components/oppdragslinjedetaljer/LinjedetaljAccordion";
import ContentLoader from "../components/common/ContentLoader";
import { useParams } from "react-router-dom";
import { BASENAME } from "../util/constants";
import Breadcrumbs from "../components/common/Breadcrumbs";
import styles from "./Oppdragslinjedetaljer.module.css";
import { Oppdrag } from "../models/Oppdrag";
import OmposteringerVisning from "../components/oppdragsdetaljer/OmposteringerVisning";
import StatushistorikkVisning from "../components/oppdragsdetaljer/StatushistorikkVisning";
import EnhetshistorikkVisning from "../components/oppdragsdetaljer/EnhetshistorikkVisning";
import LabelText from "../components/common/LabelText";

type OppdragslinjedetaljerParams = {
  oppdragsID: string;
  linjeID: string;
};
const OppdragslinjedetaljerPage = () => {
  const { oppdragsID = "", linjeID = "" } = useParams<OppdragslinjedetaljerParams>();
  const gjelderId = retrieveId();
  const { oppdrag: oppdragsdetaljer } = RestService.useFetchOppdrag(gjelderId, oppdragsID);
  const [linjedetaljer, isLoading] = RestService.useFetchOppdragslinje(oppdragsID, linjeID ?? "");
  const linjedetalj = isArray(linjedetaljer) && !isEmpty(linjedetaljer) ? linjedetaljer[0] : undefined;
  const { treffliste } = RestService.useFetchTreffliste(gjelderId);

  if (!gjelderId) window.location.replace(BASENAME);

  const oppdrag: Oppdrag | null =
    isArray(treffliste) &&
    !isEmpty(treffliste) &&
    !isEmpty(firstOf(treffliste).oppdragsListe) &&
    firstOf(treffliste).oppdragsListe.some((a) => a.oppdragsId === +oppdragsID)
      ? treffliste
          .reduce((a) => a)
          .oppdragsListe.filter((o) => o.oppdragsId === +oppdragsID)
          .reduce((a) => a)
      : null;

  return (
    <div className={styles.oppdragslinjedetaljer}>
      <Breadcrumbs soklink trefflistelink oppdraglink={oppdragsID} />
      {isLoading ? (
        <ContentLoader />
      ) : (
        <>
          {!isLoading && oppdragsdetaljer && (
            <div className={styles.oppdragsdetaljer}>
              <div className={styles.oppdragslinjedetaljer__toppinfo}>
                <h1>Oppdragslinjedetaljer</h1>
                {gjelderId && treffliste && (
                  <LabelText
                    label={"Gjelder ID"}
                    text={`${gjelderId.substring(0, 6)} ${gjelderId.substring(6)}, ${firstOf(treffliste)?.gjelderNavn ?? "N.N."} `}
                  />
                )}
                {oppdrag && <LabelText label={"Fagsystem ID"} text={oppdrag.fagsystemId} />}
                <div className={commonstyles.knapperad__right}>
                  {gjelderId && (
                    <OmposteringerVisning
                      enabled={oppdragsdetaljer.harOmposteringer}
                      gjelderId={gjelderId}
                      id={oppdragsID}
                    />
                  )}
                  <StatushistorikkVisning id={oppdragsID} />
                  <EnhetshistorikkVisning id={oppdragsID} />
                </div>
              </div>
            </div>
          )}

          <div className={commonstyles.sortabletable}>
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
                {(oppdragsdetaljer?.oppdragsLinjer ?? [])
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
          </div>
        </>
      )}
    </div>
  );
};
export default OppdragslinjedetaljerPage;
