import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { SOK } from "../../umami/umami";

export default function SokButton() {
  return (
    <Button
      data-umami-event={SOK.VALIDATE}
      size="small"
      variant="primary"
      type="submit"
      iconPosition="right"
      icon={
        <MagnifyingGlassIcon title="Ikon som viser et forstørrelsesglass" />
      }
    >
      Søk
    </Button>
  );
}
