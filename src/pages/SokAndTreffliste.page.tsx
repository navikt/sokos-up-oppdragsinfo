import { Button, TextField } from "@navikt/ds-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { TrefflisteSearchParametersSchema } from "./Valideringsregler";
import { useEffect, useState } from "react";
import { Combobox, isEmpty } from "../util/commonUtils";
import TrefflisteVisning from "../components/TrefflisteVisning";
import RestService from "../services/rest-service";
import OppdragsdetaljerPage from "./Oppdragsdetaljer.page";
import OppdragslinjedetaljerPage from "./OppdragslinjedetaljerPage";
import { Oppdragslinje } from "../models/Oppdragslinje";
import styles from "./SokAndTreffliste.module.css";
import { Oppdrag } from "../models/Oppdrag";

type TrefflisteParameters = {
  gjelderID?: string;
  faggruppe?: string;
};

const SokAndTrefflistePage = () => {
  const { faggrupper } = RestService.useFetchFaggrupper();
  const [trefflisteParameters, setTrefflisteParameters] = useState<TrefflisteParameters>({});
  const { treffliste, mutate } = RestService.useFetchTreffliste(
    trefflisteParameters?.gjelderID,
    trefflisteParameters?.faggruppe,
  );

  const [valgtOppdrag, setValgtOppdrag] = useState<Oppdrag>();
  const [linjeid, setLinjeid] = useState<string>();
  const [linjer, setLinjer] = useState<Oppdragslinje[]>([]);

  useEffect(() => {
    setValgtOppdrag(undefined);
    setLinjeid(undefined);
    mutate(treffliste);
  }, [trefflisteParameters, treffliste]);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<TrefflisteParameters>({
    resolver: zodResolver(TrefflisteSearchParametersSchema),
  });

  const handleChangeGjelderId: SubmitHandler<TrefflisteParameters> = (data) => {
    const gjelderID = data.gjelderID?.replaceAll(/[\s.]/g, "") ?? "";
    setTrefflisteParameters({ ...trefflisteParameters, gjelderID: gjelderID });
  };

  const handleChooseFaggruppe = (faggruppenavn: string, isSelected: boolean) => {
    setTrefflisteParameters((prevParameters) => ({
      ...prevParameters,
      faggruppe: isSelected && faggruppenavn !== "" ? faggruppenavn?.split("(")[1].split(")")[0] : undefined,
    }));
  };

  const sortedFaggrupper = faggrupper ? [...faggrupper.map((f) => `${f.navn}(${f.type})`)].sort() : [];

  const handleSetLinjeId = (linjeid: string, linjer: Oppdragslinje[]) => {
    setLinjeid(linjeid);
    setLinjer(linjer);
  };

  const showOppdrag = !!trefflisteParameters?.gjelderID && !!valgtOppdrag;
  const showDetaljer = !!linjeid && showOppdrag;
  const showTreffliste = !!treffliste && !isEmpty(treffliste) && !showOppdrag;
  const handleBackButtonClicked = () => {
    setValgtOppdrag(undefined);
    setLinjeid(undefined);
  };

  return (
    <div className={styles.sokandtreffliste}>
      {!showOppdrag && (
        <form onSubmit={handleSubmit(handleChangeGjelderId)}>
          <h1>Søk i Oppdrag</h1>

          <TextField {...register("gjelderID")} id="gjelderID" label="Gjelder" error={errors.gjelderID?.message} />

          {faggrupper && (
            <Combobox
              label={"Velg faggruppe"}
              onToggleSelected={handleChooseFaggruppe}
              options={["", ...sortedFaggrupper]}
            />
          )}

          <Button size="small" iconPosition="right" icon={<MagnifyingGlassIcon />} onClick={() => trigger()}>
            Søk
          </Button>
        </form>
      )}

      {showTreffliste && <TrefflisteVisning treffliste={treffliste} handleVelgOppdrag={setValgtOppdrag} />}

      {showOppdrag && (
        <OppdragsdetaljerPage
          gjelderId={trefflisteParameters.gjelderID}
          oppdrag={valgtOppdrag}
          handleSetLinjeId={handleSetLinjeId}
          handleBackButtonClicked={handleBackButtonClicked}
        />
      )}

      {showDetaljer && <OppdragslinjedetaljerPage oppdrag={valgtOppdrag} linjeid={linjeid} linjer={linjer} />}
    </div>
  );
};
export default SokAndTrefflistePage;
