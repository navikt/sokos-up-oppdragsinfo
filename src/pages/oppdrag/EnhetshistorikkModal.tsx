import { Button, LocalAlert, Modal, Table } from "@navikt/ds-react";
import { useRef, useState } from "react";
import { useFetchHentOppdragsEnhethistorikk } from "../../api/apiService";
import type { Enhet } from "../../types/EnhetsType";
import type { OppdragsId } from "../../types/OppdragsId";
import { formatDate, isEmpty } from "../../util/commonUtil";

export default function EnhetshistorikkModal(props: OppdragsId) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const ref = useRef<HTMLDialogElement>(null);
	const { data } = useFetchHentOppdragsEnhethistorikk(props.oppdragsId, isOpen);

	const handleClick = () => {
		setIsOpen(true);
		ref.current?.showModal();
	};

	return (
		<div>
			<Button
				size="small"
				variant="secondary"
				data-color="neutral"
				onClick={handleClick}
			>
				Enhetshistorikk
			</Button>

			<Modal ref={ref} header={{ heading: "Enhetshistorikk" }}>
				<Modal.Body>
					{data && !isEmpty(data) && (
						<Table zebraStripes>
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeader>Type</Table.ColumnHeader>
									<Table.ColumnHeader>Dato fom</Table.ColumnHeader>
									<Table.ColumnHeader>Enhet</Table.ColumnHeader>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{data.map((enhet: Enhet) => (
									<Table.Row key={btoa(JSON.stringify(enhet))}>
										<Table.DataCell>{enhet.typeEnhet}</Table.DataCell>
										<Table.DataCell>{formatDate(enhet.datoFom)}</Table.DataCell>
										<Table.DataCell>{enhet.enhet}</Table.DataCell>
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
										Det fins ingen enhetshistorikk for dette oppdraget.
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
