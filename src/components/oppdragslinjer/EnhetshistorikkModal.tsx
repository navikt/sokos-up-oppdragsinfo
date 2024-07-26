import { useRef, useState } from "react";
import { Button, Modal, Table } from "@navikt/ds-react";
import { EnhetsType } from "../../types/EnhetsType";
import RestService from "../../api/rest-service";
import { isEmpty } from "../../util/commonUtil";

const EnhetshistorikkModal = ({ oppdragsId }: { oppdragsId: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDialogElement>(null);
  const { data } = RestService.useFetchHentOppdragsEnhethistorikk(oppdragsId, isOpen);

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
        Enhetshistorikk
      </Button>

      <Modal ref={ref} header={{ heading: "Enhetshistorikk" }}>
        <Modal.Body>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"type"} scope="col" children={"type"} />
                <Table.HeaderCell
                  key={"datoFom"}
                  scope="col"
                  children={"datoFom"}
                />
                <Table.HeaderCell
                  key={"enhet"}
                  scope="col"
                  children={"enhet"}
                />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data &&
                Array.isArray(data) &&
                !isEmpty(data) &&
                data?.map((enhet: EnhetsType) => (
                  <Table.Row key={btoa(JSON.stringify(enhet))}>
                    <Table.DataCell>{enhet.type}</Table.DataCell>
                    <Table.DataCell>{enhet.datoFom}</Table.DataCell>
                    <Table.DataCell>{enhet.enhet}</Table.DataCell>
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

export default EnhetshistorikkModal;
