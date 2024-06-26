import { Table } from "@navikt/ds-react";
import { Maksdato } from "../../models/Maksdato";
import RestService from "../../services/rest-service";
import { isEmpty } from "../../util/commonUtils";

const MaksdatoerTable = ({
  oppdragsid,
  linjeid,
}: {
  oppdragsid: string;
  linjeid: string;
}) => {
  const [data] = RestService.useFetchMaksdato(oppdragsid, linjeid);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell key={"linjeId"} scope="col" children={"Linje-ID"} />
          <Table.HeaderCell
            key={"maksdato"}
            scope="col"
            children={"maksdato"}
          />
          <Table.HeaderCell key={"datoFom"} scope="col" children={"datoFom"} />
          <Table.HeaderCell
            key={"tidspktReg"}
            scope="col"
            children={"tidspktReg"}
          />
          <Table.HeaderCell
            key={"brukerid"}
            scope="col"
            children={"brukerid"}
          />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          Array.isArray(data) &&
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

export default MaksdatoerTable;
