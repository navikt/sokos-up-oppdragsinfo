import RestService from "../../services/rest-service";
import { Table } from "@navikt/ds-react";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../../util/commonUtils";
import { Kravhaver } from "../../models/Kravhaver";
import ContentLoader from "../util/ContentLoader";

const KravhaverVisning = ({ oppdragsid, linjeid }: { oppdragsid: string; linjeid: string }) => {
  const [data, isLoading] = RestService.useFetchKravhaver(oppdragsid, linjeid);

  if (isLoading) return <ContentLoader />;

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell key={"linjeId"} scope="col" children={"linjeId"} />
          <Table.HeaderCell key={"kravhaverId"} scope="col" children={"kravhaverId"} />
          <Table.HeaderCell key={"datoFom"} scope="col" children={"datoFom"} />
          <Table.HeaderCell key={"tidspktReg"} scope="col" children={"tidspktReg"} />
          <Table.HeaderCell key={"brukerid"} scope="col" children={"brukerid"} />
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

export default KravhaverVisning;
