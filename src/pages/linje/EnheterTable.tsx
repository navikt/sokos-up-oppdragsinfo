import { Table } from "@navikt/ds-react";
import { useFetchLinjeEnheter } from "../../api/apiService";
import { LinjeEnhet } from "../../types/LinjeEnhet";
import { OppdragsIdent } from "../../types/OppdragsIdent";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

export default function EnheterTable(props: OppdragsIdent) {
  const { data } = useFetchLinjeEnheter(props.oppdragsId, props.linjeId);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje</Table.HeaderCell>
          <Table.HeaderCell scope="col">Enhetstype</Table.HeaderCell>
          <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
          <Table.HeaderCell scope="col">Dato fom</Table.HeaderCell>
          <Table.HeaderCell scope="col">Nøkkel id</Table.HeaderCell>
          <Table.HeaderCell scope="col">
            Registrert i Oppdragssystemet
          </Table.HeaderCell>
          <Table.HeaderCell scope="col">Brukerid</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          Array.isArray(data) &&
          !isEmpty(data) &&
          data?.map((linjeenhet: LinjeEnhet) => (
            <Table.Row key={btoa(JSON.stringify(linjeenhet))}>
              <Table.DataCell>{linjeenhet.linjeId}</Table.DataCell>
              <Table.DataCell>{linjeenhet.typeEnhet}</Table.DataCell>
              <Table.DataCell>{linjeenhet.enhet}</Table.DataCell>
              <Table.DataCell>{linjeenhet.datoFom}</Table.DataCell>
              <Table.DataCell>{linjeenhet.nokkelId}</Table.DataCell>
              <Table.DataCell>
                {formatDateTime(linjeenhet.tidspktReg)}
              </Table.DataCell>
              <Table.DataCell>{linjeenhet.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}
