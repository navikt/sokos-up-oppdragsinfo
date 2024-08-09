import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { EraserIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useAppState } from "../../store/AppState";
import { BASENAME } from "../../util/constant";

export default function ResetButton() {
  const navigate = useNavigate();
  const { resetState } = useAppState();

  function handleReset(e: FormEvent) {
    e.preventDefault();
    resetState();
    navigate(BASENAME);
  }

  return (
    <Button
      size="small"
      variant="tertiary"
      iconPosition="right"
      icon={<EraserIcon title="reset søk" fontSize="1.5rem" />}
      onClick={handleReset}
    >
      Nytt søk
    </Button>
  );
}
