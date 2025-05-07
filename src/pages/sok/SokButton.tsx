import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import styles from "./SokPage.module.css";

export default function SokButton() {
  return (
    <div className={styles["sok-buttonwrapper"]}>
      <Button
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
    </div>
  );
}
