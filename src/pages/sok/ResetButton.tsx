import { useFormikContext } from "formik";
import { EraserIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useStore } from "../../store/AppState";
import { SOK } from "../../umami/umami";
import styles from "./SokPage.module.css";

export default function ResetButton() {
  const { handleReset } = useFormikContext();
  const { resetState } = useStore();
  return (
    <div className={styles["sok-buttonwrapper"]}>
      <Button
        data-umami-event={SOK.RESET}
        size="small"
        variant="secondary"
        type="reset"
        iconPosition="right"
        icon={<EraserIcon title="Nullstill søk" />}
        onClick={() => {
          handleReset();
          resetState();
        }}
      >
        Nullstill
      </Button>
    </div>
  );
}
