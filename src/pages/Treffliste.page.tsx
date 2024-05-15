import { useEffect } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import ContentLoader from "../components/common/ContentLoader";
import SokekriterierVisning from "../components/treffliste/SokekriterierVisning";
import TrefflisteTable from "../components/treffliste/TrefflisteTable";
import RestService from "../services/rest-service";
import {
  anyOppdragExists,
  firstOf,
  isEmpty,
  retrieveFaggruppe,
  retrieveId,
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

  const gjelderNavn =
    !!treffliste && !isEmpty(treffliste)
      ? firstOf(treffliste)?.gjelderNavn
      : "";
  const faggruppeNavn = retrieveFaggruppe()?.navn;

  return (
    <>
      <div className={styles.treffliste}>
        <div className={styles.treffliste__top}>
          <Breadcrumbs searchLink treffliste />

          <div className={styles.treffliste__heading}>
            <h1>Treffliste</h1>
            <SokekriterierVisning
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
