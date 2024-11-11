import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import Breadcrumbs from "../../components/Breadcrumbs";
import LabelText from "../../components/LabelText";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/common-styles.module.css";
import { isEmpty } from "../../util/commonUtil";
import { ROOT } from "../../util/constant";
import styles from "./OppdragPage.module.css";
import OppdragTable from "./OppdragTable";

export default function OppdragPage() {
  const navigate = useNavigate();
  const { gjelderId, fagGruppe, oppdragsListe, gjelderNavn, setGjelderNavn } =
    useStore();

  useEffect(() => {
    if (!gjelderId || oppdragsListe === undefined || isEmpty(oppdragsListe)) {
      navigate(ROOT);
    }

    if (gjelderNavn === "") {
      apiService.useHentNavn({ gjelderId }).then((response) => {
        setGjelderNavn(response.navn);
      });
    }
  }, [navigate, gjelderId, gjelderNavn, oppdragsListe, setGjelderNavn]);

  return (
    <>
      <div className={commonstyles["pageheading"]}>
        <Heading level="1" size="large">
          Oppdragsinfo: Treffliste
        </Heading>
      </div>
      <div className={styles["oppdrag"]}>
        <div className={styles["oppdrag-top"]}>
          <Breadcrumbs searchLink treffliste />

          <div className={styles["oppdrag-top-info"]}>
            <div className={styles["oppdrag-panel"]}>
              <div className={styles["oppdrag-panel-content"]}>
                <LabelText label={"Gjelder-ID"} text={gjelderId ?? ""} />
                <LabelText label={"Navn"} text={gjelderNavn ?? ""} />
                <LabelText
                  label={"Faggruppe"}
                  text={
                    fagGruppe ? `${fagGruppe.navn}(${fagGruppe.type})` : "Alle"
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {!oppdragsListe ||
          (!isEmpty(oppdragsListe) && (
            <OppdragTable oppdragsListe={oppdragsListe} />
          ))}
      </div>
    </>
  );
}
