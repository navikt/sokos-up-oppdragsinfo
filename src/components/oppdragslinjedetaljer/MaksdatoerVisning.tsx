import RestService from "../../services/rest-service";
import { Table } from "@navikt/ds-react";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../../util/commonUtils";
import { Maksdato } from "../../models/Maksdato";

const MaksdatoerVisning = ({ oppdragsid, linjeid }: { oppdragsid: string; linjeid: string }) => {
  const [data] = RestService.useFetchMaksdato(oppdragsid, linjeid, true);
  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell key={"linjeId"} scope="col" children={"Linje-ID"} />
          <Table.HeaderCell key={"maksdato"} scope="col" children={"maksdato"} />
          <Table.HeaderCell key={"datoFom"} scope="col" children={"datoFom"} />
          <Table.HeaderCell key={"tidspktReg"} scope="col" children={"tidspktReg"} />
          <Table.HeaderCell key={"brukerid"} scope="col" children={"brukerid"} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          isArray(data) &&
          !isEmpty(data) &&
          data?.map((maksdato: Maksdato) => (
            <Table.Row key={btoa(JSON.stringify(maksdato))}>
              <Table.DataCell>{maksdato.linjeId}</Table.DataCell>
              <Table.DataCell>{maksdato.maksdato}</Table.DataCell>
              <Table.DataCell>{maksdato.datoFom}</Table.DataCell>
              <Table.DataCell>{maksdato.tidspktReg}</Table.DataCell>
              <Table.DataCell>{maksdato.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default MaksdatoerVisning;
