import { Form, Formik } from "formik";
import React from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useStore } from "../../store/AppState";
import { SokParameter } from "../../types/SokParameter";
import { SokParameterSchema } from "../../types/schema/SokParameterSchema";
import FaggruppeCombobox from "./FaggruppeCombobox";
import GjelderInput from "./GjelderInput";
import ResetButton from "./ResetButton";
import SokButton from "./SokButton";
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
          <div className={styles["sok-knapperad"]}>
            <SokButton />
            <ResetButton />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default SokForm;
