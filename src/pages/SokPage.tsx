import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EraserIcon, MagnifyingGlassIcon } from "@navikt/aksel-icons";
import {
  Alert,
  Button,
  Heading,
  Loader,
  TextField,
  UNSAFE_Combobox,
} from "@navikt/ds-react";
import apiService from "../api/apiService";
import SokHelp from "../components/sok/SokHelp";
import { useAppState } from "../store/AppState";
import commonstyles from "../styles/common-styles.module.css";
import { FagGruppeVisning } from "../types/FagGruppe";
import { SokParameter, SokParameterSchema } from "../types/SokParameter";
import { isEmpty } from "../util/commonUtil";
import styles from "./SokPage.module.css";

export default function SokPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { gjelderId, fagGruppeVisningText, resetState, setGjelderNavn } =
    useAppState.getState();
  const faggrupper = apiService.useFetchHentFaggrupper().data!;
  const [sokParameter, setSokParameter] = useState<SokParameter>({
    gjelderId: gjelderId,
    fagGruppeKode: fagGruppeVisningText,
  });

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<SokParameter>({
    resolver: zodResolver(SokParameterSchema),
  });

  const faggruppeOptions: FagGruppeVisning[] = useMemo(
    () =>
      faggrupper.map((faggruppe) => ({
        navn: faggruppe.navn,
        type: faggruppe.type,
        comboboxText: `${faggruppe.navn}(${faggruppe.type})`,
      })),
    [faggrupper],
  );

  function handleReset(e: FormEvent) {
    e.preventDefault();
    setSokParameter({ gjelderId: "", fagGruppeKode: undefined });
    reset();
    resetState();
  }

  function handleSokSubmit(parameter: SokParameter) {
    setIsSubmit(true);
    setIsLoading(true);
    setGjelderNavn("");

    const gjelderId = parameter.gjelderId?.replaceAll(/[\s.]/g, "") ?? "";
    const fagGruppeKode = faggruppeOptions.find(
      (faggruppe) => faggruppe.comboboxText === sokParameter.fagGruppeKode,
    )?.type;

    useAppState.setState({
      gjelderId: gjelderId,
      fagGruppeVisningText: sokParameter.fagGruppeKode,
      fagGruppeKode: fagGruppeKode,
    });

    apiService
      .useHentOppdrag({ gjelderId: gjelderId, fagGruppeKode: fagGruppeKode })
      .then((response) => {
        setIsLoading(false);
        if (!isEmpty(response)) {
          useAppState.setState({ oppdragsListe: response });
          navigate("/oppdrag");
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large" spacing>
          Oppdragsinfo
        </Heading>
      </div>
      <div className={styles.sok__sok}>
        <div className={styles.sok__help}>
          <SokHelp />
        </div>
        <form onSubmit={handleSubmit(handleSokSubmit)}>
          <Heading level="2" size="medium" spacing>
            Søk
          </Heading>

          <div className={styles.sok_inputfields}>
            <div className={styles.sok__inputGjelderID}>
              <TextField
                {...register("gjelderId")}
                label="Gjelder-ID"
                defaultValue={sokParameter.gjelderId}
                id="gjelderId"
                error={errors.gjelderId?.message}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </div>
            <div className={styles.combobox}>
              <UNSAFE_Combobox
                label={"Faggruppe"}
                onToggleSelected={(comboboxText) => {
                  setSokParameter({
                    ...sokParameter,
                    fagGruppeKode: comboboxText,
                  });
                }}
                selectedOptions={[sokParameter.fagGruppeKode ?? ""]}
                options={[
                  ...faggruppeOptions.map(
                    (faggruppe) => faggruppe.comboboxText,
                  ),
                ]}
              />
              <div className={styles.combobox__clearbutton}>
                <Button
                  variant="secondary-neutral"
                  size={"small"}
                  onClick={(e) => {
                    e.preventDefault();
                    setSokParameter({
                      ...sokParameter,
                      fagGruppeKode: undefined,
                    });
                  }}
                >
                  Tøm
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.sok__knapperad}>
            <div className={styles.sok__buttonwrapper}>
              <Button
                title="Søk"
                iconPosition="right"
                icon={
                  isLoading ? (
                    <Loader title={"Søker"} />
                  ) : (
                    <MagnifyingGlassIcon title="Ikon som viser et forstørrelsesglass" />
                  )
                }
                onClick={() => trigger()}
              >
                {isLoading ? "Søker..." : "Søk"}
              </Button>
            </div>
            <div>
              <Button
                variant="secondary"
                iconPosition="right"
                icon={<EraserIcon title="reset søk" fontSize="1.5rem" />}
                onClick={handleReset}
              >
                Nullstill
              </Button>
            </div>
          </div>
        </form>
      </div>
      {!isLoading && isSubmit && (
        <div className={styles.sok__feil}>
          <Alert variant="info">
            Null treff. Denne IDen har ingen oppdrag
            {sokParameter.fagGruppeKode
              ? ` med faggruppe ${sokParameter.fagGruppeKode}`
              : ""}
          </Alert>
        </div>
      )}
    </>
  );
}
