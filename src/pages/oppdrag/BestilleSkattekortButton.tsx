import { useEffect, useState } from "react";
import { Button } from "@navikt/ds-react";
import {
  bestillSkattekort,
  useFetchSkattekortStatus,
} from "../../api/apiService";
import { ForespoerselRequest } from "../../api/models/ForespoerselRequest";

interface BestilleSkattekortButtonProps {
  gjelderId: string;
  setSkattekortstatus: (status: string) => void;
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
    if (data?.status === "SENDT_FORSYSTEM") {
      setShouldRefreshStatus(false);
    }
    props.setSkattekortstatus(data?.status ?? "UKJENT");
  }, [data, props]);

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
        loading={shouldRefreshStatus}
        disabled={data?.status === "SENDT_FORSYSTEM"}
      >
        Bestill skattekort
      </Button>
    </>
  );
}
