import RestService from "../../services/rest-service";
import { Table } from "@navikt/ds-react";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../../util/commonUtils";
import { Linjeenhet } from "../../models/Linjeenhet";
import ContentLoader from "../util/ContentLoader";

const LinjeenheterVisning = ({ oppdragsid, linjeid }: { oppdragsid: string; linjeid: string }) => {
  const [data, isLoading] = RestService.useFetchLinjeenheter(oppdragsid, linjeid);

  if (isLoading) return <ContentLoader />;

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell key={"linjeId"} scope="col" children={"Linje-ID"} />
          <Table.HeaderCell key={"typeEnhet"} scope="col" children={"typeEnhet"} />
          <Table.HeaderCell key={"enhet"} scope="col" children={"enhet"} />
          <Table.HeaderCell key={"datoFom"} scope="col" children={"datoFom"} />
          <Table.HeaderCell key={"nokkelId"} scope="col" children={"nokkelId"} />
          <Table.HeaderCell key={"tidspktReg"} scope="col" children={"tidspktReg"} />
          <Table.HeaderCell key={"brukerid"} scope="col" children={"brukerid"} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          isArray(data) &&
          !isEmpty(data) &&
          data?.map((linjeenhet: Linjeenhet) => (
            <Table.Row key={btoa(JSON.stringify(linjeenhet))}>
              <Table.DataCell>{linjeenhet.linjeId}</Table.DataCell>
              <Table.DataCell>{linjeenhet.typeEnhet}</Table.DataCell>
              <Table.DataCell>{linjeenhet.enhet}</Table.DataCell>
              <Table.DataCell>{linjeenhet.datoFom}</Table.DataCell>
              <Table.DataCell>{linjeenhet.nokkelId}</Table.DataCell>
              <Table.DataCell>{linjeenhet.tidspktReg}</Table.DataCell>
              <Table.DataCell>{linjeenhet.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default LinjeenheterVisning;
