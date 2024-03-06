import { useRef, useState } from "react";
import RestService from "../services/rest-service";
import { Button, Modal, Table } from "@navikt/ds-react";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../util/commonUtils";
import { Grad } from "../models/Grad";

const GraderVisning = ({ oppdragsid, linjeid, enabled }: { oppdragsid: string; linjeid: string; enabled: boolean }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [data] = RestService.useFetchGrad(oppdragsid, linjeid, shouldFetch);
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        disabled={!enabled}
        onClick={() => {
          setShouldFetch(true);
          ref.current?.showModal();
        }}
      >
        Grader
      </Button>

      <Modal ref={ref} header={{ heading: "Grader" }}>
        <Modal.Body>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"linjeId"} scope="col">
                  linjeId
                </Table.HeaderCell>
                <Table.HeaderCell key={"typeGrad"} scope="col">
                  typeGrad
                </Table.HeaderCell>
                <Table.HeaderCell key={"grad"} scope="col">
                  grad
                </Table.HeaderCell>
                <Table.HeaderCell key={"tidspktReg"} scope="col">
                  tidspktReg
                </Table.HeaderCell>
                <Table.HeaderCell key={"brukerid"} scope="col">
                  brukerid
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data &&
                isArray(data) &&
                !isEmpty(data) &&
                data?.map((grad: Grad) => (
                  <Table.Row key={btoa(grad.linjeId)}>
                    <Table.DataCell>{grad.linjeId}</Table.DataCell>
                    <Table.DataCell>{grad.typeGrad}</Table.DataCell>
                    <Table.DataCell>{grad.grad}</Table.DataCell>
                    <Table.DataCell>{grad.tidspktReg}</Table.DataCell>
                    <Table.DataCell>{grad.brukerid}</Table.DataCell>
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

export default GraderVisning;
