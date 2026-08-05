import { Table } from "@navikt/ds-react";
import { useFetchLinjeEnheter } from "../../api/apiService";
import type { LinjeEnhet } from "../../types/LinjeEnhet";
import type { OppdragsIdent } from "../../types/OppdragsIdent";
import { formatDate, formatDateTime, isEmpty } from "../../util/commonUtil";

export default function EnheterTable(props: OppdragsIdent) {
	const { data } = useFetchLinjeEnheter(props.oppdragsId, props.linjeId);

	return (
		<Table zebraStripes>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader>Linje</Table.ColumnHeader>
					<Table.ColumnHeader>Enhetstype</Table.ColumnHeader>
					<Table.ColumnHeader>Enhet</Table.ColumnHeader>
					<Table.ColumnHeader>Dato fom</Table.ColumnHeader>
					<Table.ColumnHeader>Nøkkel id</Table.ColumnHeader>
					<Table.ColumnHeader>Registrert i Oppdragssystemet</Table.ColumnHeader>
					<Table.ColumnHeader>Brukerid</Table.ColumnHeader>
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
							<Table.DataCell>{formatDate(linjeenhet.datoFom)}</Table.DataCell>
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
