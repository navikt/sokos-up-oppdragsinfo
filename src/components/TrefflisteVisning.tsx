import { Treffliste } from "../models/OppdragsinfoData";
import { Link, Table } from "@navikt/ds-react";
import styles from "./TrefflisteVisning.module.css";

const TrefflisteVisning = ({ treffliste }: { treffliste: Treffliste }) => {
  return (
    <>
      {...treffliste.map((treff) => (
        <div className={styles.treffliste}>
          <p>{"Gjelder navn: " + treff.gjelderNavn}</p>
          <p>{"Gjelder id: " + btoa(treff.gjelderId)}</p>

          <Table zebraStripes key={btoa(treff.gjelderNavn + treff.gjelderId)}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"id"} scope="col">
                  Oppdrags-Id
                </Table.HeaderCell>
                <Table.HeaderCell key={"Kjør"} scope="col">
                  Kjør idag?
                </Table.HeaderCell>
                <Table.HeaderCell key={"Fagsystem"} scope="col">
                  Fagsystem
                </Table.HeaderCell>
                <Table.HeaderCell key={"Status"} scope="col">
                  Status
                </Table.HeaderCell>
                <Table.HeaderCell key={"Faggruppe"} scope="col">
                  Faggruppe
                </Table.HeaderCell>
                <Table.HeaderCell key={"Fagområde"} scope="col">
                  Fagområde
                </Table.HeaderCell>
                <Table.HeaderCell key={"Type"} scope="col">
                  Type bilag
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {treff.oppdragsListe.map((oppdrag) => (
                <Table.Row key={btoa("" + oppdrag.oppdragsId)}>
                  <Table.DataCell>
                    <Link>{oppdrag.oppdragsId}</Link>
                  </Table.DataCell>
                  <Table.DataCell>{oppdrag.kjorIdag}</Table.DataCell>
                  <Table.DataCell>{oppdrag.fagsystemId}</Table.DataCell>
                  <Table.DataCell>{oppdrag.kodeStatus}</Table.DataCell>
                  <Table.DataCell>{oppdrag.navnFagGruppe}</Table.DataCell>
                  <Table.DataCell>{oppdrag.navnFagOmraade}</Table.DataCell>
                  <Table.DataCell>{oppdrag.typeBilag}</Table.DataCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ))}
    </>
  );
};

export default TrefflisteVisning;
