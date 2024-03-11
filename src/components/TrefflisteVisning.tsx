import { Button, Table } from "@navikt/ds-react";
import styles from "./TrefflisteVisning.module.css";
import { Treff, Treffliste } from "../models/Treffliste";
import { Oppdrag } from "../models/Oppdrag";
import LabelText from "./util/LabelText";

const TrefflisteVisning = ({
  treffliste,
  handleVelgOppdrag,
}: {
  treffliste: Treffliste;
  handleVelgOppdrag: (oppdrag: Oppdrag) => void;
}) => {
  return (
    <>
      {[
        ...treffliste.map((treff: Treff, index: number) => (
          <div key={btoa(treff.gjelderId + index)} className={styles.treffliste}>
            <LabelText label={"Gjelder navn"} text={treff.gjelderNavn} />
            <LabelText label={"Gjelder id"} text={treff.gjelderId} />

            <Table zebraStripes key={btoa(treff.gjelderNavn + treff.gjelderId)}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell key={"id"} scope="col" children={"Oppdrags-ID"} />
                  <Table.HeaderCell key={"Kjør idag?"} scope="col" children={"Kjør idag?"} />
                  <Table.HeaderCell key={"Fagsystem"} scope="col" children={"Fagsystem"} />
                  <Table.HeaderCell key={"Status"} scope="col" children={"Status"} />
                  <Table.HeaderCell key={"Faggruppe"} scope="col" children={"Faggruppe"} />
                  <Table.HeaderCell key={"Fagområde"} scope="col" children={"Fagområde"} />
                  <Table.HeaderCell key={"Type bilag"} scope="col" children={"Type bilag"} />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {treff.oppdragsListe.map((oppdrag) => (
                  <Table.Row key={btoa("" + oppdrag.oppdragsId)}>
                    <Table.DataCell>
                      <Button variant={"tertiary"} onClick={() => handleVelgOppdrag(oppdrag)}>
                        {oppdrag.oppdragsId}
                      </Button>
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
        )),
      ]}
    </>
  );
};

export default TrefflisteVisning;
