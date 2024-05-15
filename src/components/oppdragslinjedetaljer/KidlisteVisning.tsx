import { isArray } from "@grafana/faro-web-sdk";
import { Table } from "@navikt/ds-react";
import { Kid } from "../../models/Kid";
import RestService from "../../services/rest-service";
import { isEmpty } from "../../util/commonUtils";

const KidlisteVisning = ({
  oppdragsid,
  linjeid,
}: {
  oppdragsid: string;
  linjeid: string;
}) => {
  const [data] = RestService.useFetchKidliste(oppdragsid, linjeid);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell key={"linjeId"} scope="col" children={"Linje-ID"} />
          <Table.HeaderCell key={"kid"} scope="col" children={"kid"} />
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
          data?.map((kid: Kid) => (
            <Table.Row key={btoa(kid.linjeId)}>
              <Table.DataCell>{kid.linjeId}</Table.DataCell>
              <Table.DataCell>{kid.kid}</Table.DataCell>
              <Table.DataCell>{kid.datoFom}</Table.DataCell>
              <Table.DataCell>{kid.tidspktReg}</Table.DataCell>
              <Table.DataCell>{kid.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default KidlisteVisning;
