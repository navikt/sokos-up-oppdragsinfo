import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { Heading } from "@navikt/ds-react";
import apiService from "../api/apiService";
import Breadcrumbs from "../components/common/Breadcrumbs";
import OppdragTable from "../components/oppdrag/OppdragTable";
import OppdragsEgenskapPanel from "../components/oppdrag/OppdragsEgenskapPanel";
import { useAppState } from "../store/AppState";
import commonstyles from "../styles/common-styles.module.css";
import { isEmpty } from "../util/commonUtil";
import { BASENAME } from "../util/constant";
import styles from "./OppdragPage.module.css";

export default function OppdragPage() {
  const { gjelderId, faggruppeVisningText, oppdragsListe } =
    useAppState.getState();
  const { gjelderNavn, setGjelderNavn } = useAppState((state) => ({
    gjelderNavn: state.gjelderNavn,
    setGjelderNavn: state.setGjelderNavn,
  }));

  useEffect(() => {
    if (!gjelderId) redirect(BASENAME);

    if (oppdragsListe === undefined || isEmpty(oppdragsListe))
      redirect(BASENAME);

    if (gjelderNavn === "") {
      apiService.useHentNavn({ gjelderId: gjelderId }).then((response) => {
        setGjelderNavn(response.navn);
      });
    }
  }, [gjelderId, gjelderNavn, oppdragsListe, setGjelderNavn]);

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large">
          Oppdragsinfo
        </Heading>
      </div>
      <div className={styles.oppdrag}>
        <div className={styles.oppdrag__top}>
          <Breadcrumbs searchLink treffliste />

          <div className={styles.oppdrag__top_info}>
            <OppdragsEgenskapPanel
              gjelderId={gjelderId}
              navn={gjelderNavn}
              faggruppe={faggruppeVisningText}
            />
          </div>
        </div>
        {!oppdragsListe ||
          (!isEmpty(oppdragsListe) && (
            <OppdragTable oppdragsListe={oppdragsListe!} />
          ))}
      </div>
    </>
  );
}
