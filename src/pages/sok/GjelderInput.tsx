import { useFormikContext } from "formik";
import React from "react";
import { TextField } from "@navikt/ds-react";
import { SokParameter } from "../../types/SokParameter";
import styles from "./SokForm.module.css";

export default function GjelderInput() {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<SokParameter>();

  function errortext() {
    return (
      <span className={styles["search__error-message--nowrap"]}>
        {errors.gjelderId}
      </span>
    );
  }

  return (
    <div className={styles["search__input-fields"]}>
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
