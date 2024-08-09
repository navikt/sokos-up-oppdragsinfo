import { useRef, useState } from "react";
import { Alert, Button, Modal, Table } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import { OppdragsId } from "../../types/OppdragsId";
import { OppdragsStatus } from "../../types/OppdragsStatus";
import { isEmpty } from "../../util/commonUtil";

export default function StatushistorikkModal(props: OppdragsId) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDialogElement>(null);
  const { data } = apiService.useFetchHentOppdragsStatushistorikk(
    props.oppdragsId,
    isOpen,
  );

  const handleClick = () => {
    setIsOpen(true);
    ref.current?.showModal();
  };

  return (
    <div>
      <Button size="small" variant="secondary-neutral" onClick={handleClick}>
        Statushistorikk
      </Button>

      <Modal ref={ref} header={{ heading: "Statushistorikk" }} width={"500px"}>
        <Modal.Body>
          {data && !isEmpty(data) && (
            <Table zebraStripes>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                  <Table.HeaderCell scope="col">
                    Tidspunkt registrert
                  </Table.HeaderCell>
                  <Table.HeaderCell scope="col">Bruker ID</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.map((status: OppdragsStatus) => (
                  <Table.Row key={btoa(status.kodeStatus)}>
                    <Table.DataCell>{status.kodeStatus}</Table.DataCell>
                    <Table.DataCell>{status.tidspktReg}</Table.DataCell>
                    <Table.DataCell>{status.brukerid}</Table.DataCell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
          {!data ||
            (isEmpty(data) && (
              <Alert variant="info">
                Det fins ingen statushistorikk for dette oppdraget.
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
