import RestService from "../services/rest-service";
import { Table } from "@navikt/ds-react";
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
import commonStyles from "../util/common-styles.module.css";
import { useEffect, useState } from "react";
import { Oppdragslinje } from "../models/Oppdragslinje";

const OppdragslinjedetaljerPage = ({
  oppdragsid,
  linjeid,
  linjer,
}: {
  oppdragsid: string;
  linjeid: string;
  linjer: Oppdragslinje[];
}) => {
  const [deferredLinjeId, setDeferredLinjeId] = useState<string>();
  const [linjedetaljer, linjedetaljerIsLoading] = RestService.useFetchOppdragslinje(
    oppdragsid,
    deferredLinjeId ?? "",
    !!deferredLinjeId,
  );

  useEffect(() => {
    setDeferredLinjeId(linjeid);
  }, [linjeid]);

  const linjedetalj =
    isArray(linjedetaljer) && !isEmpty(linjedetaljer) && !linjedetaljerIsLoading ? linjedetaljer[0] : undefined;

  return (
    <>
      {isArray(linjedetaljer) && !isEmpty(linjedetaljer) && !linjedetaljerIsLoading && (
        <div>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"linjeid"} scope="col">
                  Linje-ID
                </Table.HeaderCell>
                <Table.HeaderCell key={"kodeklasse"} scope="col">
                  Kodeklasse
                </Table.HeaderCell>
                <Table.HeaderCell key={"datovedtakfom"} scope="col">
                  Dato Vedtak FOM
                </Table.HeaderCell>
                <Table.HeaderCell key={"datovedtaktom"} scope="col">
                  Dato Vedtak TOM
                </Table.HeaderCell>
                <Table.HeaderCell key={"sats"} scope="col">
                  Sats
                </Table.HeaderCell>
                <Table.HeaderCell key={"typesats"} scope="col">
                  Type sats
                </Table.HeaderCell>
                <Table.HeaderCell key={"DatoFOM"} scope="col">
                  Dato Fom
                </Table.HeaderCell>
                <Table.HeaderCell key={"linjeIdKorr"} scope="col">
                  LinjeIdKorr
                </Table.HeaderCell>
                <Table.HeaderCell key={"DelytelseId"} scope="col">
                  DelytelseId
                </Table.HeaderCell>
                <Table.HeaderCell key={"UtbetalesTilId"} scope="col">
                  Utbetales til
                </Table.HeaderCell>
                <Table.HeaderCell key={"refunderesOrgnr"} scope="col">
                  refunderesOrgnr
                </Table.HeaderCell>
                <Table.HeaderCell key={"brukerId"} scope="col">
                  brukerId
                </Table.HeaderCell>
                <Table.HeaderCell key={"tidspktReg"} scope="col">
                  tidspktReg
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {linjer
                .filter((linje) => linjedetalj?.korrigerteLinjeIder.includes(linje.linjeId))
                .map((linje) => (
                  <Table.Row key={btoa("" + linje.linjeId)}>
                    <Table.DataCell>{linje.linjeId}</Table.DataCell>
                    <Table.DataCell>{linje.kodeKlasse}</Table.DataCell>
                    <Table.DataCell>{linje.datoVedtakFom}</Table.DataCell>
                    <Table.DataCell>{linje.datoVedtakTom}</Table.DataCell>
                    <Table.DataCell>{linje.sats}</Table.DataCell>
                    <Table.DataCell>{linje.typeSats}</Table.DataCell>
                    <Table.DataCell>{linje.datoFom}</Table.DataCell>
                    <Table.DataCell>{linje.linjeIdKorr}</Table.DataCell>
                    <Table.DataCell>{linje.delytelseId}</Table.DataCell>
                    <Table.DataCell>{linje.utbetalesTilId}</Table.DataCell>
                    <Table.DataCell>{linje.refunderesOrgnr}</Table.DataCell>
                    <Table.DataCell>{linje.brukerId}</Table.DataCell>
                    <Table.DataCell>{linje.tidspktReg}</Table.DataCell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
          <div className={commonStyles.knapperad}>
            <KravhaverVisning enabled={!!linjedetalj?.harKravhavere} oppdragsid={oppdragsid} linjeid={linjeid} />
            <OvrigVisning oppdragsid={oppdragsid} linjeid={linjeid} />
            <ValutaerVisning enabled={!!linjedetalj?.harValutaer} oppdragsid={oppdragsid} linjeid={linjeid} />
            <TeksterVisning enabled={!!linjedetalj?.harTekster} oppdragsid={oppdragsid} linjeid={linjeid} />
            <KidlisteVisning enabled={!!linjedetalj?.harKidliste} oppdragsid={oppdragsid} linjeid={linjeid} />
            <SkyldnersListVisning enabled={!!linjedetalj?.harSkyldnere} oppdragsid={oppdragsid} linjeid={linjeid} />
            <MaksdatoerVisning enabled={!!linjedetalj?.harMaksdatoer} oppdragsid={oppdragsid} linjeid={linjeid} />
            <LinjeenheterVisning enabled={!!linjedetalj?.harEnheter} oppdragsid={oppdragsid} linjeid={linjeid} />
            <GraderVisning enabled={!!linjedetalj?.harGrader} oppdragsid={oppdragsid} linjeid={linjeid} />
          </div>
        </div>
      )}
    </>
  );
};

export default OppdragslinjedetaljerPage;
