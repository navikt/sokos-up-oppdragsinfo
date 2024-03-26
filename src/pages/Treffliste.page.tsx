import { anyOppdragExists, firstOf, isEmpty, retrieveFaggruppe, retrieveId } from "../util/commonUtils";
import RestService from "../services/rest-service";
import ContentLoader from "../components/common/ContentLoader";
import Breadcrumbs from "../components/common/Breadcrumbs";
import styles from "./Treffliste.module.css";
import SokekriterierVisning from "../components/treffliste/SokekriterierVisning";
import { BASENAME } from "../util/constants";
import { useEffect } from "react";
import TrefflisteTable from "../components/treffliste/TrefflisteTable";

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
        <Breadcrumbs soklink treffliste />

        <div className={styles.treffliste__heading}>
          <h1>Treffliste</h1>
          <SokekriterierVisning gjelderId={gjelderId} navn={gjelderNavn} faggruppe={faggruppeNavn} />
        </div>
      </div>
      {trefflisteIsLoading && <ContentLoader />}
      {!trefflisteIsLoading && anyOppdragExists(treffliste) && <TrefflisteTable treff={firstOf(treffliste)} />}
    </>
  );
};

export default TrefflistePage;
