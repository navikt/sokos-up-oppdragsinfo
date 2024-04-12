import ContentLoader from "../components/common/ContentLoader";
import FaggrupperCombobox from "../components/sok/FaggrupperCombobox";
import NullstillButton from "../components/common/NullstillButton";
import RestService from "../services/rest-service";
import SokHelp from "../components/sok/SokHelp";
import styles from "./Sok.module.css";
import { Alert, Button, TextField } from "@navikt/ds-react";
import { Faggruppe } from "../models/Faggruppe";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { TrefflisteSearchParameters, TrefflisteSearchParametersSchema } from "../models/TrefflisteSokParameters";
import { anyOppdragExists, firstOf, isEmpty, retrieveFaggruppe, retrieveId, storeId } from "../util/commonUtils";
import { isArray } from "@grafana/faro-web-sdk";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";
import { zodResolver } from "@hookform/resolvers/zod";

const SokPage = () => {
  const { mutate } = useSWRConfig();
  const faggrupper = useLoaderData() as Faggruppe[];
  const [trefflisteSokParameters, setTrefflisteSokParameters] = useState<TrefflisteSearchParameters>({
    gjelderID: retrieveId(),
  });

  const faggruppe = retrieveFaggruppe();

  const { treffliste, trefflisteIsLoading } = RestService.useFetchTreffliste(
    trefflisteSokParameters.gjelderID,
    faggruppe?.type,
  );
  const [shouldGoToTreffliste, setShouldGoToTreffliste] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isArray(treffliste) && !isEmpty(treffliste) && !trefflisteIsLoading) {
      storeId(firstOf(treffliste).gjelderId);
      if (anyOppdragExists(treffliste) && shouldGoToTreffliste) {
        navigate("/treffliste");
        setShouldGoToTreffliste(false);
      }
    }
  }, [treffliste]);

  useEffect(() => {
    mutate("/oppdrag", []);
  }, [trefflisteSokParameters]);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<TrefflisteSearchParameters>({
    resolver: zodResolver(TrefflisteSearchParametersSchema),
  });

  const handleChangeGjelderId: SubmitHandler<TrefflisteSearchParameters> = (data) => {
    const gjelderID = data.gjelderID?.replaceAll(/[\s.]/g, "") ?? "";
    setShouldGoToTreffliste(true);
    setTrefflisteSokParameters({ gjelderID: gjelderID });
  };

  return (
    <>
      <h1>Oppdragsinfo</h1>
      <div className={styles.sok__sok}>
        <div className={styles.sok__help}>
          <SokHelp />
        </div>
        <form onSubmit={handleSubmit(handleChangeGjelderId)}>
          <h2>Søk</h2>

          <div className={styles.sok_inputfields}>
            <div className={styles.sok__inputGjelderID}>
              <TextField
                {...register("gjelderID")}
                label="Gjelder-ID"
                defaultValue={trefflisteSokParameters.gjelderID}
                id="gjelderID"
                error={errors.gjelderID?.message}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </div>
            <FaggrupperCombobox faggrupper={faggrupper} />
          </div>
          <div className={styles.sok__knapperad}>
            <div className={styles.sok__buttonwrapper}>
              <Button
                size="small"
                title={"tøm"}
                iconPosition="right"
                icon={<MagnifyingGlassIcon />}
                onClick={() => trigger()}
              >
                Søk
              </Button>
            </div>
            <div>
              <NullstillButton />
            </div>
          </div>
        </form>
      </div>
      {!!trefflisteSokParameters.gjelderID && trefflisteIsLoading && <ContentLoader />}
      {!trefflisteIsLoading && !anyOppdragExists(treffliste) && (
        <Alert variant="info">
          Null treff. Denne IDen har ingen oppdrag
          {faggruppe ? ` med faggruppe ${faggruppe.type}` : ""}
        </Alert>
      )}
    </>
  );
};
export default SokPage;
