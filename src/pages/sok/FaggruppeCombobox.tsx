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

  function convertFaggruppeToComboboxValue(selectedFaggruppe: FagGruppe) {
    return {
      value: selectedFaggruppe.type,
      label: `${selectedFaggruppe.navn}(${selectedFaggruppe.type})`,
    };
  }

  return (
    <div className={styles["search__input-fields"]}>
      <div className={styles["search__combobox"]}>
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
          selectedOptions={
            values?.fagGruppe
              ? [
                  {
                    label: `${values.fagGruppe.navn} (${values.fagGruppe.type})`,
                    value: values.fagGruppe?.type ?? "",
                  },
                ]
              : []
          }
          shouldAutocomplete={true}
        ></UNSAFE_Combobox>
      </div>
    </div>
  );
}
