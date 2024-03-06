import { useRef, useState } from "react";
import RestService from "../services/rest-service";
import { Button, Modal, Table } from "@navikt/ds-react";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../util/commonUtils";
import { Maksdato } from "../models/Maksdato";

const MaksdatoerVisning = ({ oppdragsid, linjeid }: { oppdragsid: string; linjeid: string }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [data] = RestService.useFetchMaksdato(oppdragsid, linjeid, shouldFetch);
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        onClick={() => {
          setShouldFetch(true);
          ref.current?.showModal();
        }}
      >
        Maksdato
      </Button>

      <Modal ref={ref} header={{ heading: "Maksdato" }}>
        <Modal.Body>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"linjeId"} scope="col">
                  linjeId
                </Table.HeaderCell>
                <Table.HeaderCell key={"maksdato"} scope="col">
                  maksdato
                </Table.HeaderCell>
                <Table.HeaderCell key={"datoFom"} scope="col">
                  datoFom
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
                data?.map((maksdato: Maksdato) => (
                  <Table.Row key={btoa(maksdato.linjeId + maksdato.maksdato)}>
                    <Table.DataCell>{maksdato.linjeId}</Table.DataCell>
                    <Table.DataCell>{maksdato.maksdato}</Table.DataCell>
                    <Table.DataCell>{maksdato.datoFom}</Table.DataCell>
                    <Table.DataCell>{maksdato.tidspktReg}</Table.DataCell>
                    <Table.DataCell>{maksdato.brukerid}</Table.DataCell>
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

export default MaksdatoerVisning;
