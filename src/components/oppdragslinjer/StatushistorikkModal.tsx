import { useRef, useState } from "react";
import { Button, Modal, Table } from "@navikt/ds-react";
import { OppdragsStatus } from "../../types/OppdragsStatus";
import RestService from "../../api/rest-service";
import { isEmpty } from "../../util/commonUtil";

const StatushistorikkModal = ({ oppdragsId }: { oppdragsId: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDialogElement>(null);
  const { data } = RestService.useFetchHentOppdragsStatushistorikk(oppdragsId, isOpen);

  const handleClick = () => {
    setIsOpen(true);
    ref.current?.showModal();
  };

  return (
    <div>
      <Button
        variant="secondary-neutral"
        onClick={handleClick}
      >
        Statushistorikk
      </Button>

      <Modal ref={ref} header={{ heading: "Statushistorikk" }}>
        <Modal.Body>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  key={"kodeStatus"}
                  scope="col"
                  children={"kodeStatus"}
                />
                <Table.HeaderCell
                  key={"tidspktReg"}
                  scope="col"
                  children={"tidspktReg"}
                />
                <Table.HeaderCell
                  key={"brukerid"}
                  scope="col"
                  children={"brukerid"}
                />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data && !isEmpty(data) &&
                data?.map((status: OppdragsStatus) => (
                  <Table.Row key={btoa(status.kodeStatus)}>
                    <Table.DataCell>{status.kodeStatus}</Table.DataCell>
                    <Table.DataCell>{status.tidspktReg}</Table.DataCell>
                    <Table.DataCell>{status.brukerid}</Table.DataCell>
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

export default StatushistorikkModal;
