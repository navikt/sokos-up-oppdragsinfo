import React from "react";
import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useStore } from "../../store/AppState";
import styles from "./SokPage.module.css";

type FormButtonProps = {
  submit?: boolean;
  reset?: boolean;
};

export default function FormButton({ submit, reset }: FormButtonProps) {
  const { resetState } = useStore();
  return (
    <div className={styles["sok-buttonwrapper"]}>
      <Button
        size="small"
        variant={submit ? "primary" : reset ? "secondary" : "tertiary"}
        type={reset ? "reset" : undefined}
        iconPosition="right"
        icon={
          submit ? (
            <MagnifyingGlassIcon title="Ikon som viser et forstørrelsesglass" />
          ) : reset ? (
            <EraserIcon title="Nullstill søk" />
          ) : undefined
        }
        onClick={reset ? resetState : undefined}
      >
        {submit ? "Søk" : reset ? "Nullstill" : "Nytt søk"}
      </Button>
    </div>
  );
}
