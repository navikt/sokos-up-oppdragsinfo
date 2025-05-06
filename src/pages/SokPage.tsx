import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Heading } from "@navikt/ds-react";
import { hentOppdrag } from "../api/apiService";
import { useStore } from "../store/AppState";
import commonstyles from "../styles/common-styles.module.css";
import { ErrorMessage } from "../types/ErrorMessage";
import { SokParameter } from "../types/SokParameter";
import { isEmpty } from "../util/commonUtil";
import SokForm from "./sok/SokForm";
import styles from "./sok/SokPage.module.css";

export default function SokPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<ErrorMessage | null>(null);
  const { setOppdragsListe } = useStore();

  const fetchOppdragList = (sokParameter: SokParameter) =>
    hentOppdrag({
      gjelderId: sokParameter.gjelderId,
      fagGruppeKode: sokParameter.fagGruppe?.type,
    })
      .then((response) => {
        if (!isEmpty(response)) {
          setOppdragsListe(response);
          navigate("/treffliste", { replace: false });
        } else {
          setError({
            variant: "info",
            message:
              "Fant ingen oppdrag for " +
              sokParameter.gjelderId +
              (sokParameter.fagGruppe
                ? " med faggruppe " + sokParameter.fagGruppe.type
                : ""),
          });
        }
      })
      .catch((error) => {
        setError({
          variant: error.statusCode == 400 ? "warning" : "error",
          message: error.message,
        });
      });

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large" spacing>
          Oppdragsinfo: Søk
        </Heading>
      </div>
      <SokForm fetchOppdragList={fetchOppdragList} />
      {error && (
        <div className={styles["sok-feil"]}>
          <Alert variant={error.variant} role="status">
            {error.message}
          </Alert>
        </div>
      )}
    </>
  );
}
