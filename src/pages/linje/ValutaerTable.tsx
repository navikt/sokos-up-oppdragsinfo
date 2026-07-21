import { Table } from "@navikt/ds-react";
import { useFetchValuta } from "../../api/apiService";
import type { OppdragsIdent } from "../../types/OppdragsIdent";
import type { Valuta } from "../../types/Valuta";
import { formatDate, formatDateTime, isEmpty } from "../../util/commonUtil";

export default function ValutaerTable(props: OppdragsIdent) {
	const { data } = useFetchValuta(props.oppdragsId, props.linjeId);

	return (
		<Table zebraStripes>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader>Linje</Table.ColumnHeader>
					<Table.ColumnHeader>Type</Table.ColumnHeader>
					<Table.ColumnHeader>Dato fom</Table.ColumnHeader>
					<Table.ColumnHeader>Nøkkel id</Table.ColumnHeader>
					<Table.ColumnHeader>Valuta</Table.ColumnHeader>
					<Table.ColumnHeader>Feil registrert</Table.ColumnHeader>
					<Table.ColumnHeader>Registrert i Oppdragssystemet</Table.ColumnHeader>
					<Table.ColumnHeader>Brukerid</Table.ColumnHeader>
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
							<Table.DataCell>{formatDate(valuta.datoFom)}</Table.DataCell>
							<Table.DataCell>{valuta.nokkelId}</Table.DataCell>
							<Table.DataCell>{valuta.typeValuta}</Table.DataCell>
							<Table.DataCell>{valuta.feilreg}</Table.DataCell>
							<Table.DataCell>
								{formatDateTime(valuta.tidspktReg ? valuta.tidspktReg : "")}
							</Table.DataCell>
							<Table.DataCell>{valuta.brukerid}</Table.DataCell>
						</Table.Row>
					))}
			</Table.Body>
		</Table>
	);
}
