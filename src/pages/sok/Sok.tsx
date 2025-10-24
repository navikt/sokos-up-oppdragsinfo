import { useStore as useNanostore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Alert, Heading } from "@navikt/ds-react";
import { hentOppdrag } from "../../api/apiService";
import { useStore } from "../../store/AppState";
import { selectedId } from "../../store/shared";
import { ErrorMessage } from "../../types/ErrorMessage";
import { SokParameter } from "../../types/SokParameter";
import { isEmpty } from "../../util/commonUtil";
import { TREFFLISTE } from "../../util/routenames";
import styles from "./Sok.module.css";
import SokForm from "./SokForm";

export default function Sok() {
  const navigate = useNavigate();
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setOppdragsListe } = useStore();
  const testId = useNanostore(selectedId);

  useEffect(() => {
    if (testId) {
      // eslint-disable-next-line no-console
      console.log("Mottar id fra attestasjon:", testId);
    }
  }, [testId]);

  const fetchOppdragList = async (sokParameter: SokParameter) => {
    if (!sokParameter.gjelderId) {
      setError({
        variant: "warning",
        message: "GjelderId må fylles ut",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await hentOppdrag({
        gjelderId: sokParameter.gjelderId,
        fagGruppeKode: sokParameter.fagGruppe?.type,
      });

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
    } catch (err: unknown) {
      const error = err as { statusCode?: number; message: string };
      setError({
        variant: error.statusCode === 400 ? "warning" : "error",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles["sok"]}>
      <Heading level="1" size="large" spacing align="center">
        Oppdragsinfo: Søk
      </Heading>
      {testId && (
        <Alert variant="info" style={{ marginBottom: "1rem" }}>
          Mottatt ID fra attestasjon: {testId}
        </Alert>
      )}
      <div className={styles["sok__box"]}>
        <SokForm fetchOppdragList={fetchOppdragList} isLoading={isLoading} />
      </div>
      {error && (
        <div className={styles["sok__error"]}>
          <Alert variant={error.variant} role="status">
            {error.message}
          </Alert>
        </div>
      )}
    </div>
  );
}
