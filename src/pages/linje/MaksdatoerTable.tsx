import { Table } from "@navikt/ds-react";
import { useFetchMaksdato } from "../../api/apiService";
import type { Maksdato } from "../../types/Maksdato";
import type { OppdragsIdent } from "../../types/OppdragsIdent";
import { formatDate, formatDateTime, isEmpty } from "../../util/commonUtil";

export default function MaksdatoerTable(props: OppdragsIdent) {
	const { data } = useFetchMaksdato(props.oppdragsId, props.linjeId);

	return (
		<Table zebraStripes>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader>Linje</Table.ColumnHeader>
					<Table.ColumnHeader>Maksdato</Table.ColumnHeader>
					<Table.ColumnHeader>Dato fom</Table.ColumnHeader>
					<Table.ColumnHeader>Registrert i Oppdragssystemet</Table.ColumnHeader>
					<Table.ColumnHeader>Brukerid</Table.ColumnHeader>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data &&
					Array.isArray(data) &&
					!isEmpty(data) &&
					data?.map((maksdato: Maksdato) => (
						<Table.Row key={btoa(JSON.stringify(maksdato))}>
							<Table.DataCell>{maksdato.linjeId}</Table.DataCell>
							<Table.DataCell>{formatDate(maksdato.maksdato)}</Table.DataCell>
							<Table.DataCell>{formatDate(maksdato.datoFom)}</Table.DataCell>
							<Table.DataCell>
								{formatDateTime(maksdato.tidspktReg)}
							</Table.DataCell>
							<Table.DataCell>{maksdato.brukerid}</Table.DataCell>
						</Table.Row>
					))}
			</Table.Body>
		</Table>
	);
}
