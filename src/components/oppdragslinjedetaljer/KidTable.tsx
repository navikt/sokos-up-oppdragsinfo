import { Table } from "@navikt/ds-react";
import { Kid } from "../../types/Kid";
import RestService from "../../api/rest-service";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

const KidTable = ({
                         oppdragsid,
                         linjeid
                       }: {
  oppdragsid: string;
  linjeid: string;
}) => {
  const { data } = RestService.useFetchKid(oppdragsid, linjeid);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje Id</Table.HeaderCell>
          <Table.HeaderCell scope="col">Kid</Table.HeaderCell>
          <Table.HeaderCell scope="col">Dato fom</Table.HeaderCell>
          <Table.HeaderCell scope="col">Tidspunkt registrert</Table.HeaderCell>
          <Table.HeaderCell scope="col">Bruker Id</Table.HeaderCell>
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
};

export default KidTable;
