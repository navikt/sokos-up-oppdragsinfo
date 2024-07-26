import { Table } from "@navikt/ds-react";
import { Kravhaver } from "../../types/Kravhaver";
import RestService from "../../api/rest-service";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

const KravhaverTable = (
  { oppdragsId, linjeId }: { oppdragsId: string; linjeId: string; }
) => {
  const { data } = RestService.useFetchKravhaver(oppdragsId, linjeId);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje Id</Table.HeaderCell>
          <Table.HeaderCell scope="col">Kravhaver Id</Table.HeaderCell>
          <Table.HeaderCell scope="col">Dato fom</Table.HeaderCell>
          <Table.HeaderCell scope="col">Tidspunkt registrert</Table.HeaderCell>
          <Table.HeaderCell scope="col">Bruker Id</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          Array.isArray(data) &&
          !isEmpty(data) &&
          data?.map((kravhaver: Kravhaver) => (
            <Table.Row key={btoa(kravhaver.linjeId)}>
              <Table.DataCell>{kravhaver.linjeId}</Table.DataCell>
              <Table.DataCell>{kravhaver.kravhaverId}</Table.DataCell>
              <Table.DataCell>{kravhaver.datoFom}</Table.DataCell>
              <Table.DataCell>{formatDateTime(kravhaver.tidspktReg)}</Table.DataCell>
              <Table.DataCell>{kravhaver.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default KravhaverTable;
