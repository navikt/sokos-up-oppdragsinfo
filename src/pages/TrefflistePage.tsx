import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Heading } from "@navikt/ds-react";
import { hentNavn } from "../api/apiService";
import Breadcrumbs from "../components/Breadcrumbs";
import LabelText from "../components/LabelText";
import { useStore } from "../store/AppState";
import commonstyles from "../styles/common-styles.module.css";
import { isEmpty } from "../util/commonUtil";
import { ROOT } from "../util/constant";
import styles from "./treffliste/TrefflistePage.module.css";
import TrefflisteTable from "./treffliste/TrefflisteTable";

export default function TrefflistePage() {
  const navigate = useNavigate();
  const { gjelderId, fagGruppe, oppdragsListe, gjelderNavn, setGjelderNavn } =
    useStore();

  useEffect(() => {
    if (!gjelderId || oppdragsListe === undefined || isEmpty(oppdragsListe)) {
      navigate(ROOT, { replace: true });
    }

    if (gjelderNavn === "") {
      hentNavn({ gjelderId }).then((response) => {
        setGjelderNavn(response.navn);
      });
    }
  }, [navigate, gjelderId, gjelderNavn, oppdragsListe, setGjelderNavn]);

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large">
          Oppdragsinfo: Treffliste
        </Heading>
      </div>
      <div className={commonstyles.container}>
        <div className={commonstyles.header}>
          <Breadcrumbs searchLink treffliste />

          <div className={commonstyles.headerInfo}>
            <div className={styles.panelContent}>
              <LabelText label={"Gjelder"} text={gjelderId ?? ""} />
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
        {!oppdragsListe ||
          (!isEmpty(oppdragsListe) && (
            <TrefflisteTable oppdragsListe={oppdragsListe} />
          ))}
      </div>
    </>
  );
}
