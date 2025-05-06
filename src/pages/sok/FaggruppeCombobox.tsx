import { useFormikContext } from "formik";
import { UNSAFE_Combobox } from "@navikt/ds-react";
import { useFetchHentFaggrupper } from "../../api/apiService";
import { FagGruppe } from "../../types/FagGruppe";
import { SokParameter } from "../../types/SokParameter";
import styles from "./SokPage.module.css";

export default function FaggruppeCombobox() {
  const { values, setFieldError, setFieldValue } =
    useFormikContext<SokParameter>();
  const { data: faggrupper } = useFetchHentFaggrupper();

  const faggruppetypeLabelMap = faggrupper
    ? faggrupper.reduce(
        (map, faggruppe) => {
          map[faggruppe.type] = faggruppe.navn;
          return map;
        },
        {} as Record<string, string>,
      )
    : ({} as Record<string, string>);

  function convertFaggruppeToComboboxValue(selectedFaggruppe: FagGruppe) {
    return {
      value: selectedFaggruppe.type,
      label: `${selectedFaggruppe.navn}(${selectedFaggruppe.type})`,
    };
  }

  const valgtFaggruppeType = values.fagGruppe?.type ?? "";
  const valgtFaggruppe = faggruppetypeLabelMap[valgtFaggruppeType];

  return (
    <div className={styles["sok-inputfields"]}>
      <div className={styles["combobox"]}>
        <UNSAFE_Combobox
          isMultiSelect={false}
          size={"small"}
          error={""}
          label={"Faggruppe"}
          onToggleSelected={(type, isSelected) => {
            if (isSelected) {
              const found = faggrupper?.find((f) => f.type == type);
              if (!found)
                setFieldError(
                  "fagGruppe",
                  "Satte faggruppe som ikke finnes(?)",
                );
              setFieldValue("fagGruppe", found);
            } else {
              setFieldValue("fagGruppe", undefined);
            }
          }}
          options={faggrupper?.map(convertFaggruppeToComboboxValue) ?? []}
          selectedOptions={[
            {
              label:
                values?.fagGruppe && valgtFaggruppe
                  ? `${valgtFaggruppe} (${values.fagGruppe.type})`
                  : "",
              value: values?.fagGruppe?.type ?? "",
            },
          ]}
          shouldAutocomplete={true}
        ></UNSAFE_Combobox>
      </div>
    </div>
  );
}
