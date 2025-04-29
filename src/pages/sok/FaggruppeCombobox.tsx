import { useFormikContext } from "formik";
import { UNSAFE_Combobox } from "@navikt/ds-react";
import { FagGruppe, FagGruppeList } from "../../types/FagGruppe";
import { SokParameter } from "../../types/SokParameter";

export default function FaggruppeCombobox({
  faggrupper,
}: {
  faggrupper: FagGruppeList;
}) {
  const { values, setFieldError, setFieldValue } =
    useFormikContext<SokParameter>();

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

  return (
    <>
      <UNSAFE_Combobox
        isMultiSelect={false}
        size={"small"}
        error={""}
        label={"Faggruppe"}
        onToggleSelected={(type, isSelected) => {
          if (isSelected) {
            const found = faggrupper?.find((f) => f.type == type);
            if (!found)
              setFieldError("fagGruppe", "Satte faggruppe som ikke finnes(?)");
            setFieldValue("fagGruppe", found);
          } else {
            setFieldValue("fagGruppe", undefined);
          }
        }}
        options={faggrupper?.map(convertFaggruppeToComboboxValue) ?? []}
        selectedOptions={[
          {
            label:
              values?.fagGruppe && faggruppetypeLabelMap[values.fagGruppe.type]
                ? `${faggruppetypeLabelMap[values.fagGruppe.type]} (${values.fagGruppe.type})`
                : "",
            value: values?.fagGruppe?.type ?? "",
          },
        ]}
        shouldAutocomplete={true}
      ></UNSAFE_Combobox>
      <div>Antall: {faggrupper.length}</div>
      <div>Valgte verdier i form: {JSON.stringify(values)}</div>
    </>
  );
}
