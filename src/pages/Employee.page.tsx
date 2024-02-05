import { Button, GuidePanel, Heading, HGrid, HStack, TextField, VStack } from "@navikt/ds-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { BareGjelderIDSchema } from "./Valideringsregler";
import MoneyBagSvg from "../images/money_bag.svg";
import { useState } from "react";

type BareGjelderID = {
  gjelderID?: string;
};

const Divider = () => <hr className="border-border-subtle" />;
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
    setBareGjelderID({ gjelderID: data.gjelderID?.replaceAll(/[\s.]/g, "") });
  };

  const gID = errors.gjelderID ? "det noe feil med" : getValues().gjelderID ?? "ikke skrevet noe ennå";

  return (
    <>
      <HGrid gap="10" columns={"minmax(10rem, 30rem) minmax(16rem, 1fr)"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading spacing size="large">
            Søk i Oppdrag
          </Heading>
          <VStack gap="8">
            <HStack>
              <TextField
                {...register("gjelderID")}
                size="small"
                id="gjelderID"
                label="Gjelder-ID"
                error={errors.gjelderID?.message}
              />
            </HStack>
            <Divider />
            <HStack>
              <Button size="small" iconPosition="right" icon={<MagnifyingGlassIcon />} onClick={() => trigger()}>
                Søk
              </Button>
            </HStack>
          </VStack>
        </form>

        <GuidePanel className="max-w-2xl" illustration={<img src={MoneyBagSvg} alt={"Pengepose"} />}>
          <p>Gjelder-ID er {gID}</p>
          <p>Submitted Gjelder-ID er "{bareGjelderID.gjelderID}"</p>
        </GuidePanel>
      </HGrid>
    </>
  );
};
export default EmployeePage;
