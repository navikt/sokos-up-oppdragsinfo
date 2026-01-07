import { Table } from "@navikt/ds-react";
import { useFetchSkyldnere } from "../../api/apiService";
import type { OppdragsIdent } from "../../types/OppdragsIdent";
import type { Skyldner } from "../../types/Skyldner";
import { formatDate, formatDateTime, isEmpty } from "../../util/commonUtil";

export default function SkyldnereTable(props: OppdragsIdent) {
	const { data } = useFetchSkyldnere(props.oppdragsId, props.linjeId);

	return (
		<Table zebraStripes>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell scope="col">Linje</Table.HeaderCell>
					<Table.HeaderCell scope="col">Skyldner</Table.HeaderCell>
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
					data?.map((skyldner: Skyldner) => (
						<Table.Row key={btoa(skyldner.linjeId)}>
							<Table.DataCell>{skyldner.linjeId}</Table.DataCell>
							<Table.DataCell>{skyldner.skyldnerId}</Table.DataCell>
							<Table.DataCell>{formatDate(skyldner.datoFom)}</Table.DataCell>
							<Table.DataCell>
								{formatDateTime(skyldner.tidspktReg)}
							</Table.DataCell>
							<Table.DataCell>{skyldner.brukerid}</Table.DataCell>
						</Table.Row>
					))}
			</Table.Body>
		</Table>
	);
}
