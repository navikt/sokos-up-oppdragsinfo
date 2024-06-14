import { useEffect } from "react";
import { Heading } from "@navikt/ds-react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import ContentLoader from "../components/common/ContentLoader";
import TrefflisteParameters from "../components/treffliste/TrefflisteParameters";
import TrefflisteTable from "../components/treffliste/TrefflisteTable";
import RestService from "../services/rest-service";
import commonstyles from "../util/common-styles.module.css";
import {
  anyOppdragExists,
  firstOf,
  retrieveFaggruppe,
  retrieveId,
  retrieveNavn,
} from "../util/commonUtils";
import { BASENAME } from "../util/constants";
import styles from "./Treffliste.module.css";

const TrefflistePage = () => {
  const gjelderId = retrieveId();
  const { treffliste, trefflisteIsLoading } =
    RestService.useFetchTreffliste(gjelderId);

  useEffect(() => {
    if (!gjelderId) window.location.replace(BASENAME);

    if (trefflisteIsLoading) return;
    if (anyOppdragExists(treffliste)) return;

    window.location.replace(BASENAME);
  }, [treffliste, trefflisteIsLoading, gjelderId]);

  const gjelderNavn = retrieveNavn();
  const faggruppeNavn = retrieveFaggruppe()?.navn;

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large">
          Oppdragsinfo
        </Heading>
      </div>
      <div className={styles.treffliste}>
        <div className={styles.treffliste__top}>
          <Breadcrumbs searchLink treffliste />

          <div className={styles.treffliste__top_info}>
            <Heading level="2" size="medium">
              Treffliste
            </Heading>
            <TrefflisteParameters
              gjelderId={gjelderId}
              navn={gjelderNavn}
              faggruppe={faggruppeNavn}
            />
          </div>
        </div>
        {trefflisteIsLoading && <ContentLoader />}
        {!trefflisteIsLoading && anyOppdragExists(treffliste) && (
          <TrefflisteTable treff={firstOf(treffliste)} />
        )}
      </div>
    </>
  );
};

export default TrefflistePage;
