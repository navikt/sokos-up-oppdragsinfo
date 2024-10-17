import { Table } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import { Maksdato } from "../../types/Maksdato";
import { OppdragsIdent } from "../../types/OppdragsIdent";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

export default function MaksdatoerTable(props: OppdragsIdent) {
  const { data } = apiService.useFetchMaksdato(props.oppdragsId, props.linjeId);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje-ID</Table.HeaderCell>
          <Table.HeaderCell scope="col">Maksdato</Table.HeaderCell>
          <Table.HeaderCell scope="col">Dato FOM</Table.HeaderCell>
          <Table.HeaderCell scope="col">Tidspunkt registrert</Table.HeaderCell>
          <Table.HeaderCell scope="col">Bruker ID</Table.HeaderCell>
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
              <Table.DataCell>
                {formatDateTime(maksdato.tidspktReg)}
              </Table.DataCell>
              <Table.DataCell>{maksdato.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}
