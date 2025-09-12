import { useActionState, useEffect, useState } from "react";
import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button, TextField, UNSAFE_Combobox } from "@navikt/ds-react";
import { useFetchHentFaggrupper } from "../../api/apiService";
import { useStore } from "../../store/AppState";
import { FagGruppe } from "../../types/FagGruppe";
import { SokParameter } from "../../types/SokParameter";
import { SokParameterSchema } from "../../types/schema/SokParameterSchema";
import { SOK, logUserEvent } from "../../umami/umami";
import styles from "./SokForm.module.css";
import SokHelp from "./SokHelp";

type FormState = {
  errors?: {
    gjelderId?: string;
    fagGruppe?: string;
  };
  success?: boolean;
};

type FormValues = {
  gjelderId: string;
  selectedFaggruppe?: FagGruppe;
};

const SokForm = ({
  fetchOppdragList,
  isLoading,
}: {
  fetchOppdragList: (s: SokParameter) => Promise<void>;
  isLoading: boolean;
}) => {
  const { setGjelderNavn, gjelderId, fagGruppe, resetState } = useStore();
  const { data: faggrupper } = useFetchHentFaggrupper();
  const [state, formAction] = useActionState(submitAction, {});
  const [formValues, setFormValues] = useState<FormValues>({
    gjelderId: gjelderId || "",
    selectedFaggruppe: fagGruppe,
  });

  // for å synke/populere verdier med zustand
  useEffect(() => {
    setFormValues({
      gjelderId: gjelderId || "",
      selectedFaggruppe: fagGruppe,
    });
  }, [gjelderId, fagGruppe]);

  function validateAndCreateParameter(
    formData: FormData,
    selectedFaggruppe?: FagGruppe,
  ) {
    const gjelderIdValue = formData.get("gjelderId") as string;

    const parameter: SokParameter = {
      gjelderId: gjelderIdValue?.trim(),
      fagGruppe: selectedFaggruppe,
    };

    const validation = SokParameterSchema.safeParse(parameter);
    if (!validation.success) {
      const errors = Object.fromEntries(
        validation.error.issues.map((issue) => [issue.path[0], issue.message]),
      );
      return { errors, parameter: null };
    }

    return { errors: null, parameter };
  }

  async function submitAction(
    _: FormState,
    formData: FormData,
  ): Promise<FormState> {
    const { errors, parameter } = validateAndCreateParameter(
      formData,
      formValues.selectedFaggruppe,
    );

    if (errors) {
      return { errors };
    }

    try {
      setGjelderNavn("");
      const trimmedGjelderId = parameter!.gjelderId?.trim() ?? "";

      useStore.setState({
        gjelderId: trimmedGjelderId,
        fagGruppe: parameter!.fagGruppe,
      });

      const isFnr = /^(?!00)\d{11}$/.test(trimmedGjelderId);
      const isOrgnr = /^(00\d{9}|\d{9})$/.test(trimmedGjelderId);

      logUserEvent(SOK.SUBMIT, {
        fnr: isFnr,
        orgnr: isOrgnr,
        fagGruppe: parameter!.fagGruppe?.type,
      });

      fetchOppdragList({ ...parameter!, gjelderId: trimmedGjelderId });

      return { success: true };
    } catch {
      return {
        errors: {
          gjelderId: "En feil oppstod under søket",
        },
      };
    }
  }

  function handleReset() {
    resetState();
    setFormValues({
      gjelderId: "",
      selectedFaggruppe: undefined,
    });
  }

  function handleFaggruppeToggle(type: string, isSelected: boolean) {
    if (isSelected) {
      const found = faggrupper?.find((f) => f.type === type);
      setFormValues((prev) => ({
        ...prev,
        selectedFaggruppe: found,
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        selectedFaggruppe: undefined,
      }));
    }
  }

  function formatFaggruppe(fg: FagGruppe) {
    return `${fg.navn} (${fg.type})`;
  }

  return (
    <form action={formAction}>
      <div className={styles["sok__form-container"]}>
        <div className={styles["sok__help"]}>
          <SokHelp />
        </div>
        <div className={styles["sok__form"]}>
          <div className={styles["sok__input-fields"]}>
            <div className={styles["sok__gjelder"]}>
              <TextField
                label="Gjelder"
                size="small"
                error={state.errors?.gjelderId}
                id="gjelderId"
                name="gjelderId"
                value={formValues.gjelderId}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    gjelderId: e.target.value,
                  }))
                }
              />
            </div>

            <div className={styles["sok__faggruppe"]}>
              <UNSAFE_Combobox
                isMultiSelect={false}
                size="small"
                error={state.errors?.fagGruppe}
                label="Faggruppe"
                onToggleSelected={handleFaggruppeToggle}
                options={
                  faggrupper?.map((fg) => ({
                    value: fg.type,
                    label: formatFaggruppe(fg),
                  })) ?? []
                }
                selectedOptions={
                  formValues.selectedFaggruppe
                    ? [
                        {
                          value: formValues.selectedFaggruppe.type,
                          label: formatFaggruppe(formValues.selectedFaggruppe),
                        },
                      ]
                    : []
                }
                shouldAutocomplete={true}
              />
            </div>
          </div>
        </div>
        <div className={styles["sok__buttons"]}>
          <Button
            data-umami-event={SOK.VALIDATE}
            size="small"
            variant="primary"
            type="submit"
            loading={isLoading}
            iconPosition="right"
            icon={
              <MagnifyingGlassIcon title="Ikon som viser et forstørrelsesglass" />
            }
          >
            Søk
          </Button>
          <Button
            data-umami-event={SOK.RESET}
            size="small"
            variant="secondary"
            type="button"
            iconPosition="right"
            icon={<EraserIcon title="Nullstill søk" />}
            onClick={handleReset}
          >
            Nullstill søk
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SokForm;
