import { useFormikContext } from "formik";
import { TextField } from "@navikt/ds-react";
import commonstyles from "../../styles/common-styles.module.css";
import { SokParameter } from "../../types/SokParameter";
import styles from "./SokForm.module.css";

export default function GjelderInput() {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<SokParameter>();

  function errortext() {
    return (
      <span className={commonstyles["text--nowrap"]}>{errors.gjelderId}</span>
    );
  }

  return (
    <div className={styles["sok__gjelder"]}>
      <TextField
        label="Gjelder"
        size={"small"}
        error={touched.gjelderId && errors.gjelderId && errortext()}
        id="gjelderId"
        value={values.gjelderId ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}
