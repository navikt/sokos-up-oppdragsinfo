import { isArray } from "@grafana/faro-web-sdk";
import { useParams } from "react-router-dom";
import { Accordion, Table } from "@navikt/ds-react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import LabelText from "../components/common/LabelText";
import EnhetshistorikkModal from "../components/oppdragsdetaljer/EnhetshistorikkModal";
import OmposteringModal from "../components/oppdragsdetaljer/OmposteringModal";
import StatushistorikkVisning from "../components/oppdragsdetaljer/StatushistorikkVisning";
import GraderVisning from "../components/oppdragslinjedetaljer/GraderVisning";
import KidlisteVisning from "../components/oppdragslinjedetaljer/KidlisteVisning";
import KravhaverVisning from "../components/oppdragslinjedetaljer/KravhaverVisning";
import LinjedetaljAccordion from "../components/oppdragslinjedetaljer/LinjedetaljAccordion";
import LinjeenheterVisning from "../components/oppdragslinjedetaljer/LinjeenheterVisning";
import MaksdatoerVisning from "../components/oppdragslinjedetaljer/MaksdatoerVisning";
import OvrigVisning from "../components/oppdragslinjedetaljer/OvrigVisning";
import SkyldnersListVisning from "../components/oppdragslinjedetaljer/SkyldnerslistVisning";
import TeksterVisning from "../components/oppdragslinjedetaljer/TeksterVisning";
import ValutaerVisning from "../components/oppdragslinjedetaljer/ValutaerVisning";
import { Oppdrag } from "../models/Oppdrag";
import { getOppdragFromTreffliste } from "../models/Treffliste";
import RestService from "../services/rest-service";
import commonstyles from "../util/common-styles.module.css";
import { firstOf, isEmpty, retrieveId } from "../util/commonUtils";
import { BASENAME } from "../util/constants";
import styles from "./Oppdragslinjedetaljer.module.css";

type OppdragslinjedetaljerParams = {
  oppdragsID: string;
  linjeID: string;
};
const OppdragslinjedetaljerPage = () => {
  const { oppdragsID = "", linjeID = "" } =
    useParams<OppdragslinjedetaljerParams>();
  const gjelderId = retrieveId();
  const { oppdrag: oppdragsdetaljer } = RestService.useFetchOppdrag(
    gjelderId,
    oppdragsID,
  );
  const [linjedetaljer] = RestService.useFetchOppdragslinje(
    oppdragsID,
    linjeID ?? "",
  );
  const linjedetalj =
    isArray(linjedetaljer) && !isEmpty(linjedetaljer)
      ? linjedetaljer[0]
      : undefined;
  const { treffliste } = RestService.useFetchTreffliste(gjelderId);

  if (!gjelderId) window.location.replace(BASENAME);

  const oppdrag: Oppdrag | null = getOppdragFromTreffliste(
    treffliste,
    +oppdragsID,
  );

  return (
    <div className={styles.oppdragslinjedetaljer}>
      <h1>Oppdragsinfo</h1>
      <>
        {oppdragsdetaljer && (
          <div className={styles.oppdragsdetaljer}>
            <div className={styles.oppdragslinjedetaljer__top}>
              <Breadcrumbs
                searchLink
                trefflistelink
                oppdraglink={oppdragsID}
                oppdragsdetaljer
              />
              <div className={styles.oppdragslinjedetaljer__toppinfo}>
                <h2>Oppdragslinjedetaljer</h2>
                {gjelderId && treffliste && (
                  <LabelText
                    label={"Gjelder ID"}
                    text={`${gjelderId.substring(0, 6)} ${gjelderId.substring(6)}, ${firstOf(treffliste)?.gjelderNavn ?? "N.N."} `}
                  />
                )}
                {oppdrag && (
                  <LabelText
                    label={"Fagsystem ID"}
                    text={oppdrag.fagsystemId}
                  />
                )}
                <div className={commonstyles.knapperad__right}>
                  {gjelderId && (
                    <OmposteringModal
                      enabled={oppdragsdetaljer.harOmposteringer}
                      gjelderId={gjelderId}
                      id={oppdragsID}
                    />
                  )}
                  <StatushistorikkVisning id={oppdragsID} />
                  <EnhetshistorikkModal id={oppdragsID} />
                </div>
              </div>
            </div>
          </div>
        )}

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
              {(oppdragsdetaljer?.oppdragsLinjer ?? [])
                .filter((linje) =>
                  linjedetalj?.korrigerteLinjeIder.includes(linje.linjeId),
                )
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
            <LinjedetaljAccordion
              title={"Enheter"}
              enabled={!!linjedetalj?.harEnheter}
            >
              <LinjeenheterVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Grader"}
              enabled={!!linjedetalj?.harGrader}
            >
              <GraderVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Kravhavere"}
              enabled={!!linjedetalj?.harKravhavere}
            >
              <KravhaverVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Valutaer"}
              enabled={!!linjedetalj?.harValutaer}
            >
              <ValutaerVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Tekster"}
              enabled={!!linjedetalj?.harTekster}
            >
              <TeksterVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Kidliste"}
              enabled={!!linjedetalj?.harKidliste}
            >
              <KidlisteVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Skyldnere"}
              enabled={!!linjedetalj?.harSkyldnere}
            >
              <SkyldnersListVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion
              title={"Maksdato"}
              enabled={!!linjedetalj?.harMaksdatoer}
            >
              <MaksdatoerVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Øvrig"} enabled>
              <OvrigVisning oppdragsid={oppdragsID} linjeid={linjeID} />
            </LinjedetaljAccordion>
          </Accordion>
        </div>
      </>
    </div>
  );
};
export default OppdragslinjedetaljerPage;
