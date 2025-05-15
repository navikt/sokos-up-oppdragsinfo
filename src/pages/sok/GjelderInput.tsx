import { useFormikContext } from "formik";
import React from "react";
import { TextField } from "@navikt/ds-react";
import { SokParameter } from "../../types/SokParameter";
import styles from "./SokPage.module.css";

export default function GjelderInput() {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<SokParameter>();

  function errortext() {
    return (
      <span className={styles["sok-error-message-nowrap"]}>
        {errors.gjelderId}
      </span>
    );
  }

  return (
    <div className={styles["sok-inputfields"]}>
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
