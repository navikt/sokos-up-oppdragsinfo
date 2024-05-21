import { isArray } from "@grafana/faro-web-sdk";
import { Table } from "@navikt/ds-react";
import { Kravhaver } from "../../models/Kravhaver";
import RestService from "../../services/rest-service";
import { isEmpty } from "../../util/commonUtils";

const KravhaverTable = ({
  oppdragsid,
  linjeid,
}: {
  oppdragsid: string;
  linjeid: string;
}) => {
  const [data] = RestService.useFetchKravhaver(oppdragsid, linjeid);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell key={"linjeId"} scope="col" children={"linjeId"} />
          <Table.HeaderCell
            key={"kravhaverId"}
            scope="col"
            children={"kravhaverId"}
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
          data?.map((kravhaver: Kravhaver) => (
            <Table.Row key={btoa(kravhaver.linjeId)}>
              <Table.DataCell>{kravhaver.linjeId}</Table.DataCell>
              <Table.DataCell>{kravhaver.kravhaverId}</Table.DataCell>
              <Table.DataCell>{kravhaver.datoFom}</Table.DataCell>
              <Table.DataCell>{kravhaver.tidspktReg}</Table.DataCell>
              <Table.DataCell>{kravhaver.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default KravhaverTable;
