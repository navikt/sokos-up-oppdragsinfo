import { Table } from "@navikt/ds-react";
import { Tekst } from "../../types/Tekst";
import RestService from "../../api/rest-service";
import { isEmpty } from "../../util/commonUtil";

const TeksterTable = (
  { oppdragsId, linjeId }: { oppdragsId: string; linjeId: string; }
) => {
  const { data } = RestService.useFetchTekster(oppdragsId, linjeId);

  return (
    <div>
      <Table zebraStripes>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Linje Id</Table.HeaderCell>
            <Table.HeaderCell scope="col">Tekst</Table.HeaderCell>
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
