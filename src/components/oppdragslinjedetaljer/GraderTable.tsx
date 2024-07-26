import { Table } from "@navikt/ds-react";
import { Grad } from "../../types/Grad";
import RestService from "../../api/rest-service";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

const GraderTable = (
  { oppdragsId, linjeId }: { oppdragsId: string; linjeId: string; }
) => {
  const { data } = RestService.useFetchGrad(oppdragsId, linjeId);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje Id</Table.HeaderCell>
          <Table.HeaderCell scope="col">Type grad</Table.HeaderCell>
          <Table.HeaderCell scope="col">Grad</Table.HeaderCell>
          <Table.HeaderCell scope="col">Tidspunkt registrert</Table.HeaderCell>
          <Table.HeaderCell scope="col">Bruker Id</Table.HeaderCell>
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
};

export default GraderTable;
