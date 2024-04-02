import { Alert, Button, TextField } from "@navikt/ds-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import {
  TrefflisteSearchParameters,
  TrefflisteSearchParametersSchema,
} from "../components/sok/TrefflisteSokParameters";
import { useEffect, useState } from "react";
import { anyOppdragExists, firstOf, isEmpty, retrieveFaggruppe, retrieveId, storeId } from "../util/commonUtils";
import RestService from "../services/rest-service";
import styles from "./Sok.module.css";
import ContentLoader from "../components/common/ContentLoader";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Faggruppe } from "../models/Faggruppe";
import { isArray } from "@grafana/faro-web-sdk";
import SokHelp from "../components/sok/SokHelp";
import NullstillButton from "../components/common/NullstillButton";
import FaggrupperCombobox from "../components/sok/FaggrupperCombobox";
import { useSWRConfig } from "swr";

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
      <div className={styles.sok__sok}>
        <div className={styles.sok__help}>
          <SokHelp />
        </div>
        <form onSubmit={handleSubmit(handleChangeGjelderId)}>
          <h1>Søk</h1>

          <div className={styles.sok_inputfields}>
            <div className={styles.sok__inputGjelderID}>
              <TextField
                {...register("gjelderID")}
                label="Gjelder-ID"
                defaultValue={trefflisteSokParameters.gjelderID}
                id="gjelderID"
                error={errors.gjelderID?.message}
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
