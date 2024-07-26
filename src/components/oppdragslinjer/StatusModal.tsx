import { useRef, useState } from "react";
import { Button, Modal, Table } from "@navikt/ds-react";
import { Status } from "../../types/Status";
import RestService from "../../api/rest-service";
import { isEmpty } from "../../util/commonUtil";

const StatusModal = ({
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
  const { data } = RestService.useFetchHentOppdragsLinjeStatuser(oppdragsId, linjeId, isOpen);

  const handleClick = () => {
    setIsOpen(true);
    ref.current?.showModal();
  };

  return (
    <div>
      <Button
        size="xsmall"
        variant={"tertiary"}
        onClick={handleClick}
      >
        {text}
      </Button>

      <Modal ref={ref} header={{ heading: "Status" }}>
        <Modal.Body>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  key={"status"}
                  scope="col"
                  children={"Status"}
                />
                <Table.HeaderCell
                  key={"datoFom"}
                  scope="col"
                  children={"Dato Fom"}
                />
                <Table.HeaderCell
                  key={"tidspktReg"}
                  scope="col"
                  children={"Tidspkt Reg"}
                />
                <Table.HeaderCell
                  key={"brukerid"}
                  scope="col"
                  children={"Bruker-ID"}
                />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data && !isEmpty(data) &&
                data?.map((status: Status) => (
                  <Table.Row key={btoa(status.status + status.tidspktReg)}>
                    <Table.DataCell>{status.status}</Table.DataCell>
                    <Table.DataCell>{status.datoFom}</Table.DataCell>
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

export default StatusModal;
