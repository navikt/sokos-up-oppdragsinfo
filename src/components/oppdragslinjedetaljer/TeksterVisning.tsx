import RestService from "../../services/rest-service";
import { Table } from "@navikt/ds-react";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../../util/commonUtils";
import { Tekst } from "../../models/Tekst";

const TeksterVisning = ({ oppdragsid, linjeid }: { oppdragsid: string; linjeid: string }) => {
  const [data] = RestService.useFetchTekster(oppdragsid, linjeid);

  return (
    <div>
      <Table zebraStripes>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell key={"linjeId"} scope="col" children={"Linje-ID"} />
            <Table.HeaderCell key={"tekst"} scope="col" children={"Tekst"} />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data &&
            isArray(data) &&
            !isEmpty(data) &&
            data.map((tekst: Tekst) => (
              <Table.Row key={btoa(tekst.linjeId)}>
                <Table.DataCell>{tekst.linjeId}</Table.DataCell>
                <Table.DataCell>{tekst.tekst}</Table.DataCell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TeksterVisning;
