import { Oppdragsdetaljer } from "../models/OppdragsinfoData";
import styles from "../components/TrefflisteVisning.module.css";
import { Table } from "@navikt/ds-react";

const OppdragsdetaljerPage = ({ oppdrag }: { oppdrag: Oppdragsdetaljer }) => {
  return (
    <div className={styles.treffliste}>
      <p>{"Enhet: " + oppdrag.enhet.enhet}</p>
      <p>{"Behandlende: " + oppdrag.behandlendeEnhet.enhet}</p>
      <Table zebraStripes key={"k"}>
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
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {oppdrag.oppdragsLinjer.map((linje) => (
            <Table.Row key={btoa("" + linje.linjeId)}>
              <Table.DataCell>{linje.linjeId}</Table.DataCell>
              <Table.DataCell>{linje.kodeKlasse}</Table.DataCell>
              <Table.DataCell>{linje.datoVedtakFom}</Table.DataCell>
              <Table.DataCell>{linje.sats}</Table.DataCell>
              <Table.DataCell>{linje.typeSats}</Table.DataCell>
              <Table.DataCell>{linje.kodeStatus}</Table.DataCell>
              <Table.DataCell>{linje.datoFom}</Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
export default OppdragsdetaljerPage;
