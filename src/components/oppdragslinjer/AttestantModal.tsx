import { useRef, useState } from "react";
import { Button, Modal, Table } from "@navikt/ds-react";
import { Attestant } from "../../types/Attestant";
import RestService from "../../api/rest-service";
import { isEmpty } from "../../util/commonUtil";

const AttestantModal = ({
                          oppdragsId,
                          linjeId,
                          text
                        }: {
  oppdragsId: string;
  linjeId: string;
  text: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDialogElement>(null);
  const { data } = RestService.useFetchHentAttestanter(oppdragsId, linjeId, isOpen);

  const handleClick = () => {
    setIsOpen(true);
    ref.current?.showModal();
  };

  return (
    <div>
      <Button
        variant={"tertiary"}
        size="xsmall"
        onClick={handleClick}>
        {text}
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
              {data && !isEmpty(data) && data?.map((attestant: Attestant) => (
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
};

export default AttestantModal;
