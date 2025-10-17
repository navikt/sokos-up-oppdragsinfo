import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button, TextField, UNSAFE_Combobox } from "@navikt/ds-react";
import { useFetchHentFaggrupper } from "../../api/apiService";
import { useStore } from "../../store/AppState";
import { FagGruppe } from "../../types/FagGruppe";
import { SokParameter } from "../../types/SokParameter";
import { SokParameterSchema } from "../../types/schema/SokParameterSchema";
import { SOK, logSearchEvent } from "../../umami/umami";
import styles from "./SokForm.module.css";
import SokHelp from "./SokHelp";

const SokForm = ({
  fetchOppdragList,
  isLoading,
}: {
  fetchOppdragList: (s: SokParameter) => Promise<void>;
  isLoading: boolean;
}) => {
  const { data } = useFetchHentFaggrupper();
  const { gjelderId, fagGruppe, setGjelderNavn, resetState } = useStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    clearErrors,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SokParameter>({
    resolver: zodResolver(SokParameterSchema),
    defaultValues: {
      gjelderId: gjelderId || "",
      fagGruppe: fagGruppe,
    },
  });

  const watchedFaggruppe = useWatch({ control, name: "fagGruppe" });

  useEffect(() => {
    setValue("gjelderId", gjelderId || "");
    setValue("fagGruppe", fagGruppe);
  }, [gjelderId, fagGruppe, setValue]);

  const onSubmit = async (data: SokParameter) => {
    try {
      const trimmedGjelderId = data.gjelderId?.trim() ?? "";

      setGjelderNavn("");
      clearErrors();

      useStore.setState({
        gjelderId: trimmedGjelderId,
        fagGruppe: data.fagGruppe,
      });

      logSearchEvent(trimmedGjelderId, data.fagGruppe);

      await fetchOppdragList({ ...data, gjelderId: trimmedGjelderId });
    } catch {
      setError("gjelderId", { message: "En feil oppstod under søket" });
    }
  };

  const handleReset = () => {
    resetState();
    reset({ gjelderId: "", fagGruppe: undefined });
  };

  const handleFaggruppeToggle = (type: string, isSelected: boolean) => {
    const faggruppe = isSelected
      ? data?.find((f) => f.type === type)
      : undefined;
    setValue("fagGruppe", faggruppe);
  };

  const formatFaggruppe = (fg: FagGruppe) => `${fg.navn} (${fg.type})`;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                error={errors?.gjelderId?.message}
                {...register("gjelderId")}
              />
            </div>

            <div className={styles["sok__faggruppe"]}>
              <UNSAFE_Combobox
                isMultiSelect={false}
                size="small"
                error={errors?.fagGruppe?.message}
                label="Faggruppe"
                onToggleSelected={handleFaggruppeToggle}
                options={
                  data?.map((fg) => ({
                    value: fg.type,
                    label: formatFaggruppe(fg),
                  })) ?? []
                }
                selectedOptions={
                  watchedFaggruppe
                    ? [
                        {
                          value: watchedFaggruppe.type,
                          label: formatFaggruppe(watchedFaggruppe),
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
            loading={isLoading || isSubmitting}
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
