import { Form, Formik } from "formik";
import React from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { TextField } from "@navikt/ds-react";
import { useFetchHentFaggrupper } from "../../api/apiService";
import { useStore } from "../../store/AppState";
import { SokParameter } from "../../types/SokParameter";
import { SokParameterSchema } from "../../types/schema/SokParameterSchema";
import FaggruppeCombobox from "./FaggruppeCombobox";

const SokForm = ({
  fetchOppdragList,
}: {
  fetchOppdragList: (s: SokParameter) => void;
}) => {
  const { data: faggrupper } = useFetchHentFaggrupper();
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
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik
        initialValues={{ gjelderId: "" } as SokParameter}
        validationSchema={toFormikValidationSchema(SokParameterSchema)}
        validateOnBlur
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form>
            <TextField
              label="Gjelder"
              size={"small"}
              error={
                touched.gjelderId && errors.gjelderId ? errors.gjelderId : ""
              }
              id="gjelderId"
              value={values.gjelderId ? values.gjelderId.trim() : ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FaggruppeCombobox
              faggrupper={
                faggrupper ?? [{ navn: "Ingen faggruppe", type: "INGEN" }]
              }
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SokForm;
