import { isArray } from "@grafana/faro-web-sdk";
import { Table } from "@navikt/ds-react";
import { Skyldner } from "../../models/Skyldner";
import RestService from "../../services/rest-service";
import { isEmpty } from "../../util/commonUtils";

const SkyldnersListTable = ({
  oppdragsid,
  linjeid,
}: {
  oppdragsid: string;
  linjeid: string;
}) => {
  const [data] = RestService.useFetchSkyldnersList(oppdragsid, linjeid);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell key={"linjeId"} scope="col" children={"Linje-ID"} />
          <Table.HeaderCell
            key={"skyldnerId"}
            scope="col"
            children={"skyldnerId"}
          />
          <Table.HeaderCell key={"datoFom"} scope="col" children={"datoFom"} />
          <Table.HeaderCell
            key={"tidspktReg"}
            scope="col"
            children={"tidspktReg"}
          />
          <Table.HeaderCell
            key={"brukerid"}
            scope="col"
            children={"brukerid"}
          />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          isArray(data) &&
          !isEmpty(data) &&
          data?.map((skyldner: Skyldner) => (
            <Table.Row key={btoa(skyldner.linjeId)}>
              <Table.DataCell>{skyldner.linjeId}</Table.DataCell>
              <Table.DataCell>{skyldner.skyldnerId}</Table.DataCell>
              <Table.DataCell>{skyldner.datoFom}</Table.DataCell>
              <Table.DataCell>{skyldner.tidspktReg}</Table.DataCell>
              <Table.DataCell>{skyldner.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default SkyldnersListTable;
