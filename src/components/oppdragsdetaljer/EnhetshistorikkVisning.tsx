import { useRef } from "react";
import { Button, Modal, Table } from "@navikt/ds-react";
import RestService from "../../services/rest-service";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../../util/commonUtils";
import { Enhet } from "../../models/Enhet";

const EnhetshistorikkVisning = ({ id }: { id: string }) => {
  const [data] = RestService.useFetchEnhetshistorikk(id);
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        variant="secondary-neutral"
        onClick={() => {
          ref.current?.showModal();
        }}
      >
        Enhetshistorikk
      </Button>

      <Modal ref={ref} header={{ heading: "Enhetshistorikk" }}>
        <Modal.Body>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"type"} scope="col" children={"type"} />
                <Table.HeaderCell key={"datoFom"} scope="col" children={"datoFom"} />
                <Table.HeaderCell key={"enhet"} scope="col" children={"enhet"} />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data &&
                isArray(data) &&
                !isEmpty(data) &&
                data?.map((enhet: Enhet) => (
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

export default EnhetshistorikkVisning;
