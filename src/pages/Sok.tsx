import { useState } from "react";
import { useNavigate } from "react-router";
import { Alert, Heading } from "@navikt/ds-react";
import { hentOppdrag } from "../api/apiService";
import { useStore } from "../store/AppState";
import { ErrorMessage } from "../types/ErrorMessage";
import { SokParameter } from "../types/SokParameter";
import { isEmpty } from "../util/commonUtil";
import { TREFFLISTE } from "../util/routenames";
import styles from "./sok/Sok.module.css";
import SokForm from "./sok/SokForm";

export default function Sok() {
  const navigate = useNavigate();
  const [error, setError] = useState<ErrorMessage | null>(null);
  const { setOppdragsListe } = useStore();

  const fetchOppdragList = (sokParameter: SokParameter) => {
    if (!sokParameter.gjelderId) {
      setError({
        variant: "warning",
        message: "GjelderId må fylles ut",
      });
      return;
    }

    hentOppdrag({
      gjelderId: sokParameter.gjelderId,
      fagGruppeKode: sokParameter.fagGruppe?.type,
    })
      .then((response) => {
        if (!isEmpty(response)) {
          setOppdragsListe(response);
          navigate(TREFFLISTE, { replace: false });
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
  };
  return (
    <>
      <Heading level="1" size="large" spacing>
        Oppdragsinfo: Søk
      </Heading>
      <SokForm fetchOppdragList={fetchOppdragList} />
      {error && (
        <div className={styles["search__error"]}>
          <Alert variant={error.variant} role="status">
            {error.message}
          </Alert>
        </div>
      )}
    </>
  );
}
