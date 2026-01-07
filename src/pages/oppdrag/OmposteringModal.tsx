import { Alert, Button, Modal, Table } from "@navikt/ds-react";
import { useRef, useState } from "react";
import { useFetchHentOppdragsOmposteringer } from "../../api/apiService";
import type { Ompostering } from "../../types/Ompostering";
import type { OppdragsId } from "../../types/OppdragsId";
import { formatDate, formatDateTime, isEmpty } from "../../util/commonUtil";

export default function OmposteringModal(props: OppdragsId) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const ref = useRef<HTMLDialogElement>(null);
	const { data } = useFetchHentOppdragsOmposteringer(props.oppdragsId, isOpen);

	const handleClick = () => {
		setIsOpen(true);
		ref.current?.showModal();
	};

	const modalWidth = data && !isEmpty(data) ? "1280px" : "600px";

	return (
		<div>
			<Button size="small" variant="secondary-neutral" onClick={handleClick}>
				Omposteringer
			</Button>

			<Modal ref={ref} header={{ heading: "Omposteringer" }} width={modalWidth}>
				<Modal.Body>
					{data && !isEmpty(data) && (
						<Table zebraStripes>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell key={"id"} scope="col">
										Gjelder
									</Table.HeaderCell>
									<Table.HeaderCell scope="col">Faggruppe</Table.HeaderCell>
									<Table.HeaderCell scope="col">Løpenummer</Table.HeaderCell>
									<Table.HeaderCell scope="col">Ompostering</Table.HeaderCell>
									<Table.HeaderCell scope="col">Dato fom</Table.HeaderCell>
									<Table.HeaderCell scope="col">
										Feil registrert
									</Table.HeaderCell>
									<Table.HeaderCell scope="col">Beregning</Table.HeaderCell>
									<Table.HeaderCell scope="col">Utført</Table.HeaderCell>
									<Table.HeaderCell scope="col">Brukerid</Table.HeaderCell>
									<Table.HeaderCell scope="col">
										Registrert i Oppdragssystemet
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{data.map((ompostering: Ompostering) => (
									<Table.Row
										key={btoa(ompostering.gjelderId + ompostering.ompostering)}
									>
										<Table.DataCell>{ompostering.gjelderId}</Table.DataCell>
										<Table.DataCell>{ompostering.kodeFaggruppe}</Table.DataCell>
										<Table.DataCell>{ompostering.lopenr}</Table.DataCell>
										<Table.DataCell>{ompostering.ompostering}</Table.DataCell>
										<Table.DataCell>
											{formatDate(ompostering.datoOmposterFom)}
										</Table.DataCell>
										<Table.DataCell>{ompostering.feilReg}</Table.DataCell>
										<Table.DataCell>{ompostering.beregningsId}</Table.DataCell>
										<Table.DataCell>{ompostering.utfort}</Table.DataCell>
										<Table.DataCell>{ompostering.brukerid}</Table.DataCell>
										<Table.DataCell>
											{formatDateTime(ompostering.tidspktReg)}
										</Table.DataCell>
									</Table.Row>
								))}
							</Table.Body>
						</Table>
					)}
					{!data ||
						(isEmpty(data) && (
							<Alert variant="info">
								Det fins ingen omposteringer for dette oppdraget.
							</Alert>
						))}
				</Modal.Body>
				<Modal.Footer>
					<Button type="button" onClick={() => ref.current?.close()}>
						Lukk
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
