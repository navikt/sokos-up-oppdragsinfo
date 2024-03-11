import RestService from "../services/rest-service";
import { Accordion, Button, Table } from "@navikt/ds-react";
import { isEmpty } from "../util/commonUtils";
import { isArray } from "@grafana/faro-web-sdk";
import KravhaverVisning from "../components/KravhaverVisning";
import OvrigVisning from "../components/OvrigVisning";
import KidlisteVisning from "../components/KidlisteVisning";
import ValutaerVisning from "../components/ValutaerVisning";
import TeksterVisning from "../components/TeksterVisning";
import SkyldnersListVisning from "../components/SkyldnerslistVisning";
import MaksdatoerVisning from "../components/MaksdatoerVisning";
import LinjeenheterVisning from "../components/LinjeenheterVisning";
import GraderVisning from "../components/GraderVisning";
import { useEffect, useRef, useState } from "react";
import { Oppdragslinje } from "../models/Oppdragslinje";
import { Oppdrag } from "../models/Oppdrag";
import { ChevronLeftIcon } from "@navikt/aksel-icons";
import commonstyles from "../util/common-styles.module.css";
import LinjedetaljAccordion from "../components/LinjedetaljAccordion";

type OppdragslinjedetaljerPageProps = {
  oppdrag: Oppdrag;
  linjeid: string;
  linjer: Oppdragslinje[];
  handleBackButtonClicked: () => void;
  handleBackToDetaljer: () => void;
};

const OppdragslinjedetaljerPage = ({
  oppdrag,
  linjeid,
  linjer,
  handleBackButtonClicked,
  handleBackToDetaljer,
}: OppdragslinjedetaljerPageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [deferredLinjeId, setDeferredLinjeId] = useState<string>();

  const oppdragsid = "" + oppdrag.oppdragsId;

  const [linjedetaljer, linjedetaljerIsLoading] = RestService.useFetchOppdragslinje(
    oppdragsid,
    deferredLinjeId ?? "",
    !!deferredLinjeId,
  );

  useEffect(() => {
    setDeferredLinjeId(linjeid);
  }, [linjeid]);

  useEffect(() => {
    ref && window.scrollTo(0, ref?.current?.offsetTop ?? 0);
  }, [linjedetaljer]);

  const linjedetalj =
    isArray(linjedetaljer) && !isEmpty(linjedetaljer) && !linjedetaljerIsLoading ? linjedetaljer[0] : undefined;

  return (
    <>
      <div className={commonstyles.knapperad__right}>
        <Button icon={<ChevronLeftIcon />} onClick={handleBackButtonClicked} children={"Treffliste"} />
        <Button icon={<ChevronLeftIcon />} onClick={handleBackToDetaljer} children={"Oppdragsdetaljer"} />
      </div>
      {isArray(linjedetaljer) && !isEmpty(linjedetaljer) && !linjedetaljerIsLoading && (
        <div ref={ref}>
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
              {linjer
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
              <LinjeenheterVisning oppdragsid={oppdragsid} linjeid={linjeid} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Grader"} enabled={!!linjedetalj?.harGrader}>
              <GraderVisning oppdragsid={oppdragsid} linjeid={linjeid} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Kravhavere"} enabled={!!linjedetalj?.harKravhavere}>
              <KravhaverVisning oppdragsid={oppdragsid} linjeid={linjeid} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Valutaer"} enabled={!!linjedetalj?.harValutaer}>
              <ValutaerVisning oppdragsid={oppdragsid} linjeid={linjeid} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Tekster"} enabled={!!linjedetalj?.harTekster}>
              <TeksterVisning oppdragsid={oppdragsid} linjeid={linjeid} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Kidliste"} enabled={!!linjedetalj?.harKidliste}>
              <KidlisteVisning oppdragsid={oppdragsid} linjeid={linjeid} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Skyldnere"} enabled={!!linjedetalj?.harSkyldnere}>
              <SkyldnersListVisning oppdragsid={oppdragsid} linjeid={linjeid} />
            </LinjedetaljAccordion>
            <LinjedetaljAccordion title={"Maksdato"} enabled={!!linjedetalj?.harMaksdatoer}>
              <MaksdatoerVisning oppdragsid={oppdragsid} linjeid={linjeid} />
            </LinjedetaljAccordion>

            <LinjedetaljAccordion title={"Øvrig"} enabled>
              <OvrigVisning oppdragsid={oppdragsid} linjeid={linjeid} />
            </LinjedetaljAccordion>
          </Accordion>
        </div>
      )}
    </>
  );
};
export default OppdragslinjedetaljerPage;
