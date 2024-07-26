import { Table } from "@navikt/ds-react";
import { Skyldner } from "../../types/Skyldner";
import RestService from "../../api/rest-service";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

const SkyldnereTable = ({
                              oppdragsid,
                              linjeid
                            }: {
  oppdragsid: string;
  linjeid: string;
}) => {
  const { data } = RestService.useFetchSkyldnere(oppdragsid, linjeid);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje Id</Table.HeaderCell>
          <Table.HeaderCell scope="col">Skyldner Id</Table.HeaderCell>
          <Table.HeaderCell scope="col">Dato fom</Table.HeaderCell>
          <Table.HeaderCell scope="col">Tidspunkt registrert</Table.HeaderCell>
          <Table.HeaderCell scope="col">Bruker Id</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          Array.isArray(data) &&
          !isEmpty(data) &&
          data?.map((skyldner: Skyldner) => (
            <Table.Row key={btoa(skyldner.linjeId)}>
              <Table.DataCell>{skyldner.linjeId}</Table.DataCell>
              <Table.DataCell>{skyldner.skyldnerId}</Table.DataCell>
              <Table.DataCell>{skyldner.datoFom}</Table.DataCell>
              <Table.DataCell>{formatDateTime(skyldner.tidspktReg)}</Table.DataCell>
              <Table.DataCell>{skyldner.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default SkyldnereTable;
