import { useRef } from "react";
import { Button, Modal, Table } from "@navikt/ds-react";
import { Attestant } from "../../models/Attestant";
import RestService from "../../services/rest-service";
import { isEmpty } from "../../util/commonUtils";

const AttestantModal = ({
  oppdragsid,
  linjeid,
  text,
}: {
  oppdragsid: string;
  linjeid: string;
  text: string;
}) => {
  const [data] = RestService.useFetchAttestant(oppdragsid, linjeid);
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        variant={"tertiary"}
        size="xsmall"
        onClick={() => {
          ref.current?.showModal();
        }}
      >
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
                  children={"ugyldigFom"}
                />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data &&
                Array.isArray(data) &&
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
};

export default AttestantModal;
