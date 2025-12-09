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
    if (data && data.status) {
      props.setSkattekortstatus(data.status);
      if (
        ["IKKE_BESTILT", "BESTILT", "VENTER_PAA_UTSENDING"].includes(
          data.status,
        )
      ) {
        // Det er først når data kommer tilbake fra kallet at vi evt rerendrer basert på shouldRefreshStatus
        // Derfor er det trygt å sette state her uten at vi risikerer en uendelig loop
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShouldRefreshStatus(true);
      } else if (data.status === "SENDT_FORSYSTEM") {
        setShouldRefreshStatus(false);
      }
    }
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
