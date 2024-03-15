import { Button, HelpText, Loader, TextField } from "@navikt/ds-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
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
import ContentLoader from "../components/util/ContentLoader";

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

  const backToTreffliste = () => {
    setValgtOppdrag(undefined);
    setLinjeid(undefined);
  };
  useEffect(backToTreffliste, [treffliste]);

  useEffect(() => {
    mutate([]);
  }, [trefflisteParameters]);

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

  const handleBackToDetaljer = () => {
    setLinjeid(undefined);
  };

  return (
    <div className={styles.sokandtreffliste}>
      {!faggrupper ? (
        <Loader>Laster inn faggrupper...</Loader>
      ) : (
        <>
          {!showOppdrag && (
            <div className={styles.sok}>
              <div className={styles.sokandtreffliste__help}>
                <HelpText title="a11y-title" placement="left" strategy="fixed">
                  <p>
                    <i>Minimum ett av kriteriene må være utfylt:</i>
                  </p>
                  <p>- Gjelder id</p>
                  <p>- Gjelder id må være numerisk (11 / 9 )</p>
                </HelpText>
              </div>
              <form onSubmit={handleSubmit(handleChangeGjelderId)}>
                <h1>Søk</h1>

                <div className={styles.sok_inputfields}>
                  <TextField
                    {...register("gjelderID")}
                    id="gjelderID"
                    label="Gjelder"
                    error={errors.gjelderID?.message}
                  />

                  {faggrupper && (
                    <Combobox
                      label={"Faggruppe"}
                      onToggleSelected={handleChooseFaggruppe}
                      options={["", ...sortedFaggrupper]}
                    />
                  )}
                </div>
                <div className={styles.sokandtreffliste__knapperad}>
                  <div className={styles.sokandtreffliste__buttonwrapper}>
                    <Button size="small" iconPosition="right" icon={<MagnifyingGlassIcon />} onClick={() => trigger()}>
                      Søk
                    </Button>
                  </div>
                  <div>
                    <Button
                      size="small"
                      variant="tertiary"
                      iconPosition="right"
                      icon={<EraserIcon title="Nullstill søk" fontSize="1.5rem" />}
                      onClick={() => trigger()}
                    >
                      Nullstill søk
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </>
      )}
      {!showTreffliste && trefflisteParameters?.gjelderID && !showDetaljer && !showOppdrag && <ContentLoader />}
      {showTreffliste && (
        <TrefflisteVisning treffliste={treffliste ? treffliste : []} handleVelgOppdrag={setValgtOppdrag} />
      )}

      {showOppdrag && !showDetaljer && (
        <OppdragsdetaljerPage
          gjelderId={trefflisteParameters.gjelderID}
          oppdrag={valgtOppdrag}
          handleSetLinjeId={handleSetLinjeId}
          handleBackButtonClicked={backToTreffliste}
        />
      )}

      {showDetaljer && (
        <OppdragslinjedetaljerPage
          handleBackButtonClicked={backToTreffliste}
          handleBackToDetaljer={handleBackToDetaljer}
          oppdrag={valgtOppdrag}
          linjeid={linjeid}
          linjer={linjer}
        />
      )}
    </div>
  );
};
export default SokAndTrefflistePage;
