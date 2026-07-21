import { Table } from "@navikt/ds-react";
import { useFetchGrad } from "../../api/apiService";
import type { Grad } from "../../types/Grad";
import type { OppdragsIdent } from "../../types/OppdragsIdent";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

export default function GraderTable(props: OppdragsIdent) {
	const { data } = useFetchGrad(props.oppdragsId, props.linjeId);

	return (
		<Table zebraStripes>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader>Linje</Table.ColumnHeader>
					<Table.ColumnHeader>Gradstype</Table.ColumnHeader>
					<Table.ColumnHeader>Grad</Table.ColumnHeader>
					<Table.ColumnHeader>Registrert i Oppdragssystemet</Table.ColumnHeader>
					<Table.ColumnHeader>Brukerid</Table.ColumnHeader>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data &&
					Array.isArray(data) &&
					!isEmpty(data) &&
					data?.map((grad: Grad) => (
						<Table.Row key={btoa(grad.linjeId)}>
							<Table.DataCell>{grad.linjeId}</Table.DataCell>
							<Table.DataCell>{grad.typeGrad}</Table.DataCell>
							<Table.DataCell>{grad.grad}</Table.DataCell>
							<Table.DataCell>{formatDateTime(grad.tidspktReg)}</Table.DataCell>
							<Table.DataCell>{grad.brukerid}</Table.DataCell>
						</Table.Row>
					))}
			</Table.Body>
		</Table>
	);
}
