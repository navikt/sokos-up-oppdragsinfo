import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
import {
  Alert,
  Button,
  Heading,
  TextField,
  UNSAFE_Combobox,
} from "@navikt/ds-react";
import { hentOppdrag, useFetchHentFaggrupper } from "../api/apiService";
import { useStore } from "../store/AppState";
import commonstyles from "../styles/common-styles.module.css";
import { ErrorMessage } from "../types/ErrorMessage";
import { FagGruppe } from "../types/FagGruppe";
import { SokParameter } from "../types/SokParameter";
import { SokParameterSchema } from "../types/schema/SokParameterSchema";
import { isEmpty } from "../util/commonUtil";
import SokHelp from "./sok/SokHelp";
import styles from "./sok/SokPage.module.css";

export default function SokPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { gjelderId, fagGruppe, setOppdragsListe, resetState, setGjelderNavn } =
    useStore();
  const [sokParameter, setSokParameter] = useState<SokParameter>({
    gjelderId: gjelderId,
    fagGruppe: fagGruppe,
  });

  const { data: faggrupper } = useFetchHentFaggrupper();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<SokParameter>({
    resolver: zodResolver(SokParameterSchema),
  });

  const faggruppetypeLabelMap = faggrupper
    ? faggrupper.reduce(
        (map, faggruppe) => {
          map[faggruppe.type] = faggruppe.navn;
          return map;
        },
        {} as Record<string, string>,
      )
    : ({} as Record<string, string>);

  useEffect(() => {
    setValue("gjelderId", sokParameter.gjelderId);
    setValue("fagGruppe", sokParameter.fagGruppe);
  }, [setValue, sokParameter]);

  function handleReset(e: FormEvent) {
    e.preventDefault();
    setSokParameter({ gjelderId: "", fagGruppe: undefined });
    setError(null);
    reset();
    resetState();
  }

  function convertFaggruppeToComboboxValue(selectedFaggruppe: FagGruppe) {
    return {
      value: selectedFaggruppe.type,
      label: `${selectedFaggruppe.navn}(${selectedFaggruppe.type})`,
    };
  }

  function onSubmit(parameter: SokParameter) {
    setIsLoading(true);
    setGjelderNavn("");

    const gjelderId = parameter.gjelderId?.replaceAll(/[\s.]/g, "") ?? "";
    const fagGruppe = parameter.fagGruppe;

    useStore.setState({
      gjelderId: gjelderId,
      fagGruppe: fagGruppe,
    });

    hentOppdrag({ gjelderId: gjelderId, fagGruppeKode: fagGruppe?.type })
      .then((response) => {
        setIsLoading(false);
        setError(null);
        if (!isEmpty(response)) {
          setOppdragsListe(response);
          navigate("/treffliste", { replace: false });
        } else {
          setError({
            variant: "info",
            message:
              "Fant ingen oppdrag for " +
              gjelderId +
              (fagGruppe ? " med faggruppe " + fagGruppe.type : ""),
          });
        }
      })
      .catch((error) => {
        setError({
          variant: error.statusCode == 400 ? "warning" : "error",
          message: error.message,
        });
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large" spacing>
          Oppdragsinfo: Søk
        </Heading>
      </div>
      <div className={styles["sok"]}>
        <div className={styles["sok-help"]}>
          <SokHelp />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["sok-inputfields"]}>
            <TextField
              label="Gjelder"
              size={"small"}
              error={
                errors.gjelderId?.message && (
                  <span className={styles["sok-error-message-nowrap"]}>
                    {errors.gjelderId?.message}
                  </span>
                )
              }
              id="gjelderId"
              {...register("gjelderId", {
                setValueAs: (value: string) => value.trim(),
              })}
            />
            <div className={styles["combobox"]}>
              <Controller
                control={control}
                name={"fagGruppe"}
                render={({ field }) => (
                  <UNSAFE_Combobox
                    error={
                      errors.fagGruppe?.message
                        ? "Ikke gyldig verdi"
                        : undefined
                    }
                    isMultiSelect={false}
                    size={"small"}
                    label={"Faggruppe"}
                    onToggleSelected={(type, isSelected) => {
                      if (isSelected) {
                        field.onChange(faggrupper?.find((f) => f.type == type));
                      } else {
                        setValue("fagGruppe", undefined);
                      }
                    }}
                    options={
                      faggrupper?.map(convertFaggruppeToComboboxValue) ?? []
                    }
                    selectedOptions={[
                      {
                        label: field.value
                          ? faggruppetypeLabelMap[field.value.type] +
                            ` (${field.value.type})`
                          : "",
                        value: field.value?.type ?? "",
                      },
                    ]}
                    shouldAutocomplete={true}
                  ></UNSAFE_Combobox>
                )}
              />
            </div>
          </div>
          <div className={styles["sok-knapperad"]}>
            <div className={styles["sok-buttonwrapper"]}>
              <Button
                size="small"
                iconPosition="right"
                loading={isLoading}
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
              >
                Nullstill
              </Button>
            </div>
          </div>
        </form>
      </div>
      {error && (
        <div className={styles["sok-feil"]}>
          <Alert variant={error.variant} role="status">
            {error.message}
            {sokParameter.fagGruppe
              ? ` med faggruppe ${sokParameter.fagGruppe}`
              : ""}
          </Alert>
        </div>
      )}
    </>
  );
}
