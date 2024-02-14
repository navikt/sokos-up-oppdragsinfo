import { Button, GuidePanel, Select, TextField } from "@navikt/ds-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { BareGjelderIDSchema } from "./Valideringsregler";
import MoneyBagSvg from "../images/money_bag.svg";
import { useState } from "react";
import RestService from "../services/rest-service";
import { capitalized, isEmpty } from "../util/commonUtils";

type BareGjelderID = {
  gjelderID?: string;
};

const EmployeePage = () => {
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
    setBareGjelderID({ gjelderID: data.gjelderID?.replaceAll(/[\s.]/g, "") });
  };

  const gID = errors.gjelderID ? "det noe feil med" : getValues().gjelderID ?? "ikke skrevet noe ennå";

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

        <Button size="small" iconPosition="right" icon={<MagnifyingGlassIcon />} onClick={() => trigger()}>
          Søk
        </Button>
      </form>
      <Select label={"Velg faggruppe"}>
        <option value="">Alle faggrupper</option>
        {!!faggrupper &&
          !isEmpty(faggrupper) &&
          faggrupper.map((f) => <option value={f.type}>{capitalized(f.navn)}</option>)}
      </Select>
      <GuidePanel className="max-w-2xl" illustration={<img src={MoneyBagSvg} alt={"Pengepose"} />}>
        <p>Gjelder-ID er {gID}</p>
        <p>Submitted Gjelder-ID er "{bareGjelderID.gjelderID}"</p>
        <p>isLoading er {isLoading ? "yup" : "nope"}</p>
      </GuidePanel>
    </>
  );
};
export default EmployeePage;
