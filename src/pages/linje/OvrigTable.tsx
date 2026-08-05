import { Table } from "@navikt/ds-react";
import { useFetchOvrig } from "../../api/apiService";
import type { OppdragsIdent } from "../../types/OppdragsIdent";
import type { Ovrig } from "../../types/Ovrig";
import { isEmpty } from "../../util/commonUtil";

export default function OvrigTable(props: OppdragsIdent) {
	const { data } = useFetchOvrig(props.oppdragsId, props.linjeId);

	return (
		<Table zebraStripes>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader>Linje</Table.ColumnHeader>
					<Table.ColumnHeader>Vedtak id</Table.ColumnHeader>
					<Table.ColumnHeader>Henvisning</Table.ColumnHeader>
					<Table.ColumnHeader>Søknadstype</Table.ColumnHeader>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data &&
					Array.isArray(data) &&
					!isEmpty(data) &&
					data?.map((ovrig: Ovrig) => (
						<Table.Row key={btoa(ovrig.linjeId)}>
							<Table.DataCell>{ovrig.linjeId}</Table.DataCell>
							<Table.DataCell>{ovrig.vedtaksId}</Table.DataCell>
							<Table.DataCell>{ovrig.henvisning}</Table.DataCell>
							<Table.DataCell>{ovrig.typeSoknad}</Table.DataCell>
						</Table.Row>
					))}
			</Table.Body>
		</Table>
	);
}
