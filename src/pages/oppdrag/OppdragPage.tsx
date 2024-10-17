import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { Heading } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/common-styles.module.css";
import { isEmpty } from "../../util/commonUtil";
import { BASENAME } from "../../util/constant";
import OppdragEgenskapPanel from "./OppdragEgenskapPanel";
import styles from "./OppdragPage.module.css";
import OppdragTable from "./OppdragTable";

export default function OppdragPage() {
  const { gjelderId, fagGruppeVisningText, oppdragsListe } =
    useStore.getState();
  const { gjelderNavn, setGjelderNavn } = useStore((state) => ({
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
            <OppdragEgenskapPanel
              gjelderId={gjelderId}
              navn={gjelderNavn}
              faggruppe={fagGruppeVisningText}
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
