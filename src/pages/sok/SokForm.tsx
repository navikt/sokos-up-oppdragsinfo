import { Form, Formik } from "formik";
import React from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useStore } from "../../store/AppState";
import { SokParameter } from "../../types/SokParameter";
import { SokParameterSchema } from "../../types/schema/SokParameterSchema";
import FaggruppeCombobox from "./FaggruppeCombobox";
import FormButton from "./FormButton";
import GjelderInput from "./GjelderInput";
import SokHelp from "./SokHelp";
import styles from "./SokPage.module.css";

const SokForm = ({
  fetchOppdragList,
}: {
  fetchOppdragList: (s: SokParameter) => void;
}) => {
  const { setGjelderNavn, gjelderId, fagGruppe } = useStore();

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
      enableReinitialize
      initialValues={{ gjelderId, fagGruppe } as SokParameter}
      validationSchema={toFormikValidationSchema(SokParameterSchema)}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      <Form>
        <div className={styles["sok"]}>
          <div className={styles["sok-help"]}>
            <SokHelp />
          </div>
          <GjelderInput />
          <FaggruppeCombobox />
          <div>
            <div className={styles["sok-knapperad"]}>
              <FormButton submit />
              <FormButton reset />
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default SokForm;
