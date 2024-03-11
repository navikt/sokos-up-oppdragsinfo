import { useRef, useState } from "react";
import { Button, Modal, Table } from "@navikt/ds-react";
import RestService from "../../services/rest-service";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../../util/commonUtils";
import { Ompostering } from "../../models/Ompostering";
import ContentLoader from "../util/ContentLoader";

const OmposteringerVisning = ({ gjelderId, id, enabled }: { gjelderId: string; id: string; enabled: boolean }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [data] = RestService.useFetchOmposteringer(gjelderId, id, shouldFetch);
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
        Omposteringer
      </Button>

      <Modal ref={ref} header={{ heading: "Omposteringer" }} width={"2000px"}>
        <Modal.Body>
          {!data ? (
            <ContentLoader />
          ) : (
            <Table zebraStripes>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell key={"id"} scope="col" children={"ID"} />
                  <Table.HeaderCell key={"kodeFaggruppe"} scope="col" children={"kodeFaggruppe"} />
                  <Table.HeaderCell key={"lopenr"} scope="col" children={"lopenr"} />
                  <Table.HeaderCell key={"ompostering"} scope="col" children={"ompostering"} />
                  <Table.HeaderCell key={"omposteringFom"} scope="col" children={"omposteringFom"} />
                  <Table.HeaderCell key={"feilReg"} scope="col" children={"feilReg"} />
                  <Table.HeaderCell key={"beregningsId"} scope="col" children={"beregningsId"} />
                  <Table.HeaderCell key={"utfort"} scope="col" children={"utfort"} />
                  <Table.HeaderCell key={"brukerid"} scope="col" children={"brukerid"} />
                  <Table.HeaderCell key={"tidspktReg"} scope="col" children={"tidspktReg"} />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data &&
                  isArray(data) &&
                  !isEmpty(data) &&
                  data?.map((ompostering: Ompostering) => (
                    <Table.Row key={btoa(ompostering.id + ompostering.ompostering)}>
                      <Table.DataCell>{ompostering.id}</Table.DataCell>
                      <Table.DataCell>{ompostering.kodeFaggruppe}</Table.DataCell>
                      <Table.DataCell>{ompostering.lopenr}</Table.DataCell>
                      <Table.DataCell>{ompostering.ompostering}</Table.DataCell>
                      <Table.DataCell>{ompostering.omposteringFom}</Table.DataCell>
                      <Table.DataCell>{ompostering.feilReg}</Table.DataCell>
                      <Table.DataCell>{ompostering.beregningsId}</Table.DataCell>
                      <Table.DataCell>{ompostering.utfort}</Table.DataCell>
                      <Table.DataCell>{ompostering.brukerid}</Table.DataCell>
                      <Table.DataCell>{ompostering.tidspktReg}</Table.DataCell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          )}
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

export default OmposteringerVisning;
