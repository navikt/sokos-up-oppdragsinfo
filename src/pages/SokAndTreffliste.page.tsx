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

  const [oppdragsid, setOppdragsid] = useState<string>();
  const [linjeid, setLinjeid] = useState<string>();

  useEffect(() => {
    console.log("enten trefflisteParameters, treffliste er endret");
    setOppdragsid(undefined);
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

  const handleChooseFaggruppe = (faggruppe: string, isSelected: boolean) => {
    setTrefflisteParameters({ ...trefflisteParameters, faggruppe: isSelected ? faggruppe : undefined });
  };

  const sortedFaggrupper = faggrupper ? [...faggrupper.map((f) => f.type)].sort() : [];

  return (
    <>
      <form onSubmit={handleSubmit(handleChangeGjelderId)}>
        <h1>Søk i Oppdrag</h1>

        <TextField {...register("gjelderID")} id="gjelderID" label="Gjelder" error={errors.gjelderID?.message} />

        {faggrupper && (
          <Combobox
            label={"Velg faggruppe"}
            clearButton={true}
            clearButtonLabel={"Foo"}
            onToggleSelected={handleChooseFaggruppe}
            options={sortedFaggrupper}
          />
        )}

        <Button size="small" iconPosition="right" icon={<MagnifyingGlassIcon />} onClick={() => trigger()}>
          Søk
        </Button>
      </form>

      {!!treffliste && !isEmpty(treffliste) ? (
        <TrefflisteVisning treffliste={treffliste} handleSetId={setOppdragsid} />
      ) : (
        "tom treffliste"
      )}

      {!!trefflisteParameters?.gjelderID && !!oppdragsid && (
        <OppdragsdetaljerPage
          gjelderId={trefflisteParameters.gjelderID}
          id={oppdragsid}
          handleSetLinjeId={setLinjeid}
        />
      )}

      {!!trefflisteParameters?.gjelderID && !!oppdragsid && !!linjeid && (
        <OppdragslinjedetaljerPage oppdragsid={oppdragsid} linjeid={linjeid} />
      )}
    </>
  );
};
export default SokAndTrefflistePage;
