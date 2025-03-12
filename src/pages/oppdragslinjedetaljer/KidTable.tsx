import { Table } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import { Kid } from "../../types/Kid";
import { OppdragsIdent } from "../../types/OppdragsIdent";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

export default function KidTable(props: OppdragsIdent) {
  const { data } = apiService.useFetchKid(props.oppdragsId, props.linjeId);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje</Table.HeaderCell>
          <Table.HeaderCell scope="col">Kid</Table.HeaderCell>
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
          data?.map((kid: Kid) => (
            <Table.Row key={btoa(kid.linjeId)}>
              <Table.DataCell>{kid.linjeId}</Table.DataCell>
              <Table.DataCell>{kid.kid}</Table.DataCell>
              <Table.DataCell>{kid.datoFom}</Table.DataCell>
              <Table.DataCell>{formatDateTime(kid.tidspktReg)}</Table.DataCell>
              <Table.DataCell>{kid.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}
