import RestService from "../../services/rest-service";
import { Table } from "@navikt/ds-react";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../../util/commonUtils";
import { Grad } from "../../models/Grad";
import ContentLoader from "../common/ContentLoader";

const GraderVisning = ({ oppdragsid, linjeid }: { oppdragsid: string; linjeid: string }) => {
  const [data, isLoading] = RestService.useFetchGrad(oppdragsid, linjeid);

  if (isLoading) return <ContentLoader />;

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell key={"linjeId"} scope="col" children={"linjeId"} />
          <Table.HeaderCell key={"typeGrad"} scope="col" children={"typeGrad"} />
          <Table.HeaderCell key={"grad"} scope="col" children={"grad"} />
          <Table.HeaderCell key={"tidspktReg"} scope="col" children={"tidspktReg"} />
          <Table.HeaderCell key={"brukerid"} scope="col" children={"brukerid"} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          isArray(data) &&
          !isEmpty(data) &&
          data?.map((grad: Grad) => (
            <Table.Row key={btoa(grad.linjeId)}>
              <Table.DataCell>{grad.linjeId}</Table.DataCell>
              <Table.DataCell>{grad.typeGrad}</Table.DataCell>
              <Table.DataCell>{grad.grad}</Table.DataCell>
              <Table.DataCell>{grad.tidspktReg}</Table.DataCell>
              <Table.DataCell>{grad.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default GraderVisning;
