import { Table } from "@navikt/ds-react";
import { Maksdato } from "../../types/Maksdato";
import RestService from "../../api/rest-service";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

const MaksdatoerTable = (
  { oppdragsId, linjeId }: { oppdragsId: string; linjeId: string; }
) => {
  const { data } = RestService.useFetchMaksdato(oppdragsId, linjeId);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje Id</Table.HeaderCell>
          <Table.HeaderCell scope="col">Maks dato</Table.HeaderCell>
          <Table.HeaderCell scope="col">Dato fom</Table.HeaderCell>
          <Table.HeaderCell scope="col">Tidspunkt registrert</Table.HeaderCell>
          <Table.HeaderCell scope="col">Bruker Id</Table.HeaderCell>
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
              <Table.DataCell>{formatDateTime(maksdato.tidspktReg)}</Table.DataCell>
              <Table.DataCell>{maksdato.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default MaksdatoerTable;
