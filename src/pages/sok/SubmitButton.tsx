import { useFormStatus } from "react-dom";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { SOK } from "../../umami/umami";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      data-umami-event={SOK.VALIDATE}
      size="small"
      variant="primary"
      type="submit"
      loading={pending}
      iconPosition="right"
      icon={
        <MagnifyingGlassIcon title="Ikon som viser et forstørrelsesglass" />
      }
    >
      Søk
    </Button>
  );
}
