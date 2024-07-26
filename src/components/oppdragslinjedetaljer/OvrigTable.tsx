import { Table } from "@navikt/ds-react";
import { Ovrig } from "../../types/Ovrig";
import RestService from "../../api/rest-service";
import { isEmpty } from "../../util/commonUtil";

const OvrigTable = (
  { oppdragsId, linjeId }: { oppdragsId: string; linjeId: string; }
) => {
  const { data } = RestService.useFetchOvrig(oppdragsId, linjeId);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje Id</Table.HeaderCell>
          <Table.HeaderCell scope="col">Vedtak Id</Table.HeaderCell>
          <Table.HeaderCell scope="col">Henvisning</Table.HeaderCell>
          <Table.HeaderCell scope="col">Søknad type</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          Array.isArray(data) &&
          !isEmpty(data) &&
          data?.map((ovrig: Ovrig) => (
            <Table.Row key={btoa(ovrig.linjeId)}>
              <Table.DataCell>{ovrig.linjeId}</Table.DataCell>
              <Table.DataCell>{ovrig.vedtaksId}</Table.DataCell>
              <Table.DataCell>{ovrig.henvisning}</Table.DataCell>
              <Table.DataCell>{ovrig.soknadsType}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default OvrigTable;
