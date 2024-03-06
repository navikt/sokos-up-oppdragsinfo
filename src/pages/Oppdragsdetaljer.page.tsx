import { Button, Loader, Table } from "@navikt/ds-react";
import RestService from "../services/rest-service";
import EnhetshistorikkVisning from "../components/EnhetshistorikkVisning";
import StatushistorikkVisning from "../components/StatushistorikkVisning";
import OmposteringerVisning from "../components/OmposteringerVisning";
import styles from "./SokAndTreffliste.module.css";
import AttestantVisning from "../components/AttestantVisning";
import StatuserVisning from "../components/StatuserVisning";
import commonstyles from "../util/common-styles.module.css";
import { Oppdragslinje } from "../models/Oppdragslinje";

const OppdragsdetaljerPage = ({
  gjelderId,
  id,
  handleSetLinjeId,
}: {
  gjelderId: string | undefined;
  id: string;
  handleSetLinjeId: (linjeid: string, linjer: Oppdragslinje[]) => void;
}) => {
  const { oppdrag, oppdragIsLoading } = RestService.useFetchOppdrag(gjelderId, id);

  return (
    <>
      {oppdragIsLoading && <Loader size="3xlarge" title="Straks hold an" />}
      {!oppdrag && <div>Fant ikke oppdrag</div>}
      {!oppdragIsLoading && oppdrag && (
        <div className={styles.treffliste}>
          <div className={commonstyles.knapperad}>
            <EnhetshistorikkVisning id={id} />
            {gjelderId && <OmposteringerVisning gjelderId={gjelderId} id={id} />}
            <StatushistorikkVisning id={id} />
          </div>
          {oppdrag?.enhet && <p>{"Enhet : " + oppdrag?.enhet?.enhet}</p>}
          {oppdrag?.behandlendeEnhet && <p>{"Behandlende: " + oppdrag?.behandlendeEnhet?.enhet}</p>}
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"linjeid"} scope="col">
                  Linje-ID
                </Table.HeaderCell>
                <Table.HeaderCell key={"kodeklasse"} scope="col">
                  Kodeklasse
                </Table.HeaderCell>
                <Table.HeaderCell key={"datovedtakfom"} scope="col">
                  Dato Vedtak FOM
                </Table.HeaderCell>
                <Table.HeaderCell key={"datovedtaktom"} scope="col">
                  Dato Vedtak TOM
                </Table.HeaderCell>
                <Table.HeaderCell key={"sats"} scope="col">
                  Sats
                </Table.HeaderCell>
                <Table.HeaderCell key={"typesats"} scope="col">
                  Type sats
                </Table.HeaderCell>
                <Table.HeaderCell key={"status"} scope="col">
                  Status
                </Table.HeaderCell>
                <Table.HeaderCell key={"DatoFOM"} scope="col">
                  Dato Fom
                </Table.HeaderCell>
                <Table.HeaderCell key={"linjeIdKorr"} scope="col">
                  LinjeIdKorr
                </Table.HeaderCell>
                <Table.HeaderCell key={"Attestert"} scope="col">
                  Attestert
                </Table.HeaderCell>
                <Table.HeaderCell key={"tidspktReg"} scope="col">
                  tidspktReg
                </Table.HeaderCell>
                <Table.HeaderCell key={"detaljer"} scope="col">
                  Detaljer
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {oppdrag?.oppdragsLinjer.map((linje) => (
                <Table.Row key={btoa("" + linje.linjeId)}>
                  <Table.DataCell>{linje.linjeId}</Table.DataCell>
                  <Table.DataCell>{linje.kodeKlasse}</Table.DataCell>
                  <Table.DataCell>{linje.datoVedtakFom}</Table.DataCell>
                  <Table.DataCell>{linje.datoVedtakTom}</Table.DataCell>
                  <Table.DataCell>{linje.sats}</Table.DataCell>
                  <Table.DataCell>{linje.typeSats}</Table.DataCell>
                  <Table.DataCell>
                    <StatuserVisning tekst={linje.kodeStatus} oppdragsid={id} linjeid={linje.linjeId} />
                  </Table.DataCell>
                  <Table.DataCell>{linje.datoFom}</Table.DataCell>
                  <Table.DataCell>{linje.linjeIdKorr}</Table.DataCell>
                  <Table.DataCell>
                    <AttestantVisning tekst={linje.attestert} oppdragsid={id} linjeid={linje.linjeId} />
                  </Table.DataCell>
                  <Table.DataCell>{linje.tidspktReg}</Table.DataCell>
                  <Table.DataCell>
                    <Button onClick={() => handleSetLinjeId("" + linje.linjeId, oppdrag.oppdragsLinjer)}>
                      Detaljer
                    </Button>
                  </Table.DataCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  );
};
export default OppdragsdetaljerPage;
