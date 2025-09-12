import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button, TextField, UNSAFE_Combobox } from "@navikt/ds-react";
import { useFetchHentFaggrupper } from "../../api/apiService";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/common-styles.module.css";
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

const SokForm = ({
  fetchOppdragList,
}: {
  fetchOppdragList: (s: SokParameter) => void;
}) => {
  const { setGjelderNavn, gjelderId, fagGruppe, resetState } = useStore();
  const { data: faggrupper } = useFetchHentFaggrupper();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFaggruppe, setSelectedFaggruppe] = useState<
    FagGruppe | undefined
  >(fagGruppe);

  useEffect(() => {
    setSelectedFaggruppe(fagGruppe);
  }, [fagGruppe]);

  async function submitAction(
    prevState: FormState,
    formData: FormData,
  ): Promise<FormState> {
    const gjelderIdValue = formData.get("gjelderId") as string;

    const parameter: SokParameter = {
      gjelderId: gjelderIdValue?.trim(),
      fagGruppe: selectedFaggruppe,
    };

    const validation = SokParameterSchema.safeParse(parameter);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        errors[path] = issue.message;
      });
      return { errors };
    }

    try {
      setGjelderNavn("");
      const trimmedGjelderId = parameter.gjelderId?.trim() ?? "";

      useStore.setState({
        gjelderId: trimmedGjelderId,
        fagGruppe: parameter.fagGruppe,
      });

      const isFnr = /^(?!00)\d{11}$/.test(trimmedGjelderId);
      const isOrgnr = /^(00\d{9}|\d{9})$/.test(trimmedGjelderId);

      logUserEvent(SOK.SUBMIT, {
        fnr: isFnr,
        orgnr: isOrgnr,
        fagGruppe: parameter.fagGruppe?.type,
      });

      fetchOppdragList({ ...parameter, gjelderId: trimmedGjelderId });

      return { success: true };
    } catch {
      return {
        errors: {
          gjelderId: "En feil oppstod under søket",
        },
      };
    }
  }

  const [state, formAction] = useActionState(submitAction, {});
  const { pending } = useFormStatus();

  function handleReset() {
    resetState();
    setSelectedFaggruppe(undefined);
    formRef.current?.reset();
  }

  function handleFaggruppeToggle(type: string, isSelected: boolean) {
    if (isSelected) {
      const found = faggrupper?.find((f) => f.type === type);
      setSelectedFaggruppe(found);
    } else {
      setSelectedFaggruppe(undefined);
    }
  }

  function convertFaggruppeToComboboxValue(selectedFaggruppe: FagGruppe) {
    return {
      value: selectedFaggruppe.type,
      label: `${selectedFaggruppe.navn}(${selectedFaggruppe.type})`,
    };
  }

  return (
    <form ref={formRef} action={formAction}>
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
                error={
                  state.errors?.gjelderId && (
                    <span className={commonstyles["text--nowrap"]}>
                      {state.errors.gjelderId}
                    </span>
                  )
                }
                id="gjelderId"
                name="gjelderId"
                defaultValue={gjelderId || ""}
              />
            </div>

            <div className={styles["sok__faggruppe"]}>
              <UNSAFE_Combobox
                isMultiSelect={false}
                size="small"
                error={state.errors?.fagGruppe || ""}
                label="Faggruppe"
                onToggleSelected={handleFaggruppeToggle}
                options={faggrupper?.map(convertFaggruppeToComboboxValue) ?? []}
                selectedOptions={
                  selectedFaggruppe
                    ? [
                        {
                          label: `${selectedFaggruppe.navn} (${selectedFaggruppe.type})`,
                          value: selectedFaggruppe.type,
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
            disabled={pending}
            iconPosition="right"
            icon={
              <MagnifyingGlassIcon title="Ikon som viser et forstørrelsesglass" />
            }
          >
            {pending ? "Søker..." : "Søk"}
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
