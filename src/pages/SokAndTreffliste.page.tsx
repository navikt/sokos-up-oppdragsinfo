import { Button, GuidePanel, TextField } from "@navikt/ds-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { TrefflisteSearchParametersSchema } from "./Valideringsregler";
import MoneyBagSvg from "../images/money_bag.svg";
import { useEffect, useState } from "react";
import { Combobox, isEmpty } from "../util/commonUtils";
import TrefflisteVisning from "../components/TrefflisteVisning";
import { Treffliste } from "../models/OppdragsinfoData";
import RestService from "../services/rest-service";

type TrefflisteParameters = {
  gjelderID?: string;
  faggruppe?: string;
};

const SokAndTrefflistePage = ({ setGjelderId }: { setGjelderId: (gjelderId: string) => void }) => {
  const { faggrupper, faggrupperIsLoading } = RestService.useFetchFaggrupper();
  const [trefflisteParameters, setTrefflisteParameters] = useState<TrefflisteParameters>({});
  // const { treffliste, trefflisteIsLoading } = RestService.useFetchTreffliste(
  //   trefflisteParameters?.gjelderID,
  //   trefflisteParameters?.faggruppe,
  // );
  const treffliste: Treffliste = [
    {
      gjelderId: "12345612345",
      gjelderNavn: "nope Nope",
      oppdragsListe: [
        {
          fagsystemId: "15003899",
          oppdragsId: 1,
          navnFagGruppe: "Inntektsytelser",
          navnFagOmraade: "Uføretrygd",
          kjorIdag: "N",
          kodeStatus: "AKTI",
          typeBilag: "",
        },
      ],
    },
  ];
  const trefflisteIsLoading = false;

  useEffect(() => {
    console.log("useEffect treffliste");
    const gjelderId = treffliste ? [...treffliste].reduce((t, n) => n.gjelderId, "") : "";
    console.log(`setter gjelderId ${gjelderId}`);
    setGjelderId(gjelderId);
  }, [treffliste]);

  const {
    register,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<TrefflisteParameters>({
    resolver: zodResolver(TrefflisteSearchParametersSchema),
  });

  const handleChangeGjelderId: SubmitHandler<TrefflisteParameters> = (data) => {
    const gjelderID = data.gjelderID?.replaceAll(/[\s.]/g, "") ?? "";
    setTrefflisteParameters({ ...trefflisteParameters, gjelderID: gjelderID });
    setGjelderId(gjelderID);
  };

  const handleChooseFaggruppe = (faggruppe: string, isSelected: boolean) => {
    setTrefflisteParameters({ ...trefflisteParameters, faggruppe: isSelected ? faggruppe : undefined });
  };

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
            options={faggrupper.map((f) => f.navn + "(" + f.type + ")")}
          />
        )}

        <Button size="small" iconPosition="right" icon={<MagnifyingGlassIcon />} onClick={() => trigger()}>
          Søk
        </Button>
      </form>

      <GuidePanel className="max-w-2xl" illustration={<img src={MoneyBagSvg} alt={"Pengepose"} />}>
        <p>faggrupperIsLoading er {faggrupperIsLoading ? "yup" : "nope"}</p>
        <p>
          Gjelder ID
          {errors.gjelderID ? " er det noe feil med" : getValues().gjelderID ?? "- ikke skrevet noe ennå"}
        </p>
        <p>Faggruppe i trefflisteparameters er {trefflisteParameters.faggruppe}</p>
        <p>Gjelder ID i trefflisteparameters er "{trefflisteParameters.gjelderID}"</p>
        <p>trefflisteIsLoading er {trefflisteIsLoading ? "yup" : "nope"}</p>
      </GuidePanel>

      {treffliste && !isEmpty(treffliste) ? (
        <TrefflisteVisning
          key={btoa("" + trefflisteParameters.gjelderID + trefflisteParameters.faggruppe)}
          treffliste={treffliste}
        />
      ) : (
        "tom treffliste"
      )}
    </>
  );
};
export default SokAndTrefflistePage;
