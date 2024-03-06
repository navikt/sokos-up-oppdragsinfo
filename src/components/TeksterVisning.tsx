import { useRef, useState } from "react";
import RestService from "../services/rest-service";
import { Button, Modal, Table } from "@navikt/ds-react";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../util/commonUtils";
import { Tekst } from "../models/Tekst";

const TeksterVisning = ({
  oppdragsid,
  linjeid,
  enabled,
}: {
  oppdragsid: string;
  linjeid: string;
  enabled: boolean;
}) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [data] = RestService.useFetchTekster(oppdragsid, linjeid, shouldFetch);
  const ref = useRef<HTMLDialogElement>(null);

  const fetchShowModal = () => {
    setShouldFetch(true);
    ref.current?.showModal();
  };

  return (
    <div>
      <Button disabled={!enabled} onClick={fetchShowModal}>
        Tekst
      </Button>

      <Modal ref={ref} header={{ heading: "Tekst" }}>
        <Modal.Body>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"linjeId"} scope="col">
                  linjeId
                </Table.HeaderCell>
                <Table.HeaderCell key={"tekst"} scope="col">
                  tekst
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data &&
                isArray(data) &&
                !isEmpty(data) &&
                data.map((tekst: Tekst) => (
                  <Table.Row key={btoa(tekst.linjeId)}>
                    <Table.DataCell>{tekst.linjeId}</Table.DataCell>
                    <Table.DataCell>{tekst.tekst}</Table.DataCell>
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

export default TeksterVisning;
