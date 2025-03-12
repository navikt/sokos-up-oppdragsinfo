import { Table } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import { OppdragsIdent } from "../../types/OppdragsIdent";
import { Valuta } from "../../types/Valuta";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

export default function ValutaerTable(props: OppdragsIdent) {
  const { data } = apiService.useFetchValuta(props.oppdragsId, props.linjeId);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje</Table.HeaderCell>
          <Table.HeaderCell scope="col">Type</Table.HeaderCell>
          <Table.HeaderCell scope="col">Dato fom</Table.HeaderCell>
          <Table.HeaderCell scope="col">Nøkkel id</Table.HeaderCell>
          <Table.HeaderCell scope="col">Valuta</Table.HeaderCell>
          <Table.HeaderCell scope="col">Feil registrert</Table.HeaderCell>
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
          data?.map((valuta: Valuta) => (
            <Table.Row key={btoa(valuta.linjeId + valuta.nokkelId)}>
              <Table.DataCell>{valuta.linjeId}</Table.DataCell>
              <Table.DataCell>{valuta.type}</Table.DataCell>
              <Table.DataCell>{valuta.datoFom}</Table.DataCell>
              <Table.DataCell>{valuta.nokkelId}</Table.DataCell>
              <Table.DataCell>{valuta.valuta}</Table.DataCell>
              <Table.DataCell>{valuta.feilreg}</Table.DataCell>
              <Table.DataCell>
                {formatDateTime(valuta.tidspktReg)}
              </Table.DataCell>
              <Table.DataCell>{valuta.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}
