import { useRef, useState } from "react";
import { Button, Modal, Table } from "@navikt/ds-react";
import { useFetchHentOppdragsLinjeStatuser } from "../../api/apiService";
import { LinjeStatus } from "../../types/LinjeStatus";
import { formatDate, formatDateTime, isEmpty } from "../../util/commonUtil";

interface StatusModalProps {
  oppdragsId: number;
  linjeId: string;
  text: string;
}

export default function StatusModal(props: StatusModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDialogElement>(null);
  const { data } = useFetchHentOppdragsLinjeStatuser(
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
      <Button size="xsmall" variant={"tertiary"} onClick={handleClick}>
        {props.text}
      </Button>

      <Modal ref={ref} header={{ heading: "Status" }}>
        <Modal.Body>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"status"} scope="col">
                  Status
                </Table.HeaderCell>
                <Table.HeaderCell key={"datoFom"} scope="col">
                  Dato fom
                </Table.HeaderCell>
                <Table.HeaderCell key={"tidspktReg"} scope="col">
                  Registert i Oppdragssystemet
                </Table.HeaderCell>
                <Table.HeaderCell key={"brukerid"} scope="col">
                  Brukerid
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data &&
                !isEmpty(data) &&
                data?.map((status: LinjeStatus) => (
                  <Table.Row key={btoa(status.status + status.tidspktReg)}>
                    <Table.DataCell>{status.status}</Table.DataCell>
                    <Table.DataCell>
                      {formatDate(status.datoFom)}
                    </Table.DataCell>
                    <Table.DataCell>
                      {formatDateTime(status.tidspktReg)}
                    </Table.DataCell>
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
}
