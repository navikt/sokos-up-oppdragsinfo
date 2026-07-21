import { Button, LocalAlert, Modal, Table } from "@navikt/ds-react";
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
			<Button
				size="small"
				variant="secondary"
				data-color="neutral"
				onClick={handleClick}
			>
				Omposteringer
			</Button>

			<Modal ref={ref} header={{ heading: "Omposteringer" }} width={modalWidth}>
				<Modal.Body>
					{data && !isEmpty(data) && (
						<Table zebraStripes>
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeader>Gjelder</Table.ColumnHeader>
									<Table.ColumnHeader>Faggruppe</Table.ColumnHeader>
									<Table.ColumnHeader>Løpenummer</Table.ColumnHeader>
									<Table.ColumnHeader>Ompostering</Table.ColumnHeader>
									<Table.ColumnHeader>Dato fom</Table.ColumnHeader>
									<Table.ColumnHeader>Feil registrert</Table.ColumnHeader>
									<Table.ColumnHeader>Beregning</Table.ColumnHeader>
									<Table.ColumnHeader>Utført</Table.ColumnHeader>
									<Table.ColumnHeader>Brukerid</Table.ColumnHeader>
									<Table.ColumnHeader>
										Registrert i Oppdragssystemet
									</Table.ColumnHeader>
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
							<LocalAlert status="announcement">
								<LocalAlert.Header>
									<LocalAlert.Title as="h3">
										Det fins ingen omposteringer for dette oppdraget.
									</LocalAlert.Title>
								</LocalAlert.Header>
							</LocalAlert>
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
