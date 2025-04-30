import { Table } from "@navikt/ds-react";
import { useFetchMaksdato } from "../../api/apiService";
import { Maksdato } from "../../types/Maksdato";
import { OppdragsIdent } from "../../types/OppdragsIdent";
import { formatDate, formatDateTime, isEmpty } from "../../util/commonUtil";

export default function MaksdatoerTable(props: OppdragsIdent) {
  const { data } = useFetchMaksdato(props.oppdragsId, props.linjeId);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje</Table.HeaderCell>
          <Table.HeaderCell scope="col">Maksdato</Table.HeaderCell>
          <Table.HeaderCell scope="col">Dato fom</Table.HeaderCell>
          <Table.HeaderCell scope="col">
            Registrert i Oppdragssystemet
          </Table.HeaderCell>
          <Table.HeaderCell scope="col">Brukerid</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          Array.isArray(data) &&
          !isEmpty(data) &&
          data?.map((maksdato: Maksdato) => (
            <Table.Row key={btoa(JSON.stringify(maksdato))}>
              <Table.DataCell>{maksdato.linjeId}</Table.DataCell>
              <Table.DataCell>{formatDate(maksdato.maksdato)}</Table.DataCell>
              <Table.DataCell>{formatDate(maksdato.datoFom)}</Table.DataCell>
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
