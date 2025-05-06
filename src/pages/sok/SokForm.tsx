import { Form, Formik, useFormikContext } from "formik";
import React from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useStore } from "../../store/AppState";
import { SokParameter } from "../../types/SokParameter";
import { SokParameterSchema } from "../../types/schema/SokParameterSchema";
import FaggruppeCombobox from "./FaggruppeCombobox";
import GjelderInput from "./GjelderInput";
import SokHelp from "./SokHelp";
import styles from "./SokPage.module.css";

const SokForm = ({
  fetchOppdragList,
}: {
  fetchOppdragList: (s: SokParameter) => void;
}) => {
  const { setGjelderNavn, gjelderId, fagGruppe, resetState } = useStore();

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

  function SokButton() {
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

  function ResetButton() {
    const { handleReset } = useFormikContext();
    return (
      <div className={styles["sok-buttonwrapper"]}>
        <Button
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
