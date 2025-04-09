import { Table } from "@navikt/ds-react";
import { useFetchTekster } from "../../api/apiService";
import { OppdragsIdent } from "../../types/OppdragsIdent";
import { Tekst } from "../../types/Tekst";
import { isEmpty } from "../../util/commonUtil";

export default function TeksterTable(props: OppdragsIdent) {
  const { data } = useFetchTekster(props.oppdragsId, props.linjeId);

  return (
    <div>
      <Table zebraStripes>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Linje</Table.HeaderCell>
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
}
