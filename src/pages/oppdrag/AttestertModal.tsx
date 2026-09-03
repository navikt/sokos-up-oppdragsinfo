import { Button, Modal, Table } from "@navikt/ds-react";
import { useRef, useState } from "react";
import { useFetchHentAttestanter } from "../../api/apiService";
import type { Attestant } from "../../types/Attestant";
import { formatDate, isEmpty } from "../../util/commonUtil";

interface AttestertModalProps {
	oppdragsId: string;
	linjeId: string;
	text: string;
}

export default function AttestertModal(props: AttestertModalProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const ref = useRef<HTMLDialogElement>(null);
	const { data, mutate } = useFetchHentAttestanter(
		props.oppdragsId,
		props.linjeId,
		isOpen,
	);

	const handleClick = () => {
		setIsOpen(true);
		// SWR-nøkkelen er uendret mellom åpninger av modalen (samme
		// oppdragsId/linjeId), så uten en eksplisitt revalidering her vil
		// modalen fortsette å vise data fra første gang den ble åpnet,
		// selv om attestering har skjedd i mellomtiden.
		mutate();
		ref.current?.showModal();
	};

	return (
		<div>
			<Button variant={"tertiary"} size="xsmall" onClick={handleClick}>
				{props.text}
			</Button>

			<Modal ref={ref} header={{ heading: "Attestert" }}>
				<Modal.Body>
					<Table zebraStripes>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell key={"attestantId"} scope="col">
									Attestert av
								</Table.HeaderCell>
								<Table.HeaderCell key={"ugyldigFom"} scope="col">
									Gyldig tom
								</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{data &&
								!isEmpty(data) &&
								data?.map((attestant: Attestant) => (
									<Table.Row key={btoa(attestant.attestantId)}>
										<Table.DataCell>{attestant.attestantId}</Table.DataCell>
										<Table.DataCell>
											{formatDate(attestant.ugyldigFom)}
										</Table.DataCell>
									</Table.Row>
								))}
						</Table.Body>
					</Table>
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
