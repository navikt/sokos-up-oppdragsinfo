import RestService from "../services/rest-service";
import { Table } from "@navikt/ds-react";
import { isEmpty } from "../util/commonUtils";
import { isArray } from "@grafana/faro-web-sdk";
import { Oppdragslinjedetalj } from "../models/Oppdragslinjedetaljer";
import AttestantVisning from "../components/AttestantVisning";
import KravhaverVisning from "../components/KravhaverVisning";
import OvrigVisning from "../components/OvrigVisning";
import StatuserVisning from "../components/StatuserVisning";

const OppdragslinjedetaljerPage = ({ oppdragsid, linjeid }: { oppdragsid: string; linjeid: string }) => {
  const [linjedetaljer, linjedetaljerIsLoading] = RestService.useFetchOppdragslinje(oppdragsid, linjeid, true);

  return (
    <>
      <AttestantVisning oppdragsid={oppdragsid} linjeid={linjeid} />
      <KravhaverVisning oppdragsid={oppdragsid} linjeid={linjeid} />
      <OvrigVisning oppdragsid={oppdragsid} linjeid={linjeid} />
      <StatuserVisning oppdragsid={oppdragsid} linjeid={linjeid} />
      {isArray(linjedetaljer) && !isEmpty(linjedetaljer) && !linjedetaljerIsLoading && (
        <div>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"korrigerteLinjeIder"} scope="col">
                  korrigerteLinjeIder
                </Table.HeaderCell>
                <Table.HeaderCell key={"harEnheter"} scope="col">
                  harEnheter
                </Table.HeaderCell>
                <Table.HeaderCell key={"harGrader"} scope="col">
                  harGrader
                </Table.HeaderCell>
                <Table.HeaderCell key={"harKidliste"} scope="col">
                  harKidliste
                </Table.HeaderCell>
                <Table.HeaderCell key={"harTekster"} scope="col">
                  harTekster
                </Table.HeaderCell>
                <Table.HeaderCell key={"harKravhavere"} scope="col">
                  harKravhavere
                </Table.HeaderCell>
                <Table.HeaderCell key={"harSkyldnere"} scope="col">
                  harSkyldnere
                </Table.HeaderCell>
                <Table.HeaderCell key={"harValutaer"} scope="col">
                  harValutaer
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {linjedetaljer &&
                isArray(linjedetaljer) &&
                !isEmpty(linjedetaljer) &&
                linjedetaljer?.map((detalj: Oppdragslinjedetalj) => (
                  <Table.Row key={btoa("" + detalj.korrigerteLinjeIder.reduce((s, t) => s + "," + t, ""))}>
                    <Table.DataCell>{"" + detalj.korrigerteLinjeIder.reduce((s, t) => s + "," + t)}</Table.DataCell>
                    <Table.DataCell>{detalj.harEnheter ? "✅" : "❌"}</Table.DataCell>
                    <Table.DataCell>{detalj.harGrader ? "✅" : "❌"}</Table.DataCell>
                    <Table.DataCell>{detalj.harKidliste ? "✅" : "❌"}</Table.DataCell>
                    <Table.DataCell>{detalj.harTekster ? "✅" : "❌"}</Table.DataCell>
                    <Table.DataCell>{detalj.harKravhavere ? "✅" : "❌"}</Table.DataCell>
                    <Table.DataCell>{detalj.harSkyldnere ? "✅" : "❌"}</Table.DataCell>
                    <Table.DataCell>{detalj.harValutaer ? "✅" : "❌"}</Table.DataCell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  );
};

export default OppdragslinjedetaljerPage;
