import { Table } from "@navikt/ds-react";
import { Ovrig } from "../../models/Ovrig";
import RestService from "../../services/rest-service";
import { isEmpty } from "../../util/commonUtils";

const OvrigTable = ({
  oppdragsid,
  linjeid,
}: {
  oppdragsid: string;
  linjeid: string;
}) => {
  const [data] = RestService.useFetchOvrig(oppdragsid, linjeid);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell key={"linjeId"} scope="col" children={"Linje-ID"} />
          <Table.HeaderCell
            key={"vedtaksId"}
            scope="col"
            children={"vedtaksId"}
          />
          <Table.HeaderCell
            key={"henvisning"}
            scope="col"
            children={"henvisning"}
          />
          <Table.HeaderCell
            key={"soknadsType"}
            scope="col"
            children={"soknadsType"}
          />
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
