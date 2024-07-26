import { FormEvent } from "react";
import { EraserIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { BASENAME } from "../../util/constant";
import { useAppState } from "../../store/AppState";
import { useNavigate } from "react-router-dom";

const ResetButton = () => {
  const navigate = useNavigate();
  const { reset } = useAppState();
  const handleReset = (e: FormEvent) => {
    e.preventDefault();
    reset();
    navigate(BASENAME);
  };

  return (
    <Button
      size="small"
      variant="tertiary"
      iconPosition="right"
      icon={<EraserIcon title="reset søk" fontSize="1.5rem" />}
      onClick={handleReset}
    >
      Nullstill søk
    </Button>
  );
};
export default ResetButton;
