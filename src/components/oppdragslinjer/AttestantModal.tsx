import { useRef, useState } from "react";
import { Button, Modal, Table } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import { Attestant } from "../../types/Attestant";
import { isEmpty } from "../../util/commonUtil";

interface AttestantModalProps {
  oppdragsId: string;
  linjeId: string;
  text: string;
}

export default function AttestantModal(props: AttestantModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDialogElement>(null);
  const { data } = apiService.useFetchHentAttestanter(
    props.oppdragsId,
    props.linjeId,
    isOpen,
  );

  const handleClick = () => {
    setIsOpen(true);
    ref.current?.showModal();
  };

  return (
    <div>
      <Button variant={"tertiary"} size="xsmall" onClick={handleClick}>
        {props.text}
      </Button>

      <Modal ref={ref} header={{ heading: "Attestant" }}>
        <Modal.Body>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  key={"attestantId"}
                  scope="col"
                  children={"Attestant-ID"}
                />
                <Table.HeaderCell
                  key={"ugyldigFom"}
                  scope="col"
                  children={"Ugyldig Fom"}
                />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data &&
                !isEmpty(data) &&
                data?.map((attestant: Attestant) => (
                  <Table.Row key={btoa(attestant.attestantId)}>
                    <Table.DataCell>{attestant.attestantId}</Table.DataCell>
                    <Table.DataCell>{attestant.ugyldigFom}</Table.DataCell>
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
