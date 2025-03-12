import { Table } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import { Grad } from "../../types/Grad";
import { OppdragsIdent } from "../../types/OppdragsIdent";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

export default function GraderTable(props: OppdragsIdent) {
  const { data } = apiService.useFetchGrad(props.oppdragsId, props.linjeId);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje</Table.HeaderCell>
          <Table.HeaderCell scope="col">Gradstype</Table.HeaderCell>
          <Table.HeaderCell scope="col">Grad</Table.HeaderCell>
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
          data?.map((grad: Grad) => (
            <Table.Row key={btoa(grad.linjeId)}>
              <Table.DataCell>{grad.linjeId}</Table.DataCell>
              <Table.DataCell>{grad.typeGrad}</Table.DataCell>
              <Table.DataCell>{grad.grad}</Table.DataCell>
              <Table.DataCell>{formatDateTime(grad.tidspktReg)}</Table.DataCell>
              <Table.DataCell>{grad.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}
