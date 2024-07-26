import { Heading } from "@navikt/ds-react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import TrefflisteParameters from "../components/treffliste/TrefflisteParameters";
import TrefflisteTable from "../components/treffliste/TrefflisteTable";
import commonstyles from "../styles/common-styles.module.css";
import { isEmpty } from "../util/commonUtil";
import styles from "./TrefflistePage.module.css";
import { useAppState } from "../store/AppState";
import { useEffect } from "react";
import { BASENAME } from "../util/constant";
import RestService from "../api/rest-service";
import { redirect } from "react-router-dom";

const TrefflistePage = () => {
  const { gjelderId, faggruppeVisningText, oppdragsEgenskaper } = useAppState.getState();
  const { gjelderNavn, setGjelderNavn } = useAppState(state => ({
    gjelderNavn: state.gjelderNavn,
    setGjelderNavn: state.setGjelderNavn
  }));

  useEffect(() => {
    if (!gjelderId) redirect(BASENAME);

    if (oppdragsEgenskaper === undefined || isEmpty(oppdragsEgenskaper)) redirect(BASENAME);

    if (gjelderNavn === "") {
      RestService.useHentNavn({ gjelderId: gjelderId }).then(response => {
        setGjelderNavn(response.navn);
      });
    }
  }, []);

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
              faggruppe={faggruppeVisningText}
            />
          </div>
        </div>
        {!oppdragsEgenskaper || !isEmpty(oppdragsEgenskaper) && (
          <TrefflisteTable oppdragsEgenskaper={oppdragsEgenskaper!} />
        )}
      </div>
    </>
  );
};

export default TrefflistePage;
