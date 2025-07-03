import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Heading } from "@navikt/ds-react";
import { hentNavn } from "../../api/apiService";
import Breadcrumbs from "../../components/Breadcrumbs";
import LabelText from "../../components/LabelText";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/common-styles.module.css";
import { isEmpty } from "../../util/commonUtil";
import { ROOT } from "../../util/routenames";
import styles from "./Treffliste.module.css";
import TrefflisteTable from "./TrefflisteTable";

export default function Treffliste() {
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
    <div className={commonstyles["container"]}>
      <div className={commonstyles["container__header"]}>
        <Heading level="1" size="large" align="center">
          Oppdragsinfo: Treffliste
        </Heading>
        <Breadcrumbs searchLink treffliste />

        <div className={styles["header__info"]}>
          <Heading size="small" level="2">
            Søkekriterier benyttet:
          </Heading>
          <div className={styles["header__info__content"]}>
            <LabelText label={"Gjelder"} text={gjelderId ?? ""} />
            <LabelText label={"Navn"} text={gjelderNavn ?? ""} />
            <LabelText
              label={"Faggruppe"}
              text={fagGruppe ? `${fagGruppe.navn}(${fagGruppe.type})` : "Alle"}
            />
          </div>
        </div>
      </div>
      {!oppdragsListe ||
        (!isEmpty(oppdragsListe) && (
          <TrefflisteTable oppdragsListe={oppdragsListe} />
        ))}
    </div>
  );
}
