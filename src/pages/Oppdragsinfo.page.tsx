import { Button, GuidePanel, TextField } from "@navikt/ds-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { BareGjelderIDSchema } from "./Valideringsregler";
import MoneyBagSvg from "../images/money_bag.svg";
import { useState } from "react";
import RestService from "../services/rest-service";
import { Combobox } from "../util/commonUtils";

type BareGjelderID = {
  gjelderID?: string;
  faggruppe?: string;
};

const OppdragsinfoPage = () => {
  const { faggrupper, isLoading } = RestService.useFetchFaggrupper();
  const [bareGjelderID, setBareGjelderID] = useState<BareGjelderID>({});

  const {
    register,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<BareGjelderID>({
    resolver: zodResolver(BareGjelderIDSchema),
  });

  const onSubmit: SubmitHandler<BareGjelderID> = (data) => {
    setBareGjelderID({ ...bareGjelderID, gjelderID: data.gjelderID?.replaceAll(/[\s.]/g, "") });
  };

  const handleChooseFaggruppe = (faggruppe: string, isSelected: boolean, isCustomOption: boolean) => {
    console.log("Chose faggruppe:" + faggruppe);
    console.log("isSelected: " + isSelected ? "checked" : "unchecked");
    console.log("isCustomOption: " + isCustomOption ? "custom" : "not custom");
    setBareGjelderID({ ...bareGjelderID, faggruppe });
  };

  const tempdebug_gID = errors.gjelderID ? "det noe feil med" : getValues().gjelderID ?? "ikke skrevet noe ennå";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Søk i Oppdrag</h1>

        <TextField
          {...register("gjelderID")}
          size="small"
          id="gjelderID"
          label="Gjelder"
          error={errors.gjelderID?.message}
        />

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
        <p>Gjelder-ID er {tempdebug_gID}</p>
        <p>Submitted Gjelder-ID er "{bareGjelderID.gjelderID}"</p>
        <p>Faggruppe valgt er {bareGjelderID.faggruppe}</p>
        <p>isLoading er {isLoading ? "yup" : "nope"}</p>
      </GuidePanel>
    </>
  );
};
export default OppdragsinfoPage;
