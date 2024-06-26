import { useRef } from "react";
import { Button, Modal, Table } from "@navikt/ds-react";
import { StatushistorikkStatus } from "../../models/StatushistorikkStatus";
import RestService from "../../services/rest-service";
import { isEmpty } from "../../util/commonUtils";

const StatushistorikkModal = ({ id }: { id: string }) => {
  const [data] = RestService.useFetchStatushistorikk(id);
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        variant="secondary-neutral"
        onClick={() => {
          ref.current?.showModal();
        }}
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
              {data &&
                Array.isArray(data) &&
                !isEmpty(data) &&
                data?.map((status: StatushistorikkStatus) => (
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
