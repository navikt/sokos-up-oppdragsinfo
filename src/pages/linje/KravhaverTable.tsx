import { Table } from "@navikt/ds-react";
import { useFetchKravhaver } from "../../api/apiService";
import type { Kravhaver } from "../../types/Kravhaver";
import type { OppdragsIdent } from "../../types/OppdragsIdent";
import { formatDate, isEmpty } from "../../util/commonUtil";

export default function KravhaverTable(props: OppdragsIdent) {
	const { data } = useFetchKravhaver(props.oppdragsId, props.linjeId);

	return (
		<Table zebraStripes>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell scope="col">Linje</Table.HeaderCell>
					<Table.HeaderCell scope="col">Kravhaver</Table.HeaderCell>
					<Table.HeaderCell scope="col">Dato fom</Table.HeaderCell>
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
					data?.map((kravhaver: Kravhaver) => (
						<Table.Row key={btoa(kravhaver.linjeId)}>
							<Table.DataCell>{kravhaver.linjeId}</Table.DataCell>
							<Table.DataCell>{kravhaver.kravhaverId}</Table.DataCell>
							<Table.DataCell>{formatDate(kravhaver.datoFom)}</Table.DataCell>
							<Table.DataCell>
								{formatDate(kravhaver.tidspktReg)}
							</Table.DataCell>
							<Table.DataCell>{kravhaver.brukerid}</Table.DataCell>
						</Table.Row>
					))}
			</Table.Body>
		</Table>
	);
}
