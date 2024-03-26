import { Button } from "@navikt/ds-react";
import { EraserIcon } from "@navikt/aksel-icons";
import { clearFaggruppe, clearId } from "../../util/commonUtils";
import { BASENAME } from "../../util/constants";
import { FormEvent } from "react";

const NullstillButton = () => {
  const nullstill = (e: FormEvent) => {
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
      icon={<EraserIcon title="Nullstill søk" fontSize="1.5rem" />}
      onClick={nullstill}
    >
      Nullstill søk
    </Button>
  );
};
export default NullstillButton;
