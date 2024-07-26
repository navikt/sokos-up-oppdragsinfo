import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Alert, Button, Heading, TextField, UNSAFE_Combobox } from "@navikt/ds-react";
import ContentLoader from "../components/common/ContentLoader";
import ResetButton from "../components/common/ResetButton";
import SokHelp from "../components/sok/SokHelp";
import { Faggruppe, FaggruppeVisning } from "../types/Faggruppe";
import { SearchParameter, SearchParameterSchema } from "../types/SearchParameter";
import RestService from "../api/rest-service";
import { useAppState } from "../store/AppState";
import commonstyles from "../styles/common-styles.module.css";
import { isEmpty } from "../util/commonUtil";
import styles from "./SokPage.module.css";


export default function SokPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { gjelderId, faggruppeVisningText, faggruppeType, reset } = useAppState.getState();
  const faggrupper = RestService.useFetchHentFaggrupper().data!;
  const [sokParameter, setSokParameter] =
    useState<SearchParameter>({
      gjelderId: gjelderId,
      faggruppeType: faggruppeVisningText
    });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<SearchParameter>({
    resolver: zodResolver(SearchParameterSchema)
  });

  function handleSokSubmit(parameter: SearchParameter): void {
    setIsSubmit(true);
    setIsLoading(true);

    const gjelderId = parameter.gjelderId?.replaceAll(/[\s.]/g, "") ?? "";
    const faggruppeType = faggruppeOptions.find((faggruppe) => faggruppe.comboboxText === sokParameter.faggruppeType)?.type;

    useAppState.setState({
      gjelderId: gjelderId,
      faggruppeVisningText: sokParameter.faggruppeType,
      faggruppeType: faggruppeType
    });

    RestService.useHentOppdrag({ gjelderId: gjelderId, faggruppeType: faggruppeType })
      .then(response => {
        setIsLoading(false);
        if (!isEmpty(response)) {
          useAppState.setState({ oppdragsEgenskaper: response });
          navigate("/treffliste");
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching oppdrags egenskaper:", error);
      });
  }

  const faggruppeOptions: FaggruppeVisning[] = useMemo(
    () => faggrupper.map(faggruppe => ({
      navn: faggruppe.navn,
      type: faggruppe.type,
      comboboxText: `${faggruppe.navn}(${faggruppe.type})`
    })),
    [faggrupper]
  );


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
                  setSokParameter({ ...sokParameter, faggruppeType: comboboxText });
                }}
                selectedOptions={[sokParameter.faggruppeType ?? ""]}
                options={[...faggruppeOptions.map(faggruppe => faggruppe.comboboxText)]}
              />
              <div className={styles.combobox__clearbutton}>
                <Button
                  variant="secondary-neutral"
                  size={"small"}
                  onClick={(e) => {
                    e.preventDefault();
                    setSokParameter({ ...sokParameter, faggruppeType: undefined });
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
                size="small"
                title={"tøm"}
                iconPosition="right"
                icon={<MagnifyingGlassIcon />}
                onClick={() => trigger()}
              >
                Søk
              </Button>
            </div>
            <div>
              <ResetButton />
            </div>
          </div>
        </form>
      </div>
      {!!sokParameter.gjelderId && isLoading && (
        <ContentLoader />
      )}
      {!isLoading && isSubmit && (
        <div className={styles.sok__feil}>
          <Alert variant="info">
            Null treff. Denne IDen har ingen oppdrag
            {sokParameter.faggruppeType ? ` med faggruppe ${sokParameter.faggruppeType}` : ""}
          </Alert>
        </div>
      )}
    </>
  );
}
