import { useRef, useState } from "react";
import RestService from "../services/rest-service";
import { Button, Modal, Table } from "@navikt/ds-react";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../util/commonUtils";
import { Linjeenhet } from "../models/Linjeenhet";

const LinjeenheterVisning = ({
  oppdragsid,
  linjeid,
  enabled,
}: {
  oppdragsid: string;
  linjeid: string;
  enabled: boolean;
}) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [data] = RestService.useFetchLinjeenheter(oppdragsid, linjeid, shouldFetch);
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
        Enheter
      </Button>

      <Modal ref={ref} header={{ heading: "Enheter" }}>
        <Modal.Body>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"linjeId"} scope="col">
                  linjeId
                </Table.HeaderCell>
                <Table.HeaderCell key={"typeEnhet"} scope="col">
                  typeEnhet
                </Table.HeaderCell>
                <Table.HeaderCell key={"enhet"} scope="col">
                  enhet
                </Table.HeaderCell>
                <Table.HeaderCell key={"datoFom"} scope="col">
                  datoFom
                </Table.HeaderCell>
                <Table.HeaderCell key={"nokkelId"} scope="col">
                  nokkelId
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
                data?.map((linjeenhet: Linjeenhet) => (
                  <Table.Row key={btoa(linjeenhet.linjeId)}>
                    <Table.DataCell>{linjeenhet.linjeId}</Table.DataCell>
                    <Table.DataCell>{linjeenhet.typeEnhet}</Table.DataCell>
                    <Table.DataCell>{linjeenhet.enhet}</Table.DataCell>
                    <Table.DataCell>{linjeenhet.datoFom}</Table.DataCell>
                    <Table.DataCell>{linjeenhet.nokkelId}</Table.DataCell>
                    <Table.DataCell>{linjeenhet.tidspktReg}</Table.DataCell>
                    <Table.DataCell>{linjeenhet.brukerid}</Table.DataCell>
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

export default LinjeenheterVisning;
