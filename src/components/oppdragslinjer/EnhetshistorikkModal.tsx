import { useRef, useState } from "react";
import { Alert, Button, Modal, Table } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import { Enhetstype } from "../../types/Enhetstype";
import { OppdragsId } from "../../types/OppdragsId";
import { isEmpty } from "../../util/commonUtil";

export default function EnhetshistorikkModal(props: OppdragsId) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDialogElement>(null);
  const { data } = apiService.useFetchHentOppdragsEnhethistorikk(
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
        Enhetshistorikk
      </Button>

      <Modal ref={ref} header={{ heading: "Enhetshistorikk" }} width={"500px"}>
        <Modal.Body>
          {data && !isEmpty(data) && (
            <Table zebraStripes>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell scope="col">Type</Table.HeaderCell>
                  <Table.HeaderCell scope="col">Dato FOM</Table.HeaderCell>
                  <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.map((enhet: Enhetstype) => (
                  <Table.Row key={btoa(JSON.stringify(enhet))}>
                    <Table.DataCell>{enhet.type}</Table.DataCell>
                    <Table.DataCell>{enhet.datoFom}</Table.DataCell>
                    <Table.DataCell>{enhet.enhet}</Table.DataCell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
          {!data ||
            (isEmpty(data) && (
              <Alert variant="info">
                Det fins ingen enhetshistorikk for dette oppdraget.
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
