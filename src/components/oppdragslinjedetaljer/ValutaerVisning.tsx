import RestService from "../../services/rest-service";
import { Table } from "@navikt/ds-react";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../../util/commonUtils";
import { Valuta } from "../../models/Valuta";

const ValutaerVisning = ({ oppdragsid, linjeid }: { oppdragsid: string; linjeid: string }) => {
  const [data] = RestService.useFetchValuta(oppdragsid, linjeid);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell key={"linjeId"} scope="col" children={"Linje-ID"} />
          <Table.HeaderCell key={"type"} scope="col" children={"type"} />
          <Table.HeaderCell key={"datoFom"} scope="col" children={"datoFom"} />
          <Table.HeaderCell key={"nokkelId"} scope="col" children={"nokkelId"} />
          <Table.HeaderCell key={"valuta"} scope="col" children={"valuta"} />
          <Table.HeaderCell key={"feilreg"} scope="col" children={"feilreg"} />
          <Table.HeaderCell key={"tidspktReg"} scope="col" children={"tidspktReg"} />
          <Table.HeaderCell key={"brukerid"} scope="col" children={"brukerid"} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          isArray(data) &&
          !isEmpty(data) &&
          data?.map((valuta: Valuta) => (
            <Table.Row key={btoa(valuta.linjeId + valuta.nokkelId)}>
              <Table.DataCell>{valuta.linjeId}</Table.DataCell>
              <Table.DataCell>{valuta.type}</Table.DataCell>
              <Table.DataCell>{valuta.datoFom}</Table.DataCell>
              <Table.DataCell>{valuta.nokkelId}</Table.DataCell>
              <Table.DataCell>{valuta.valuta}</Table.DataCell>
              <Table.DataCell>{valuta.feilreg}</Table.DataCell>
              <Table.DataCell>{valuta.tidspktReg}</Table.DataCell>
              <Table.DataCell>{valuta.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default ValutaerVisning;
