import { Loader, Table } from "@navikt/ds-react";
import RestService from "../services/rest-service";
import EnhetshistorikkVisning from "../components/oppdragsdetaljer/EnhetshistorikkVisning";
import StatushistorikkVisning from "../components/oppdragsdetaljer/StatushistorikkVisning";
import OmposteringerVisning from "../components/oppdragsdetaljer/OmposteringerVisning";
import styles from "./Oppdragsdetaljer.module.css";
import AttestantVisning from "../components/oppdragsdetaljer/AttestantVisning";
import StatuserVisning from "../components/oppdragsdetaljer/StatuserVisning";
import commonstyles from "../util/common-styles.module.css";
import { Oppdragslinje } from "../models/Oppdragslinje";
import LabelText from "../components/common/LabelText";
import { ChevronLeftIcon } from "@navikt/aksel-icons";
import { Link, useParams } from "react-router-dom";
import { isEmpty, retrieveId } from "../util/commonUtils";
import { isArray } from "@grafana/faro-web-sdk";
import { BASENAME } from "../util/constants";

type OppdragsdetaljerParams = {
  oppdragsID: string;
};
const OppdragsdetaljerPage = () => {
  const { oppdragsID = "" } = useParams<OppdragsdetaljerParams>();
  const gjelderId = retrieveId();
  const { treffliste } = RestService.useFetchTreffliste(gjelderId);
  const { oppdrag: oppdragsdetaljer, isLoading } = RestService.useFetchOppdrag(gjelderId, oppdragsID);

  const oppdrag =
    isArray(treffliste) && !isEmpty(treffliste) && !isEmpty(treffliste[0].oppdragsListe)
      ? treffliste
          .reduce((a) => a)
          .oppdragsListe.filter((o) => o.oppdragsId + "" === oppdragsID)
          .reduce((a) => a)
      : null;

  if (!gjelderId) window.location.replace(BASENAME);

  return (
    <>
      {isLoading && (
        <div className={commonstyles.contentloader}>
          <Loader size="3xlarge" title="Laster oppdragsdetaljer..." />
        </div>
      )}
      {!isLoading && oppdragsdetaljer && (
        <div>
          <div className={commonstyles.knapperad__right}>
            <Link to={"/treffliste"}>
              <div className={commonstyles.singlerow}>
                <ChevronLeftIcon /> Treffliste
              </div>
            </Link>
            <EnhetshistorikkVisning id={oppdragsID} />
            {gjelderId && (
              <OmposteringerVisning enabled={oppdragsdetaljer.harOmposteringer} gjelderId={gjelderId} id={oppdragsID} />
            )}
            <StatushistorikkVisning id={oppdragsID} />
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
                <Table.HeaderCell key={"linjeid"} scope="col" children={"Linje-ID"} />
                <Table.HeaderCell key={"Kodeklasse"} scope="col" children={"Kodeklasse"} />
                <Table.HeaderCell key={"Dato Vedtak FOM"} scope="col" children={"Dato Vedtak FOM"} />
                <Table.HeaderCell key={"Dato Vedtak TOM"} scope="col" children={"Dato Vedtak TOM"} />
                <Table.HeaderCell key={"Sats"} scope="col" children={"Sats"} />
                <Table.HeaderCell key={"Type sats"} scope="col" children={"Type sats"} />
                <Table.HeaderCell key={"Status"} scope="col" children={"Status"} />
                <Table.HeaderCell key={"Dato Fom"} scope="col" children={"Dato Fom"} />
                <Table.HeaderCell key={"LinjeIdKorr"} scope="col" children={"LinjeIdKorr"} />
                <Table.HeaderCell key={"Attestert"} scope="col" children={"Attestert"} />
                <Table.HeaderCell key={"tidspktReg"} scope="col" children={"tidspktReg"} />
                <Table.HeaderCell key={"Detaljer"} scope="col" children={"Detaljer"} />
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
                    <StatuserVisning tekst={linje.kodeStatus} oppdragsid={oppdragsID} linjeid={linje.linjeId} />
                  </Table.DataCell>
                  <Table.DataCell>{linje.datoFom}</Table.DataCell>
                  <Table.DataCell>{linje.linjeIdKorr}</Table.DataCell>
                  <Table.DataCell>
                    <AttestantVisning tekst={linje.attestert} oppdragsid={oppdragsID} linjeid={linje.linjeId} />
                  </Table.DataCell>
                  <Table.DataCell>{linje.tidspktReg}</Table.DataCell>
                  <Table.DataCell>
                    <Link to={`/${oppdragsID}/${linje.linjeId}`}>Detaljer...</Link>
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
