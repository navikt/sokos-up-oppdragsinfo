import { useRef, useState } from "react";
import RestService from "../services/rest-service";
import { Button, Modal, Table } from "@navikt/ds-react";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../util/commonUtils";
import { Skyldner } from "../models/Skyldner";

const SkyldnersListVisning = ({
  oppdragsid,
  linjeid,
  enabled,
}: {
  oppdragsid: string;
  linjeid: string;
  enabled: boolean;
}) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [data] = RestService.useFetchSkyldnersList(oppdragsid, linjeid, shouldFetch);
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
        Skyldnere
      </Button>

      <Modal ref={ref} header={{ heading: "Skyldnere" }}>
        <Modal.Body>
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"linjeId"} scope="col">
                  linjeId
                </Table.HeaderCell>
                <Table.HeaderCell key={"skyldnerId"} scope="col">
                  skyldnerId
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
                data?.map((skyldner: Skyldner) => (
                  <Table.Row key={btoa(skyldner.linjeId)}>
                    <Table.DataCell>{skyldner.linjeId}</Table.DataCell>
                    <Table.DataCell>{skyldner.skyldnerId}</Table.DataCell>
                    <Table.DataCell>{skyldner.datoFom}</Table.DataCell>
                    <Table.DataCell>{skyldner.tidspktReg}</Table.DataCell>
                    <Table.DataCell>{skyldner.brukerid}</Table.DataCell>
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

export default SkyldnersListVisning;
