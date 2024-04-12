import Breadcrumbs from "../components/common/Breadcrumbs";
import ContentLoader from "../components/common/ContentLoader";
import RestService from "../services/rest-service";
import SokekriterierVisning from "../components/treffliste/SokekriterierVisning";
import TrefflisteTable from "../components/treffliste/TrefflisteTable";
import styles from "./Treffliste.module.css";
import { BASENAME } from "../util/constants";
import { anyOppdragExists, firstOf, isEmpty, retrieveFaggruppe, retrieveId } from "../util/commonUtils";
import { useEffect } from "react";

const TrefflistePage = () => {
  const gjelderId = retrieveId();
  const { treffliste, trefflisteIsLoading } = RestService.useFetchTreffliste(gjelderId);

  useEffect(() => {
    if (!gjelderId) window.location.replace(BASENAME);

    if (trefflisteIsLoading) return;
    if (anyOppdragExists(treffliste)) return;

    window.location.replace(BASENAME);
  }, [treffliste]);

  const gjelderNavn = !!treffliste && !isEmpty(treffliste) ? firstOf(treffliste)?.gjelderNavn : "";
  const faggruppeNavn = retrieveFaggruppe()?.navn;

  return (
    <>
      <div className={styles.treffliste}>
        <div className={styles.treffliste__top}>
          <Breadcrumbs soklink treffliste />

          <div className={styles.treffliste__heading}>
            <h1>Treffliste</h1>
            <SokekriterierVisning gjelderId={gjelderId} navn={gjelderNavn} faggruppe={faggruppeNavn} />
          </div>
        </div>
        {trefflisteIsLoading && <ContentLoader />}
        {!trefflisteIsLoading && anyOppdragExists(treffliste) && <TrefflisteTable treff={firstOf(treffliste)} />}
      </div>
    </>
  );
};

export default TrefflistePage;
