import { Table } from "@navikt/ds-react";
import { Tekst } from "../../models/Tekst";
import RestService from "../../services/rest-service";
import { isEmpty } from "../../util/commonUtils";

const TeksterTable = ({
  oppdragsid,
  linjeid,
}: {
  oppdragsid: string;
  linjeid: string;
}) => {
  const [data] = RestService.useFetchTekster(oppdragsid, linjeid);

  return (
    <div>
      <Table zebraStripes>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              key={"linjeId"}
              scope="col"
              children={"Linje-ID"}
            />
            <Table.HeaderCell key={"tekst"} scope="col" children={"Tekst"} />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data &&
            Array.isArray(data) &&
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

export default TeksterTable;
