import { useEffect, useState } from "react";
import { Button, TextField } from "@navikt/ds-react";
import {
  bestillSkattekort,
  useFetchSkattekortStatus,
} from "../../api/apiService";
import { ForespoerselRequest } from "../../api/models/ForespoerselRequest";

interface BestilleSkattekortButtonProps {
  gjelderId: string;
}

export default function BestilleSkattekortButton(
  props: BestilleSkattekortButtonProps,
) {
  const request: ForespoerselRequest = {
    personIdent: props.gjelderId,
    aar: new Date().getFullYear(),
    forsystem: "OS",
  };

  const [shouldRefreshStatus, setShouldRefreshStatus] = useState(false);
  const { data } = useFetchSkattekortStatus(request, shouldRefreshStatus);
  useEffect(() => {
    if (data?.data.status === "Har skattekort") {
      setShouldRefreshStatus(false);
    }
  }, [data]);

  function handleClick() {
    setShouldRefreshStatus(true);
    bestillSkattekort(request).catch((error) => {
      throw error;
    });
  }

  return (
    <>
      <Button
        size={"small"}
        variant={"secondary-neutral"}
        onClick={handleClick}
      >
        Bestill skattekort
      </Button>
      <TextField
        label={"status"}
        value={data?.data.status ?? data?.errorMessage ?? "omgwtf"}
        readOnly
      />
    </>
  );
}
