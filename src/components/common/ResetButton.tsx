import { FormEvent } from "react";
import { EraserIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { clearFaggruppe, clearId } from "../../util/commonUtils";
import { BASENAME } from "../../util/constants";

const ResetButton = () => {
  const reset = (e: FormEvent) => {
    e.preventDefault();
    clearId();
    clearFaggruppe();
    window.location.replace(BASENAME);
  };

  return (
    <Button
      size="small"
      variant="tertiary"
      iconPosition="right"
      icon={<EraserIcon title="reset søk" fontSize="1.5rem" />}
      onClick={reset}
    >
      Nullstill søk
    </Button>
  );
};
export default ResetButton;
