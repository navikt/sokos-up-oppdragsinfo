import { Button, Loader, Table } from "@navikt/ds-react";
import RestService from "../services/rest-service";
import EnhetshistorikkVisning from "../components/EnhetshistorikkVisning";
import StatushistorikkVisning from "../components/StatushistorikkVisning";
import OmposteringerVisning from "../components/OmposteringerVisning";
import styles from "./Oppdragsdetaljer.module.css";
import AttestantVisning from "../components/AttestantVisning";
import StatuserVisning from "../components/StatuserVisning";
import commonstyles from "../util/common-styles.module.css";
import { Oppdragslinje } from "../models/Oppdragslinje";
import { Oppdragsdetaljer } from "../models/Oppdragsdetaljer";
import { Oppdrag } from "../models/Oppdrag";
import LabelText from "../components/LabelText";
import { ChevronLeftIcon } from "@navikt/aksel-icons";

type OppdragsdetaljerPageProps = {
  gjelderId: string | undefined;
  oppdrag: Oppdrag;
  handleSetLinjeId: (linjeid: string, linjer: Oppdragslinje[]) => void;
  handleBackButtonClicked: () => void;
};

const OppdragsdetaljerPage = ({
  gjelderId,
  oppdrag,
  handleSetLinjeId,
  handleBackButtonClicked,
}: OppdragsdetaljerPageProps) => {
  const oppdragsid = "" + oppdrag.oppdragsId;
  const {
    oppdrag: oppdragsdetaljer,
    oppdragIsLoading,
  }: {
    oppdrag: Oppdragsdetaljer | undefined;
    oppdragIsLoading: boolean;
  } = RestService.useFetchOppdrag(gjelderId, oppdragsid);

  return (
    <>
      {oppdragIsLoading && <Loader size="3xlarge" title="Straks hold an" />}
      {!oppdragIsLoading && !oppdragsdetaljer && <div>Fant ikke oppdrag</div>}
      {!oppdragIsLoading && oppdragsdetaljer && (
        <div>
          <div className={commonstyles.knapperad__right}>
            <Button icon={<ChevronLeftIcon />} onClick={handleBackButtonClicked}>
              Treffliste
            </Button>
            <EnhetshistorikkVisning id={oppdragsid} />
            {gjelderId && (
              <OmposteringerVisning enabled={oppdragsdetaljer.harOmposteringer} gjelderId={gjelderId} id={oppdragsid} />
            )}
            <StatushistorikkVisning id={oppdragsid} />
          </div>
          <div className={styles.oppdragsdetaljer__toppinfo}>
            {gjelderId && oppdrag && (
              <div className={styles.oppdragsdetaljer__columns}>
                <LabelText label={"Gjelder ID"} text={gjelderId} />
                <LabelText label={"Status"} text={oppdrag.kodeStatus} />
                <LabelText label={"Fagområde"} text={oppdrag.navnFagOmraade} />
                <LabelText label={"Fagsystem ID"} text={oppdrag.fagsystemId} />
                <LabelText label={"Beregnes nå"} text={oppdrag.kjorIdag} />
                <LabelText label={"Oppdrags ID"} text={oppdrag.oppdragsId} />
              </div>
            )}
            {gjelderId && oppdragsdetaljer.behandlendeEnhet && (
              <div className={styles.oppdragsdetaljer__enhet}>
                <LabelText label={"Enhetstype"} text={oppdragsdetaljer.behandlendeEnhet.type} />
                <LabelText label={"Dato fom"} text={oppdragsdetaljer.behandlendeEnhet.datoFom} />
                <LabelText label={"Enhetsnr"} text={oppdragsdetaljer.behandlendeEnhet.enhet} />
              </div>
            )}
          </div>

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
              {oppdragsdetaljer?.oppdragsLinjer.map((linje: Oppdragslinje) => (
                <Table.Row key={btoa("" + linje.linjeId)}>
                  <Table.DataCell>{linje.linjeId}</Table.DataCell>
                  <Table.DataCell>{linje.kodeKlasse}</Table.DataCell>
                  <Table.DataCell>{linje.datoVedtakFom}</Table.DataCell>
                  <Table.DataCell>{linje.datoVedtakTom}</Table.DataCell>
                  <Table.DataCell>{linje.sats}</Table.DataCell>
                  <Table.DataCell>{linje.typeSats}</Table.DataCell>
                  <Table.DataCell>
                    <StatuserVisning tekst={linje.kodeStatus} oppdragsid={oppdragsid} linjeid={linje.linjeId} />
                  </Table.DataCell>
                  <Table.DataCell>{linje.datoFom}</Table.DataCell>
                  <Table.DataCell>{linje.linjeIdKorr}</Table.DataCell>
                  <Table.DataCell>
                    <AttestantVisning tekst={linje.attestert} oppdragsid={oppdragsid} linjeid={linje.linjeId} />
                  </Table.DataCell>
                  <Table.DataCell>{linje.tidspktReg}</Table.DataCell>
                  <Table.DataCell>
                    <Button onClick={() => handleSetLinjeId("" + linje.linjeId, oppdragsdetaljer.oppdragsLinjer)}>
                      Detaljer...
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
