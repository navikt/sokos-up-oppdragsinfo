import { Form, Formik } from "formik";
import React from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button, TextField } from "@navikt/ds-react";
import { useStore } from "../../store/AppState";
import { SokParameter } from "../../types/SokParameter";
import { SokParameterSchema } from "../../types/schema/SokParameterSchema";
import FaggruppeCombobox from "./FaggruppeCombobox";
import SokHelp from "./SokHelp";
import styles from "./SokPage.module.css";

const SokForm = ({
  fetchOppdragList,
}: {
  fetchOppdragList: (s: SokParameter) => void;
}) => {
  const { setGjelderNavn } = useStore();

  async function onSubmit(parameter: SokParameter) {
    // setIsLoading(true);
    setGjelderNavn("");
    const gjelderId = parameter.gjelderId ?? "";
    const fagGruppe = parameter.fagGruppe;
    useStore.setState({
      gjelderId: gjelderId,
      fagGruppe: fagGruppe,
    });

    fetchOppdragList(parameter);
  }

  return (
    <Formik
      initialValues={{ gjelderId: "" } as SokParameter}
      validationSchema={toFormikValidationSchema(SokParameterSchema)}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        handleReset,
        /* and other goodies */
      }) => (
        <Form>
          <div className={styles["sok"]}>
            <div className={styles["sok-help"]}>
              <SokHelp />
            </div>
            <div className={styles["sok-inputfields"]}>
              <TextField
                label="Gjelder"
                size={"small"}
                error={
                  touched.gjelderId && errors.gjelderId ? (
                    <span className={styles["sok-error-message-nowrap"]}>
                      {errors.gjelderId}
                    </span>
                  ) : (
                    ""
                  )
                }
                id="gjelderId"
                value={values.gjelderId ? values.gjelderId.trim() : ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <FaggruppeCombobox />
            <div>
              <div className={styles["sok-knapperad"]}>
                <div className={styles["sok-buttonwrapper"]}>
                  <Button
                    size="small"
                    iconPosition="right"
                    icon={
                      <MagnifyingGlassIcon title="Ikon som viser et forstørrelsesglass" />
                    }
                  >
                    Søk
                  </Button>
                </div>
                <div>
                  <Button
                    size="small"
                    variant="secondary"
                    iconPosition="right"
                    icon={<EraserIcon title="Nullstill søk" />}
                    onClick={handleReset}
                    disabled={isSubmitting}
                  >
                    Nullstill
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SokForm;
