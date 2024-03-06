import { useRef, useState } from "react";
import RestService from "../services/rest-service";
import { Button, Modal, Table } from "@navikt/ds-react";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../util/commonUtils";
import { Valuta } from "../models/Valuta";

const ValutaerVisning = ({
  oppdragsid,
  linjeid,
  enabled,
}: {
  oppdragsid: string;
  linjeid: string;
  enabled: boolean;
}) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [data] = RestService.useFetchValuta(oppdragsid, linjeid, shouldFetch);
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
        Valuta
      </Button>

      <Modal ref={ref} header={{ heading: "Valuta" }}>
        <Modal.Body>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"linjeId"} scope="col">
                  linjeId
                </Table.HeaderCell>
                <Table.HeaderCell key={"type"} scope="col">
                  type
                </Table.HeaderCell>
                <Table.HeaderCell key={"datoFom"} scope="col">
                  datoFom
                </Table.HeaderCell>
                <Table.HeaderCell key={"nokkelId"} scope="col">
                  nokkelId
                </Table.HeaderCell>
                <Table.HeaderCell key={"valuta"} scope="col">
                  valuta
                </Table.HeaderCell>
                <Table.HeaderCell key={"feilreg"} scope="col">
                  feilreg
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
                data?.map((valuta: Valuta) => (
                  <Table.Row key={btoa(valuta.linjeId + valuta.nokkelId)}>
                    <Table.DataCell>{valuta.linjeId}</Table.DataCell>
                    <Table.DataCell>{valuta.type}</Table.DataCell>
                    <Table.DataCell>{valuta.datoFom}</Table.DataCell>
                    <Table.DataCell>{valuta.nokkelId}</Table.DataCell>
                    <Table.DataCell>{valuta.valuta}</Table.DataCell>
                    <Table.DataCell>{valuta.feilreg}</Table.DataCell>
                    <Table.DataCell>{valuta.tidspktReg}</Table.DataCell>
                    <Table.DataCell>{valuta.brukerid}</Table.DataCell>
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

export default ValutaerVisning;
