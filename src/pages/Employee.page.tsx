import { Button, GuidePanel, HGrid, HStack, TextField } from "@navikt/ds-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { BareGjelderIDSchema } from "./Valideringsregler";
import { useState } from "react";

type BareGjelderID = {
  gjelderID?: string;
};

const EmployeePage = () => {
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
    setBareGjelderID(data);
  };

  return (
    <HGrid gap="10" columns={"minmax(10rem, 30rem) minmax(16rem, 1fr)"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField id="gjelderID" {...register("gjelderID")} label="Gjelder-ID" error={errors.gjelderID?.message} />
      </form>
      <GuidePanel>
        <p>
          Gjelder-ID er{" "}
          {errors.gjelderID
            ? "det noe feil med"
            : bareGjelderID.gjelderID?.replace(/\s/, "") === ""
              ? "ikke satt"
              : getValues().gjelderID}
        </p>
      </GuidePanel>
      <HStack>
        <Button size="small" iconPosition="right" icon={<MagnifyingGlassIcon />} onClick={() => trigger()}>
          Søk
        </Button>
      </HStack>
    </HGrid>
  );
};
export default EmployeePage;
