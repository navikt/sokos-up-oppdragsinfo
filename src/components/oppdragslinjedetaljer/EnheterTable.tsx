import { Table } from "@navikt/ds-react";
import { LinjeEnhet } from "../../types/LinjeEnhet";
import RestService from "../../api/rest-service";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

const EnheterTable = (
  { oppdragsId, linjeId }: { oppdragsId: string; linjeId: string; }
) => {
  const { data } = RestService.useFetchLinjeEnheter(oppdragsId, linjeId);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje Id</Table.HeaderCell>
          <Table.HeaderCell scope="col">Type enhet</Table.HeaderCell>
          <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
          <Table.HeaderCell scope="col">Dato fom</Table.HeaderCell>
          <Table.HeaderCell scope="col">Nøkkel Id</Table.HeaderCell>
          <Table.HeaderCell scope="col">Tidspunkt registrert</Table.HeaderCell>
          <Table.HeaderCell scope="col">Bruker Id</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          Array.isArray(data) &&
          !isEmpty(data) &&
          data?.map((linjeenhet: LinjeEnhet) => (
            <Table.Row key={btoa(JSON.stringify(linjeenhet))}>
              <Table.DataCell>{linjeenhet.linjeId}</Table.DataCell>
              <Table.DataCell>{linjeenhet.typeEnhet}</Table.DataCell>
              <Table.DataCell>{linjeenhet.enhet}</Table.DataCell>
              <Table.DataCell>{linjeenhet.datoFom}</Table.DataCell>
              <Table.DataCell>{linjeenhet.nokkelId}</Table.DataCell>
              <Table.DataCell>{formatDateTime(linjeenhet.tidspktReg)}</Table.DataCell>
              <Table.DataCell>{linjeenhet.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default EnheterTable;
