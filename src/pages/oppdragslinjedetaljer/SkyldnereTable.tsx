import { Table } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import { OppdragsIdent } from "../../types/OppdragsIdent";
import { Skyldner } from "../../types/Skyldner";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

export default function SkyldnereTable(props: OppdragsIdent) {
  const { data } = apiService.useFetchSkyldnere(
    props.oppdragsId,
    props.linjeId,
  );

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje-ID</Table.HeaderCell>
          <Table.HeaderCell scope="col">Skyldner ID</Table.HeaderCell>
          <Table.HeaderCell scope="col">Dato FOM</Table.HeaderCell>
          <Table.HeaderCell scope="col">Tidspunkt registrert</Table.HeaderCell>
          <Table.HeaderCell scope="col">Bruker ID</Table.HeaderCell>
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
              <Table.DataCell>
                {formatDateTime(skyldner.tidspktReg)}
              </Table.DataCell>
              <Table.DataCell>{skyldner.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}
